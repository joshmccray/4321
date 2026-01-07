-- Power-Up System Migration
-- Run this in your Supabase SQL Editor to add the power-up feature
-- This adds new tables without affecting existing data

-- Power-up logs table (tracks completed accessory work)
CREATE TABLE IF NOT EXISTS powerup_logs (
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
CREATE TABLE IF NOT EXISTS user_progression (
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
CREATE INDEX IF NOT EXISTS idx_powerup_logs_user_id ON powerup_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_powerup_logs_date ON powerup_logs(date DESC);
CREATE INDEX IF NOT EXISTS idx_user_progression_user_id ON user_progression(user_id);
