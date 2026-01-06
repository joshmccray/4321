# Quick Start Guide

Get your workout tracker running in 10 minutes!

## Step 1: Create Supabase Project (3 min)

1. Go to https://supabase.com and sign in/sign up
2. Click **"New Project"**
3. Fill in:
   - **Name**: `4321-tracker`
   - **Database Password**: (create a strong one)
   - **Region**: Pick closest to you
4. Click **"Create new project"** (takes ~2 min)

## Step 2: Set Up Database (2 min)

1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Open the file `client/database-schema.sql` from this repo
4. Copy all the SQL and paste into Supabase
5. Click **"Run"** (green play button)
6. You should see "Success. No rows returned"

## Step 3: Get API Keys (1 min)

1. In Supabase, go to **Settings** → **API** (left sidebar)
2. Copy two things:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string under "Project API keys")

## Step 4: Configure App (2 min)

1. Open terminal and navigate to the project:
   ```bash
   cd /path/to/4321/client
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and paste your values:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your_long_key_here
   ```

## Step 5: Install & Run (2 min)

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser!

## Step 6: Create Your Account

1. Click **"Sign Up"**
2. Enter email and password (min 6 characters)
3. Check your email for verification link (check spam!)
4. Click verification link
5. Go back to the app and sign in

## Step 7: Set Your Maxes

1. Go to **"Setup"** tab
2. Enter your 1RM maxes for all lifts
3. Changes save automatically

## Step 8: Log Your First Workout

1. Go to **"Today"** tab (will show rest day if weekend)
2. See today's planned workout pre-loaded
3. Fill in actual weight, sets, mark success/failure
4. Click **"Log"** for each exercise
5. Check **"History"** tab to see your logged workout!

## Troubleshooting

### "Invalid API key"
- Make sure you copied the entire key with no extra spaces
- Restart dev server: Ctrl+C then `npm run dev` again

### Email verification not arriving
- Check spam folder
- In Supabase: **Authentication** → **Settings** → disable "Enable email confirmations" for testing

### Can't see data
- Make sure you ran the database schema SQL
- Check browser console (F12) for errors
- Verify you're logged in (email should show at top)

### Build errors
- Delete `node_modules` and run `npm install` again
- Make sure you're using Node.js v18+

## Next Steps

- **Switch weeks**: Use the "Current Week" dropdown to alternate between Week A and B
- **View programming**: Check **"Week A"** and **"Week B"** tabs to see full weekly plans
- **Track progress**: History tab shows all your logged workouts with success/failure

## Deploy to Production

When ready to deploy:

### Option 1: Netlify (Easiest)
1. Push code to GitHub
2. Go to https://netlify.com
3. Click **"Import from Git"**
4. Select your repo
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables (same as your .env file)
7. Deploy!

### Option 2: Vercel
1. Push code to GitHub
2. Go to https://vercel.com
3. Click **"Import Project"**
4. Select your repo
5. Framework preset: **Vite**
6. Add environment variables
7. Deploy!

Your app will be live at a public URL!

---

**Questions?** Check the detailed [SETUP.md](client/SETUP.md) or open an issue on GitHub.

**Happy lifting!** 💪
