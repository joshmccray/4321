# 4/3/2/1 Workout Tracker

A modern workout tracking web app designed for the Starting Strength 5-day split, with the goal of hitting 4/3/2/1 plates on the big 4 lifts (405 lb deadlift, 315 lb squat, 225 lb bench, 135 lb press).

## Features

- **User Authentication** - Secure sign up/login with Supabase
- **Today's Workout** - Automatically shows today's planned workout for quick logging
- **Auto-populated Logging** - Pre-filled exercise data based on your 1RM maxes
- **Progress Tracking** - Complete workout history with success/failure indicators
- **Multi-user Support** - Each user has their own data and maxes
- **Cross-device Sync** - Cloud-based storage accessible from any device
- **Week A/B Programming** - Alternating 5-day split workouts

## Quick Start

See [client/SETUP.md](client/SETUP.md) for complete setup instructions.

1. Clone the repository
2. Set up a Supabase project
3. Create the database tables using `client/database-schema.sql`
4. Configure `.env` with your Supabase credentials
5. Run `npm install && npm run dev`

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Custom CSS with dark theme
- **Deployment**: Netlify/Vercel ready

## Project Structure

```
4321/
├── index.html              # Original single-file version
├── client/                 # New React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks (auth, data)
│   │   ├── lib/           # Utilities and Supabase client
│   │   └── styles/        # Global CSS
│   ├── database-schema.sql # Database setup
│   └── SETUP.md           # Detailed setup guide
└── README.md              # This file
```

## Original Version

The `index.html` file contains the original single-file version using localStorage. The new React app in `/client` adds:
- User authentication
- Cloud storage
- Multi-user support
- Improved daily workout logging
- Better code organization

## Contributing

Feel free to open issues or submit PRs for improvements!