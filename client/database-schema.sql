-- 4/3/2/1 Workout Tracker Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- User setup table (stores 1RM maxes and current week)
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

-- Create indexes for better performance
CREATE INDEX idx_user_setup_user_id ON user_setup(user_id);
CREATE INDEX idx_workout_logs_user_id ON workout_logs(user_id);
CREATE INDEX idx_workout_logs_date ON workout_logs(date DESC);
