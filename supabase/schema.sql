-- CV Maker Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)

-- Enable UUID extension (usually enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CVs table
CREATE TABLE IF NOT EXISTS cvs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled CV',
  template TEXT NOT NULL DEFAULT 'modern',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CV Data table (stores all section data as JSON)
CREATE TABLE IF NOT EXISTS cv_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cv_id UUID NOT NULL REFERENCES cvs(id) ON DELETE CASCADE,
  personal_info JSONB NOT NULL DEFAULT '{}',
  education JSONB NOT NULL DEFAULT '[]',
  experience JSONB NOT NULL DEFAULT '[]',
  skills JSONB NOT NULL DEFAULT '[]',
  projects JSONB NOT NULL DEFAULT '[]',
  certifications JSONB NOT NULL DEFAULT '[]'
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cvs_user_id ON cvs(user_id);
CREATE INDEX IF NOT EXISTS idx_cv_data_cv_id ON cv_data(cv_id);

-- Enable Row Level Security (RLS)
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cvs table
CREATE POLICY "Users can view their own CVs"
  ON cvs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own CVs"
  ON cvs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CVs"
  ON cvs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CVs"
  ON cvs FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for cv_data table
CREATE POLICY "Users can view their own CV data"
  ON cv_data FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cvs WHERE cvs.id = cv_data.cv_id AND cvs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own CV data"
  ON cv_data FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM cvs WHERE cvs.id = cv_data.cv_id AND cvs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own CV data"
  ON cv_data FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM cvs WHERE cvs.id = cv_data.cv_id AND cvs.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own CV data"
  ON cv_data FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM cvs WHERE cvs.id = cv_data.cv_id AND cvs.user_id = auth.uid()
    )
  );
