-- Add new daily_entries table for consolidated tracking
CREATE TABLE IF NOT EXISTS daily_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,

  -- Cycle tracking
  cycle_day INTEGER,
  cycle_phase TEXT CHECK (cycle_phase IN ('menstruation', 'follicular', 'ovulation', 'luteal')),

  -- Moods (stored as array)
  moods TEXT[],
  energy_score INTEGER CHECK (energy_score BETWEEN 1 AND 5),

  -- Habits
  water_glasses INTEGER DEFAULT 0,
  sleep_hours NUMERIC(3,1) DEFAULT 0,
  movement_type TEXT,
  meals INTEGER DEFAULT 0,
  snacks INTEGER DEFAULT 0,

  -- Journal & Reflections
  journal TEXT,
  proud_of TEXT,
  grateful_for TEXT,
  manifestation TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, date)
);

-- Disable RLS for MVP
ALTER TABLE daily_entries DISABLE ROW LEVEL SECURITY;

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_daily_entries_user_date ON daily_entries(user_id, date DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_daily_entries_updated_at
    BEFORE UPDATE ON daily_entries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
