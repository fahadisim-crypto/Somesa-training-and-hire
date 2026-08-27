import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Creator, ProjectCaseStudy, HireRequest, CohortSurveyResponse, CategoryType } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Gracefully initialize Supabase client
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.info(
    '[SOMESA Supabase Integration] Supabase credentials not detected or using placeholder. Running in local state / cached mode. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to persist live trainee profiles.'
  );
}

// -------------------------------------------------------------
// Database Mappers & Helper Functions
// -------------------------------------------------------------

/**
 * Fetch all creators with their associated projects from Supabase.
 * Checks the 'creators' and 'projects' tables.
 */
export async function fetchCreatorsFromSupabase(): Promise<Creator[] | null> {
  if (!supabase) return null;

  try {
    // 1. Fetch creators
    const { data: creatorsData, error: creatorsError } = await supabase
      .from('creators')
      .select('*')
      .order('created_at', { ascending: false });

    if (creatorsError) {
      console.warn('[Supabase] Error fetching creators:', creatorsError.message);
      return null;
    }

    if (!creatorsData || creatorsData.length === 0) {
      return [];
    }

    // 2. Fetch projects / case studies
    let projectsData: any[] = [];
    try {
      const { data: pData } = await supabase
        .from('projects')
        .select('*');
      if (pData) projectsData = pData;
    } catch {
      // Table might not exist yet or empty
    }

    // 3. Map database records to strongly typed Creator objects
    const mappedCreators: Creator[] = creatorsData.map((row: any) => {
      const creatorId = String(row.id);
      
      // Find projects for this creator
      const creatorProjects: ProjectCaseStudy[] = projectsData
        .filter((p: any) => String(p.creator_id || p.creatorId) === creatorId)
        .map((p: any) => ({
          id: String(p.id),
          creatorId: creatorId,
          creatorName: row.name || '',
          creatorAvatar: row.avatar || row.avatar_url || '',
          creatorLocation: row.location || 'Kampala, Uganda',
          creatorRole: row.title || 'Digital Creator',
          title: p.title || 'Creative Showcase',
          clientName: p.client_name || p.clientName,
          category: (p.category as CategoryType) || (row.primary_category as CategoryType) || 'Video',
          coverImage: p.cover_image || p.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          galleryImages: Array.isArray(p.gallery_images || p.galleryImages) ? (p.gallery_images || p.galleryImages) : undefined,
          summary: p.summary || p.description || '',
          whatIDid: Array.isArray(p.what_i_did || p.whatIDid) ? (p.what_i_did || p.whatIDid) : [
            'Content planning and concept storyboarding',
            'Mobile production and editing'
          ],
          tools: Array.isArray(p.tools) ? p.tools : (typeof p.tools === 'string' ? p.tools.split(',') : ['CapCut', 'Canva']),
          outcome: p.outcome || 'Published client content',
          featured: p.featured ?? true,
          year: p.year ? String(p.year) : '2026'
        }));

      // Parse JSON or array fields safely
      const services = Array.isArray(row.services) 
        ? row.services 
        : (typeof row.services === 'string' ? JSON.parse(row.services || '[]') : []);

      const experience = Array.isArray(row.experience) 
        ? row.experience 
        : (typeof row.experience === 'string' ? JSON.parse(row.experience || '[]') : []);

      const socialLinks = typeof row.social_links === 'object' && row.social_links !== null
        ? row.social_links
        : (typeof row.social_links === 'string' ? JSON.parse(row.social_links || '{}') : {});

      const trainingBadge = typeof row.training_badge === 'object' && row.training_badge !== null
        ? row.training_badge
        : {
            type: 'somesa',
            label: 'SOMESA-trained',
            description: 'Verified participant in digital skills & creative production track.',
            year: '2026'
          };

      const metrics = typeof row.metrics === 'object' && row.metrics !== null
        ? row.metrics
        : {
            completedProjects: creatorProjects.length || 1,
            satisfiedClients: 1,
            rating: 5.0
          };

      return {
        id: creatorId,
        slug: row.slug || row.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `creator-${creatorId}`,
        name: row.name || 'Anonymous Creator',
        title: row.title || 'Digital Content Creator',
        location: row.location || 'Kampala, Uganda',
        country: row.country || 'Uganda',
        avatar: row.avatar || row.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        bio: row.bio || row.short_bio || '',
        shortBio: row.short_bio || row.bio || '',
        available: row.available ?? true,
        trainingBadge,
        skills: Array.isArray(row.skills) ? row.skills : (typeof row.skills === 'string' ? row.skills.split(',') : ['Content Creation']),
        primaryCategory: (row.primary_category as CategoryType) || 'Video',
        services: services.length > 0 ? services : [
          {
            name: 'Short-Form Video Production',
            description: 'Engaging mobile videos for social media marketing.',
            typicalTurnaround: '2-3 Days',
            startingRate: 'UGX 150,000 / video',
            category: 'Video'
          }
        ],
        projects: creatorProjects.length > 0 ? creatorProjects : (Array.isArray(row.projects) ? row.projects : []),
        experience: experience.length > 0 ? experience : [
          {
            role: 'Digital Creator Trainee',
            organization: 'SOMESA Digital Skills',
            year: '2026',
            description: 'Graduated from practical digital storytelling track.'
          }
        ],
        tools: Array.isArray(row.tools) ? row.tools : (typeof row.tools === 'string' ? row.tools.split(',') : ['CapCut', 'Canva']),
        socialLinks,
        metrics,
        featured: row.featured ?? false
      };
    });

    return mappedCreators;
  } catch (err) {
    console.error('[Supabase] Failed to fetch creators:', err);
    return null;
  }
}

