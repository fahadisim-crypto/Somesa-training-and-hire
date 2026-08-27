import { supabase, isSupabaseConfigured } from './supabase';
import { StudentUser } from '../types';

const LOCAL_USER_KEY = 'somesa_current_user';
const LOCAL_PIN_USERS_KEY = 'somesa_pin_users_db';

// Quick local helper to get/set offline or fallback PIN user records
function getLocalPinUsers(): Record<string, { name: string; phone: string; pin: string; role: string; creator_slug?: string }> {
  try {
    const raw = localStorage.getItem(LOCAL_PIN_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalPinUsers(data: Record<string, { name: string; phone: string; pin: string; role: string; creator_slug?: string }>) {
  try {
    localStorage.setItem(LOCAL_PIN_USERS_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

/**
 * Get current stored session or cached student user
 */
export async function getCurrentUser(): Promise<StudentUser | null> {
  // 1. Check local session storage first
  const storedUserJson = localStorage.getItem(LOCAL_USER_KEY);
  let localUser: StudentUser | null = null;
  if (storedUserJson) {
    try {
      localUser = JSON.parse(storedUserJson);
    } catch {
      // ignore
    }
  }

  // 2. If Supabase is connected, check active Auth session
  if (supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const user = session.user;
        const student: StudentUser = {
          id: user.id,
          auth_type: user.app_metadata?.provider === 'google' ? 'google' : 'magic_link',
          email: user.email,
          phone: user.phone,
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Student',
          avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
          role: 'student',
          created_at: user.created_at || new Date().toISOString()
        };
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(student));
        return student;
      }
    } catch (err) {
      console.warn('[Auth] Error getting Supabase session:', err);
    }
  }

  return localUser;
}

/**
 * 1. Sign In / Sign Up with Google (1-Tap / OAuth)
 */
export async function signInWithGoogle(): Promise<{ error?: string }> {
  if (!supabase) {
    return { error: 'Supabase credentials not configured in environment.' };
  }

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) return { error: error.message };
    return {};
  } catch (err: any) {
    return { error: err?.message || 'Google Sign-In failed' };
  }
}

/**
 * 2. Sign In with Supabase Magic Link (Passwordless Email OTP)
 */
export async function sendMagicLink(email: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    // Fallback simulation for offline/preview
    const mockUser: StudentUser = {
      id: `user-${Date.now()}`,
      auth_type: 'magic_link',
      email,
      name: email.split('@')[0],
      role: 'student',
      created_at: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
    return { success: true };
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed sending magic link' };
  }
}

/**
 * 3. Sign In / Register with Phone Number & 4-Digit Student PIN
 * (Village & Rural Friendly - Zero SMS Costs)
 */
export async function authenticateWithPhonePin(
  phone: string,
  pin: string,
  fullName?: string,
  isRegistering = false,
  role: 'student' | 'creator' | 'business' | 'admin' = 'student',
  companyName?: string
): Promise<{ success: boolean; user?: StudentUser; error?: string }> {
  const cleanPhone = phone.replace(/\s+/g, '').trim();
  const cleanPin = pin.trim();

  if (!cleanPhone || cleanPhone.length < 9) {
    return { success: false, error: 'Please enter a valid Ugandan phone number (e.g. 0771 234 567 or +256 701...)' };
  }

  if (!cleanPin || cleanPin.length < 4) {
    return { success: false, error: 'PIN must be at least 4 digits.' };
  }

  // 1. If Supabase is connected, check or insert in student_pins table
  if (supabase) {
    try {
      if (isRegistering) {
        // Check existing
        const { data: existing } = await supabase
          .from('student_pins')
          .select('*')
          .eq('phone', cleanPhone)
          .maybeSingle();

        if (existing) {
          return { success: false, error: 'An account with this phone already exists. Please Sign In with your PIN.' };
        }

        const newId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const userObj: StudentUser = {
          id: newId,
          auth_type: 'phone_pin',
          phone: cleanPhone,
          name: fullName || (role === 'business' ? 'Business Client' : `Creator (${cleanPhone.slice(-4)})`),
          avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
          role: role,
          company_name: companyName,
          created_at: new Date().toISOString()
        };

        const { error: insertErr } = await supabase
          .from('student_pins')
          .insert({
            id: newId,
            phone: cleanPhone,
            pin_code: cleanPin,
            full_name: userObj.name,
            role: userObj.role,
            created_at: new Date().toISOString()
          });

        if (insertErr) {
          console.warn('[Supabase student_pins insert error, falling back locally]', insertErr.message);
        }

        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userObj));
        return { success: true, user: userObj };
      } else {
        // Sign In
        const { data: record, error: findErr } = await supabase
          .from('student_pins')
          .select('*')
          .eq('phone', cleanPhone)
          .maybeSingle();

        if (record && !findErr) {
          if (record.pin_code === cleanPin) {
            const userObj: StudentUser = {
              id: String(record.id),
              auth_type: 'phone_pin',
              phone: record.phone,
              name: record.full_name || `User (${cleanPhone.slice(-4)})`,
              role: record.role || role || 'student',
              creator_slug: record.creator_slug,
              created_at: record.created_at || new Date().toISOString()
            };
            localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userObj));
            return { success: true, user: userObj };
          } else {
            return { success: false, error: 'Incorrect 4-digit PIN for this phone number.' };
          }
        }
      }
    } catch (err) {
      console.warn('[Supabase PIN query failed, trying local store]', err);
    }
  }

  // Fallback to local storage store
  const localDb = getLocalPinUsers();
  if (isRegistering) {
    if (localDb[cleanPhone]) {
      return { success: false, error: 'This phone number is already registered. Please enter your PIN to sign in.' };
    }
    localDb[cleanPhone] = {
      name: fullName || (role === 'business' ? 'Business Client' : `User (${cleanPhone.slice(-4)})`),
      phone: cleanPhone,
      pin: cleanPin,
      role: role
    };
    saveLocalPinUsers(localDb);

    const userObj: StudentUser = {
      id: `local_${Date.now()}`,
      auth_type: 'phone_pin',
      phone: cleanPhone,
      name: localDb[cleanPhone].name,
      role: role,
      company_name: companyName,
      created_at: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userObj));
    return { success: true, user: userObj };
  } else {
    // Sign In check
    const userRecord = localDb[cleanPhone];
    if (!userRecord) {
      // Auto-register convenience for rural users if first time
      localDb[cleanPhone] = {
        name: fullName || `User (${cleanPhone.slice(-4)})`,
        phone: cleanPhone,
        pin: cleanPin,
        role: role
      };
      saveLocalPinUsers(localDb);
      const newUserObj: StudentUser = {
        id: `local_${Date.now()}`,
        auth_type: 'phone_pin',
        phone: cleanPhone,
        name: localDb[cleanPhone].name,
        role: role,
        created_at: new Date().toISOString()
      };
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUserObj));
      return { success: true, user: newUserObj };
    }

    if (userRecord.pin === cleanPin) {
      const userObj: StudentUser = {
        id: `local_${cleanPhone}`,
        auth_type: 'phone_pin',
        phone: cleanPhone,
        name: userRecord.name,
        role: (userRecord.role as any) || 'student',
        created_at: new Date().toISOString()
      };
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userObj));
      return { success: true, user: userObj };
    } else {
      return { success: false, error: 'Incorrect 4-digit PIN. Please try again.' };
    }
  }
}

/**
 * Switch role for testing or dual persona (e.g. Creator also wants to browse as Business or Learn)
 */
export function updateUserRole(user: StudentUser, newRole: 'student' | 'creator' | 'business' | 'admin'): StudentUser {
  const updated = { ...user, role: newRole };
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Sign out current student
 */
export async function signOutStudent(): Promise<void> {
  localStorage.removeItem(LOCAL_USER_KEY);
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
  }
}
