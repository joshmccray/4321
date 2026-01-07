-- Onboarding & Character Classes Migration
-- Run this in your Supabase SQL Editor to add goal tiers and character classes
-- This adds new columns without affecting existing data

-- Add onboarding and customization fields to user_setup
ALTER TABLE user_setup ADD COLUMN IF NOT EXISTS goal_tier VARCHAR(10) DEFAULT '4321';
ALTER TABLE user_setup ADD COLUMN IF NOT EXISTS goal_deadlift INTEGER DEFAULT 405;
ALTER TABLE user_setup ADD COLUMN IF NOT EXISTS goal_squat INTEGER DEFAULT 315;
ALTER TABLE user_setup ADD COLUMN IF NOT EXISTS goal_bench INTEGER DEFAULT 225;
ALTER TABLE user_setup ADD COLUMN IF NOT EXISTS goal_press INTEGER DEFAULT 135;
ALTER TABLE user_setup ADD COLUMN IF NOT EXISTS character_class VARCHAR(50) DEFAULT 'tactician';
ALTER TABLE user_setup ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- For existing users, set onboarding_completed to true so they don't see the wizard
UPDATE user_setup SET onboarding_completed = true WHERE onboarding_completed IS NULL OR onboarding_completed = false;

-- Note: New users will get onboarding_completed = false by default and see the wizard
