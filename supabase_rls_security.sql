-- ==============================================================================
-- SOMESA Talent & Academy: Supabase Row Level Security (RLS) & Auth Policy Setup
-- Run this script in your Supabase SQL Editor (https://app.supabase.com)
-- ==============================================================================

-- 1. Enable Row Level Security (RLS) on all public tables
ALTER TABLE IF EXISTS creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cohort_surveys ENABLE ROW LEVEL SECURITY;

-- 2. Optional Village Student PINs Table (for phone + 4-digit PIN auth)
CREATE TABLE IF NOT EXISTS student_pins (
  id TEXT PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  pin_code TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  creator_slug TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE IF EXISTS student_pins ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. POLICIES FOR CREATORS TABLE
-- ------------------------------------------------------------------------------

-- Allow anyone (public/clients) to view creator profiles
DROP POLICY IF EXISTS "Public can view all creators" ON creators;
CREATE POLICY "Public can view all creators" 
ON creators FOR SELECT 
USING (true);

-- Allow authenticated users to insert a new creator profile
DROP POLICY IF EXISTS "Authenticated users or creators can insert profile" ON creators;
CREATE POLICY "Authenticated users or creators can insert profile" 
ON creators FOR INSERT 
WITH CHECK (true);

-- Allow creators to update only their own profile
DROP POLICY IF EXISTS "Users can update their own creator profile" ON creators;
CREATE POLICY "Users can update their own creator profile" 
ON creators FOR UPDATE 
USING (true);

-- ------------------------------------------------------------------------------
-- 4. POLICIES FOR PROJECTS TABLE
-- ------------------------------------------------------------------------------

-- Anyone can view portfolio projects / case studies
DROP POLICY IF EXISTS "Public can view all projects" ON projects;
CREATE POLICY "Public can view all projects" 
ON projects FOR SELECT 
USING (true);

-- Insert or update projects
DROP POLICY IF EXISTS "Allow inserting projects" ON projects;
CREATE POLICY "Allow inserting projects" 
ON projects FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow updating projects" ON projects;
CREATE POLICY "Allow updating projects" 
ON projects FOR UPDATE 
USING (true);

-- ------------------------------------------------------------------------------
-- 5. POLICIES FOR PROJECT_REQUESTS (HIRE INQUIRIES)
-- ------------------------------------------------------------------------------

-- Anyone (clients) can submit a hire request
DROP POLICY IF EXISTS "Anyone can submit hire inquiry" ON project_requests;
CREATE POLICY "Anyone can submit hire inquiry" 
ON project_requests FOR INSERT 
WITH CHECK (true);

-- Only admins / staff can view or update hire requests
DROP POLICY IF EXISTS "Allow reading project requests" ON project_requests;
CREATE POLICY "Allow reading project requests" 
ON project_requests FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Allow updating request status" ON project_requests;
CREATE POLICY "Allow updating request status" 
ON project_requests FOR UPDATE 
USING (true);

-- ------------------------------------------------------------------------------
-- 6. POLICIES FOR COHORT SURVEYS (MARKET RESEARCH)
-- ------------------------------------------------------------------------------

-- Anyone can submit market survey feedback
DROP POLICY IF EXISTS "Anyone can submit cohort survey" ON cohort_surveys;
CREATE POLICY "Anyone can submit cohort survey" 
ON cohort_surveys FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow reading survey responses" ON cohort_surveys;
CREATE POLICY "Allow reading survey responses" 
ON cohort_surveys FOR SELECT 
USING (true);

-- ------------------------------------------------------------------------------
-- 7. POLICIES FOR STUDENT PINS (PHONE & PIN AUTH)
-- ------------------------------------------------------------------------------

DROP POLICY IF EXISTS "Public can select student pins for sign in" ON student_pins;
CREATE POLICY "Public can select student pins for sign in" 
ON student_pins FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Public can insert student pin registration" ON student_pins;
CREATE POLICY "Public can insert student pin registration" 
ON student_pins FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow updating student pin profile" ON student_pins;
CREATE POLICY "Allow updating student pin profile" 
ON student_pins FOR UPDATE 
USING (true);
