# 4/3/2/1 Workout Tracker - Setup Guide

This guide will walk you through setting up the workout tracker app with Supabase authentication and database.

## Prerequisites

- Node.js (v18 or higher)
- A Supabase account (free tier works great!)

## 1. Supabase Project Setup

### Create a New Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: 4321-workout-tracker (or any name you prefer)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to you
4. Click "Create new project" (this takes ~2 minutes)

### Set Up Database Tables

1. Once your project is created, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste the SQL schema from `database-schema.sql` (see below)
4. Click "Run" to execute the SQL

### Get Your API Keys

1. Go to **Settings** → **API** (in the left sidebar)
2. Copy the following values:
   - **Project URL** (under "Project API URL")
   - **anon public** key (under "Project API keys")

## 2. Local Environment Setup

### Configure Environment Variables

1. In the `client` directory, create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### Install Dependencies and Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app should now be running at `http://localhost:5173`!

## 3. Database Schema

Create these tables in your Supabase SQL Editor:

```sql
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
```

## 4. Configure Email Authentication (Optional but Recommended)

By default, Supabase requires email confirmation. To customize:

1. Go to **Authentication** → **Settings**
2. Under "User Signups":
   - You can disable "Enable email confirmations" for easier testing
   - Or configure your SMTP settings for custom email templates

## 5. Deploy to Production

### Build for Production

```bash
npm run build
```

### Deploy Options

1. **Netlify** (Recommended):
   - Connect your GitHub repo
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

2. **Vercel**:
   - Import your repository
   - Framework preset: Vite
   - Add environment variables

3. **Supabase Storage** (coming soon):
   - Supabase also offers static site hosting

## Troubleshooting

### "Invalid API key"
- Double-check your `.env` file has the correct Supabase URL and anon key
- Make sure you restart the dev server after changing `.env`

### "Row Level Security policy violation"
- Ensure RLS policies are properly created in the SQL Editor
- Check that you're logged in with a valid user

### Email confirmation not working
- Check your Supabase email settings
- For development, you can disable email confirmation in Auth settings

## Features

✅ **User Authentication** - Secure sign up/login with Supabase Auth
✅ **Today's Workout** - Auto-populated daily workout based on current week
✅ **Quick Logging** - Log exercises with one click
✅ **Progress Tracking** - View workout history with success/failure indicators
✅ **Multi-user Support** - Each user has their own data and 1RM maxes
✅ **Cross-device Sync** - Cloud-based storage syncs across all your devices

## What's Next?

- Add charts and progress visualization
- Export workout data to CSV
- Add PR (personal record) tracking
- Mobile app version
- Share workouts with training partners
