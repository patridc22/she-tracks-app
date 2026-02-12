-- She Tracks Database Schema
-- IMPORTANT: RLS (Row Level Security) is DISABLED for MVP
-- Add security policies in future iterations

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- ============================================
-- USER SETTINGS
-- ============================================
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  cycle_length INTEGER DEFAULT 28,
  period_duration INTEGER DEFAULT 5,
  last_period_start DATE,
  contraception TEXT,
  tracking_frequency TEXT DEFAULT 'once' CHECK (tracking_frequency IN ('once', 'twice')),
  goal_window INTEGER DEFAULT 30 CHECK (goal_window IN (30, 60, 90)),
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_settings DISABLE ROW LEVEL SECURITY;

-- ============================================
-- GOALS
-- ============================================
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  goal_type TEXT NOT NULL,
  selected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE goals DISABLE ROW LEVEL SECURITY;

-- ============================================
-- CYCLE LOGS
-- ============================================
CREATE TABLE IF NOT EXISTS cycle_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  cycle_day INTEGER NOT NULL,
  phase TEXT CHECK (phase IN ('menstruation', 'follicular', 'ovulation', 'luteal')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

ALTER TABLE cycle_logs DISABLE ROW LEVEL SECURITY;

-- ============================================
-- MOOD LOGS
-- ============================================
CREATE TABLE IF NOT EXISTS mood_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  time_of_day TEXT CHECK (time_of_day IN ('morning', 'evening')),
  mood TEXT NOT NULL,
  energy_score INTEGER CHECK (energy_score BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date, time_of_day)
);

ALTER TABLE mood_logs DISABLE ROW LEVEL SECURITY;

-- ============================================
-- JOURNAL ENTRIES
-- ============================================
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  time_of_day TEXT CHECK (time_of_day IN ('morning', 'evening')),
  content TEXT NOT NULL,
  word_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE journal_entries DISABLE ROW LEVEL SECURITY;

-- ============================================
-- HABIT DEFINITIONS
-- ============================================
CREATE TABLE IF NOT EXISTS habit_definitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  label TEXT NOT NULL,
  emoji TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE habit_definitions DISABLE ROW LEVEL SECURITY;

-- ============================================
-- HABIT LOGS
-- ============================================
CREATE TABLE IF NOT EXISTS habit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  habit_id UUID REFERENCES habit_definitions(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, habit_id, date)
);

ALTER TABLE habit_logs DISABLE ROW LEVEL SECURITY;

-- ============================================
-- AI SUMMARIES
-- ============================================
CREATE TABLE IF NOT EXISTS ai_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  summary_type TEXT CHECK (summary_type IN ('daily', 'weekly', 'monthly')),
  content TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date, summary_type)
);

ALTER TABLE ai_summaries DISABLE ROW LEVEL SECURITY;

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  morning_enabled BOOLEAN DEFAULT FALSE,
  morning_time TIME DEFAULT '08:00',
  evening_enabled BOOLEAN DEFAULT FALSE,
  evening_time TIME DEFAULT '20:00',
  weekly_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_cycle_logs_user_date ON cycle_logs(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_mood_logs_user_date ON mood_logs(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_date ON journal_entries(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_habit_logs_user_date ON habit_logs(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_ai_summaries_user_date ON ai_summaries(user_id, date DESC);

-- ============================================
-- SEED DEFAULT HABITS (optional)
-- ============================================
-- Uncomment to insert default habits for testing
-- INSERT INTO habit_definitions (user_id, label, emoji, is_active) VALUES
--   ('user-uuid-here', 'Water', '💧', true),
--   ('user-uuid-here', 'Sleep', '💤', true),
--   ('user-uuid-here', 'Movement', '🏃', true),
--   ('user-uuid-here', 'Nourishing Meals', '🥗', true);