/**
 * Save / Insert a new Creator profile into Supabase
 */
export async function saveCreatorToSupabase(creator: Creator): Promise<boolean> {
  if (!supabase) {
    console.info('[Supabase] Client not initialized, saved to local state only.');
    return false;
  }

  try {
    // 1. Insert Creator row
    const creatorPayload = {
      id: creator.id,
      slug: creator.slug,
      name: creator.name,
      title: creator.title,
      location: creator.location,
      country: creator.country,
      avatar: creator.avatar,
      bio: creator.bio,
      short_bio: creator.shortBio,
      available: creator.available,
      training_badge: creator.trainingBadge,
      skills: creator.skills,
      primary_category: creator.primaryCategory,
      services: creator.services,
      experience: creator.experience,
      tools: creator.tools,
      social_links: creator.socialLinks,
      metrics: creator.metrics,
      featured: creator.featured ?? false,
      created_at: new Date().toISOString()
    };

    const { error: creatorError } = await supabase
      .from('creators')
      .upsert(creatorPayload, { onConflict: 'id' });

    if (creatorError) {
      console.warn('[Supabase] Creator insert error:', creatorError.message);
    }

    // 2. Insert Projects if present
    if (creator.projects && creator.projects.length > 0) {
      const projectPayloads = creator.projects.map((p) => ({
        id: p.id,
        creator_id: creator.id,
        title: p.title,
        client_name: p.clientName || null,
        category: p.category,
        cover_image: p.coverImage,
        gallery_images: p.galleryImages || [],
        summary: p.summary,
        what_i_did: p.whatIDid || [],
        tools: p.tools || [],
        outcome: p.outcome,
        featured: p.featured ?? true,
        year: p.year || '2026',
        created_at: new Date().toISOString()
      }));

      const { error: projectError } = await supabase
        .from('projects')
        .upsert(projectPayloads, { onConflict: 'id' });

      if (projectError) {
        console.warn('[Supabase] Project insert error:', projectError.message);
      }
    }

    return true;
  } catch (err) {
    console.error('[Supabase] Error saving creator:', err);
    return false;
  }
}

/**
 * Fetch hire / project requests from Supabase
 */
export async function fetchHireRequestsFromSupabase(): Promise<HireRequest[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('project_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Try fallback to 'hire_requests' table name
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('hire_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (fallbackError) {
        return null;
      }
      return mapHireRequests(fallbackData);
    }

    return mapHireRequests(data);
  } catch (err) {
    console.error('[Supabase] Failed to fetch hire requests:', err);
    return null;
  }
}

