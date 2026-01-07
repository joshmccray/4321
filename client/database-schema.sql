-- 4/3/2/1 Workout Tracker Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- User setup table (stores 1RM maxes, current week, goals, and character class)
CREATE TABLE user_setup (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  squat_max INTEGER NOT NULL DEFAULT 275,
  deadlift_max INTEGER NOT NULL DEFAULT 295,
  bench_max INTEGER NOT NULL DEFAULT 165,
  press_max INTEGER NOT NULL DEFAULT 105,
  front_squat_max INTEGER NOT NULL DEFAULT 225,
  rdl_max INTEGER NOT NULL DEFAULT 185,
  current_week VARCHAR(1) NOT NULL DEFAULT 'A',
  goal_tier VARCHAR(10) DEFAULT '4321',
  goal_deadlift INTEGER DEFAULT 405,
  goal_squat INTEGER DEFAULT 315,
  goal_bench INTEGER DEFAULT 225,
  goal_press INTEGER DEFAULT 135,
  character_class VARCHAR(50) DEFAULT 'tactician',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Workout logs table
CREATE TABLE workout_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  week VARCHAR(1) NOT NULL,
  day VARCHAR(20) NOT NULL,
  exercise VARCHAR(100) NOT NULL,
  weight VARCHAR(20) NOT NULL,
  sets VARCHAR(20) NOT NULL,
  success BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_setup ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_setup
CREATE POLICY "Users can view their own setup"
  ON user_setup FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own setup"
  ON user_setup FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own setup"
  ON user_setup FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for workout_logs
CREATE POLICY "Users can view their own logs"
  ON workout_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own logs"
  ON workout_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Power-up logs table (tracks completed accessory work)
CREATE TABLE powerup_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  theme_key VARCHAR(50) NOT NULL,
  theme_name VARCHAR(100) NOT NULL,
  exercise VARCHAR(100) NOT NULL,
  sets VARCHAR(20) NOT NULL,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progression table (RPG stats: XP, level, badges)
CREATE TABLE user_progression (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp INTEGER NOT NULL DEFAULT 0,
  total_powerups INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_powerup_date DATE,
  earned_badges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE powerup_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progression ENABLE ROW LEVEL SECURITY;

-- RLS Policies for powerup_logs
CREATE POLICY "Users can view their own powerup logs"
  ON powerup_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own powerup logs"
  ON powerup_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_progression
CREATE POLICY "Users can view their own progression"
  ON user_progression FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progression"
  ON user_progression FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progression"
  ON user_progression FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_setup_user_id ON user_setup(user_id);
CREATE INDEX idx_workout_logs_user_id ON workout_logs(user_id);
CREATE INDEX idx_workout_logs_date ON workout_logs(date DESC);
CREATE INDEX idx_powerup_logs_user_id ON powerup_logs(user_id);
CREATE INDEX idx_powerup_logs_date ON powerup_logs(date DESC);
CREATE INDEX idx_user_progression_user_id ON user_progression(user_id);
