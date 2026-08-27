import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Smartphone, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Loader2,
  KeyRound,
  User,
  PhoneCall,
  GraduationCap,
  Briefcase,
  Palette,
  ShieldAlert
} from 'lucide-react';
import { 
  signInWithGoogle, 
  sendMagicLink, 
  authenticateWithPhonePin 
} from '../lib/auth';
import { StudentUser } from '../types';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: StudentUser) => void;
  initialTab?: 'phone' | 'google' | 'magic';
  initialRole?: 'student' | 'creator' | 'business' | 'admin';
  purpose?: string;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialTab = 'phone',
  initialRole = 'student',
  purpose = 'Access your SOMESA account, courses & creator profile'
}) => {
  const [authMethod, setAuthMethod] = useState<'phone' | 'google' | 'magic'>(initialTab);
  const [selectedRole, setSelectedRole] = useState<'student' | 'creator' | 'business' | 'admin'>(initialRole);
  
  // Phone + PIN form state
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Email / Magic link form state
  const [email, setEmail] = useState('');
  const [magicSent, setMagicSent] = useState(false);
  
  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    const res = await signInWithGoogle();
    if (res.error) {
      setErrorMsg(res.error);
      setIsLoading(false);
    }
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    const res = await sendMagicLink(email);
    setIsLoading(false);

    if (res.success) {
      setMagicSent(true);
    } else {
      setErrorMsg(res.error || 'Failed to send magic login link.');
    }
  };

  const handlePhonePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const res = await authenticateWithPhonePin(
      phone, 
      pin, 
      fullName, 
      isRegistering, 
      selectedRole, 
      companyName
    );
    setIsLoading(false);

    if (res.success && res.user) {
      onSuccess(res.user);
      onClose();
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div 
      id="student-auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2E24]/65 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div 
        id="student-auth-modal-container"
        className="bg-[#FBF9F5] border border-[#E8E3DA] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#0A2E24] text-white p-6 relative shrink-0">
          <button 
            id="auth-modal-close-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close auth modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6321] text-white text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOMESA Identity &amp; Access</span>
          </div>

          <h2 className="font-display font-black text-2xl text-white tracking-tight">
            {isRegistering ? 'Create Your SOMESA Account' : 'Welcome to SOMESA'}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-0.5">
            {purpose}
          </p>
        </div>

        {/* Persona / Role Selector */}
        <div className="bg-[#F2EFE9] p-3 border-b border-[#E8E3DA]">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0A2E24] mb-1.5 px-1">
            I am using SOMESA as:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`p-2 rounded-xl text-left transition-all cursor-pointer border ${
                selectedRole === 'student'
                  ? 'bg-white border-[#0A2E24] shadow-xs text-[#0A2E24]'
                  : 'bg-white/50 border-transparent text-[#121715]/70 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#0A2E24]" />
                <span>Learner</span>
              </div>
              <p className="text-[10px] text-[#121715]/60 mt-0.5 line-clamp-1">Free vault &amp; courses</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('creator')}
              className={`p-2 rounded-xl text-left transition-all cursor-pointer border ${
                selectedRole === 'creator'
                  ? 'bg-white border-[#FF6321] shadow-xs text-[#0A2E24]'
                  : 'bg-white/50 border-transparent text-[#121715]/70 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Palette className="w-3.5 h-3.5 text-[#FF6321]" />
                <span>Creator / Talent</span>
              </div>
              <p className="text-[10px] text-[#121715]/60 mt-0.5 line-clamp-1">Portfolio &amp; learn</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('business')}
              className={`p-2 rounded-xl text-left transition-all cursor-pointer border ${
                selectedRole === 'business'
                  ? 'bg-white border-[#0A2E24] shadow-xs text-[#0A2E24]'
                  : 'bg-white/50 border-transparent text-[#121715]/70 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Briefcase className="w-3.5 h-3.5 text-blue-700" />
                <span>Employer / Client</span>
              </div>
              <p className="text-[10px] text-[#121715]/60 mt-0.5 line-clamp-1">Hire talent &amp; jobs</p>
            </button>
          </div>
        </div>

        {/* Auth Method Selector Tabs */}
        <div className="flex border-b border-[#E8E3DA] bg-white">
          <button
            id="tab-auth-phone"
            onClick={() => { setAuthMethod('phone'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 px-2 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              authMethod === 'phone'
                ? 'border-[#FF6321] text-[#0A2E24] bg-[#FF6321]/5'
                : 'border-transparent text-[#121715]/60 hover:text-[#0A2E24]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Phone &amp; PIN</span>
          </button>

          <button
            id="tab-auth-google"
            onClick={() => { setAuthMethod('google'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 px-2 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              authMethod === 'google'
                ? 'border-[#FF6321] text-[#0A2E24] bg-[#FF6321]/5'
                : 'border-transparent text-[#121715]/60 hover:text-[#0A2E24]'
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google 1-Tap</span>
          </button>

          <button
            id="tab-auth-magic"
            onClick={() => { setAuthMethod('magic'); setErrorMsg(null); }}
            className={`flex-1 py-2.5 px-2 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
              authMethod === 'magic'
                ? 'border-[#FF6321] text-[#0A2E24] bg-[#FF6321]/5'
                : 'border-transparent text-[#121715]/60 hover:text-[#0A2E24]'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-[#0A2E24]" />
            <span>Email Link</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2 text-xs text-rose-800 animate-in fade-in-50">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* METHOD 1: PHONE & PIN (VILLAGE OPTIMIZED) */}
          {authMethod === 'phone' && (
            <form onSubmit={handlePhonePinSubmit} className="space-y-3.5">
              <div className="bg-[#0A2E24]/5 border border-[#0A2E24]/10 rounded-2xl p-3 text-xs text-[#0A2E24]">
                <p className="font-bold flex items-center gap-1.5 text-[#0A2E24]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Village &amp; Data Saver Friendly (No SMS Fees)</span>
                </p>
                <p className="mt-0.5 text-[#121715]/75">
                  {selectedRole === 'business' 
                    ? 'Manage your hiring inquiries and receive creator proposals with your PIN.'
                    : selectedRole === 'creator'
                    ? 'Creators have full access to their Portfolio builder PLUS the Learning Vault to explore new skills!'
                    : 'Learners can study courses and launch their portfolio when ready!'}
                </p>
              </div>

              {isRegistering && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#121715] mb-1">
                      {selectedRole === 'business' ? 'Contact Person Name' : 'Your Full Name'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#121715]/40 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={selectedRole === 'business' ? 'e.g. David Mukasa' : 'e.g. Aisha Namukasa'}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6CFC4] rounded-xl text-sm focus:outline-none focus:border-[#0A2E24]"
                      />
                    </div>
                  </div>

                  {selectedRole === 'business' && (
                    <div>
                      <label className="block text-xs font-bold text-[#121715] mb-1">
                        Company / Organization Name
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-[#121715]/40 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Nile Craft Enterprises"
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6CFC4] rounded-xl text-sm focus:outline-none focus:border-[#0A2E24]"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-[#121715] mb-1">
                  Ugandan Phone Number
                </label>
                <div className="relative">
                  <PhoneCall className="w-4 h-4 text-[#121715]/40 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0772 123 456 or +256..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6CFC4] rounded-xl text-sm focus:outline-none focus:border-[#0A2E24]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#121715]">
                    {isRegistering ? 'Create 4-Digit PIN' : '4-Digit Secret PIN'}
                  </label>
                  <span className="text-[10px] text-[#121715]/50">e.g. 2026, 4421</span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#121715]/40 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter 4-digit code"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6CFC4] rounded-xl text-sm tracking-widest font-mono focus:outline-none focus:border-[#0A2E24]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#0A2E24] hover:bg-[#0F3D30] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#FF6321]" />
                ) : (
                  <>
                    <span>{isRegistering ? `Create ${selectedRole === 'business' ? 'Client' : selectedRole === 'creator' ? 'Creator' : 'Student'} Account` : 'Sign In with Phone & PIN'}</span>
                    <ArrowRight className="w-4 h-4 text-[#FF6321]" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setErrorMsg(null);
                  }}
                  className="text-xs text-[#0A2E24] font-semibold hover:underline cursor-pointer"
                >
                  {isRegistering 
                    ? 'Already have an account? Sign in with PIN' 
                    : 'New here? Click to create your account & 4-digit PIN'}
                </button>
              </div>
            </form>
          )}

          {/* METHOD 2: GOOGLE 1-TAP OAUTH */}
          {authMethod === 'google' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-[#121715]">
                  Instant Google Sign-In
                </h3>
                <p className="text-xs text-[#121715]/70 max-w-xs mx-auto">
                  Automatically sign in with your phone's Android Google account. Fast and secure.
                </p>
              </div>

              <button
                id="google-signin-action-btn"
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#F5F2ED] text-[#121715] font-bold text-sm border border-[#D6CFC4] shadow-xs hover:shadow transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#0A2E24]" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* METHOD 3: SUPABASE MAGIC LINK */}
          {authMethod === 'magic' && (
            <div>
              {magicSent ? (
                <div className="text-center py-4 space-y-3 animate-in fade-in-50">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0A2E24]">
                    Magic Link Sent!
                  </h3>
                  <p className="text-xs text-[#121715]/70">
                    We sent a secure login link to <strong className="text-[#0A2E24]">{email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setMagicSent(false)}
                    className="text-xs text-[#FF6321] font-bold hover:underline cursor-pointer pt-2"
                  >
                    Resend link or try another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMagicLink} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#121715]">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#121715]/40 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6CFC4] rounded-xl text-sm focus:outline-none focus:border-[#0A2E24]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#0A2E24] hover:bg-[#0F3D30] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#FF6321]" />
                    ) : (
                      <>
                        <span>Send Login Link</span>
                        <ArrowRight className="w-4 h-4 text-[#FF6321]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer Security Note */}
        <div className="bg-[#E8E3DA]/40 p-3.5 border-t border-[#E8E3DA] text-center text-[11px] text-[#121715]/60 flex items-center justify-center gap-1.5 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Protected by SOMESA Academy &amp; Supabase RLS policies</span>
        </div>
      </div>
    </div>
  );
};