function mapHireRequests(data: any[]): HireRequest[] {
  if (!data) return [];
  return data.map((r: any) => ({
    id: String(r.id),
    creatorId: String(r.creator_id || r.creatorId),
    creatorName: r.creator_name || r.creatorName || 'Creator',
    clientName: r.client_name || r.clientName || 'Anonymous Client',
    organization: r.organization || undefined,
    phone: r.phone || '',
    email: r.email || undefined,
    serviceNeeded: r.service_needed || r.serviceNeeded || 'General Project',
    projectDescription: r.project_description || r.projectDescription || '',
    budget: r.budget || undefined,
    timeline: r.timeline || 'Flexible',
    timelineEstimate: r.timeline_estimate || r.timelineEstimate || undefined,
    createdAt: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recently',
    status: r.status || 'Pending'
  }));
}

/**
 * Save a Hire / Project Request to Supabase
 */
export async function saveHireRequestToSupabase(request: HireRequest): Promise<boolean> {
  if (!supabase) return false;

  const payload = {
    id: request.id,
    creator_id: request.creatorId,
    creator_name: request.creatorName,
    client_name: request.clientName,
    organization: request.organization || null,
    phone: request.phone,
    email: request.email || null,
    service_needed: request.serviceNeeded,
    project_description: request.projectDescription,
    budget: request.budget || null,
    timeline: request.timeline,
    timeline_estimate: request.timelineEstimate || null,
    status: request.status || 'Pending',
    created_at: new Date().toISOString()
  };

  try {
    const { error } = await supabase
      .from('project_requests')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      // Try fallback to 'hire_requests'
      const { error: fallbackError } = await supabase
        .from('hire_requests')
        .upsert(payload, { onConflict: 'id' });
      if (fallbackError) {
        console.warn('[Supabase] Failed saving hire request:', fallbackError.message);
        return false;
      }
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Error submitting hire request:', err);
    return false;
  }
}

/**
 * Save Cohort Survey Response to Supabase
 */
export async function saveSurveyResponseToSupabase(survey: CohortSurveyResponse): Promise<boolean> {
  if (!supabase) return false;

  const payload = {
    id: survey.id,
    business_name: survey.businessName || null,
    industry: survey.industry,
    skills_needed: survey.skillsNeeded,
    hiring_timeline: survey.hiringTimeline,
    monthly_creative_budget: survey.monthlyCreativeBudget || null,
    additional_feedback: survey.additionalFeedback || null,
    contact_email_or_phone: survey.contactEmailOrPhone || null,
    created_at: new Date().toISOString()
  };

  try {
    const { error } = await supabase
      .from('cohort_surveys')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] Failed saving survey response:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Error saving survey response:', err);
    return false;
  }
}

/**
 * Sync or seed all creators, requests, and surveys to Supabase in batch
 */
export async function syncAllSampleDataToSupabase(
  creators: Creator[],
  requests: HireRequest[],
  surveys: CohortSurveyResponse[]
): Promise<{ success: boolean; count: number; error?: string }> {
  if (!supabase) {
    return { success: false, count: 0, error: 'Supabase client not initialized' };
  }

  let count = 0;
  try {
    for (const creator of creators) {
      await saveCreatorToSupabase(creator);
      count++;
    }

    for (const request of requests) {
      await saveHireRequestToSupabase(request);
    }

    for (const survey of surveys) {
      await saveSurveyResponseToSupabase(survey);
    }

    return { success: true, count };
  } catch (err: any) {
    console.error('[Supabase Seed Error]', err);
    return { success: false, count, error: err?.message || 'Unknown error' };
  }
}

/**
 * Fetch Cohort Survey Responses from Supabase
 */
export async function fetchSurveyResponsesFromSupabase(): Promise<CohortSurveyResponse[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('cohort_surveys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: String(row.id),
      businessName: row.business_name || undefined,
      industry: row.industry || 'General Business',
      skillsNeeded: Array.isArray(row.skills_needed) ? row.skills_needed : [],
      hiringTimeline: row.hiring_timeline || 'Flexible',
      monthlyCreativeBudget: row.monthly_creative_budget || undefined,
      additionalFeedback: row.additional_feedback || undefined,
      contactEmailOrPhone: row.contact_email_or_phone || undefined,
      createdAt: row.created_at ? new Date(row.created_at).toLocaleDateString() : 'Recently'
    }));
  } catch (err) {
    console.error('[Supabase] Error fetching surveys:', err);
    return null;
  }
}
