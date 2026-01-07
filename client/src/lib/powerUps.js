// Power-Up System for Accessory Work
// RPG-style themed accessories with XP and progression

// XP Values
export const XP_VALUES = {
  EASY: 10,
  MEDIUM: 20,
  HARD: 30,
  BONUS: 5, // Extra XP for streaks
};

// Level thresholds (XP needed to reach each level)
export const LEVELS = [
  { level: 1, xp: 0, title: 'Novice Lifter' },
  { level: 2, xp: 100, title: 'Apprentice' },
  { level: 3, xp: 250, title: 'Dedicated Warrior' },
  { level: 4, xp: 500, title: 'Iron Veteran' },
  { level: 5, xp: 1000, title: 'Elite Athlete' },
  { level: 6, xp: 2000, title: 'Power Legend' },
  { level: 7, xp: 3500, title: 'Titan' },
  { level: 8, xp: 5500, title: 'Demigod' },
  { level: 9, xp: 8000, title: 'Immortal' },
  { level: 10, xp: 12000, title: 'Transcendent' },
];

// Badges/Achievements
export const BADGES = {
  FIRST_POWERUP: { id: 'first_powerup', name: 'Power Player', description: 'Complete your first power-up', icon: '⭐' },
  STREAK_3: { id: 'streak_3', name: 'On Fire', description: '3-day power-up streak', icon: '🔥' },
  STREAK_7: { id: 'streak_7', name: 'Unstoppable', description: '7-day power-up streak', icon: '💪' },
  COMPLETE_10: { id: 'complete_10', name: 'Power Collector', description: 'Complete 10 power-ups', icon: '🎯' },
  COMPLETE_50: { id: 'complete_50', name: 'Power Master', description: 'Complete 50 power-ups', icon: '👑' },
  COMPLETE_100: { id: 'complete_100', name: 'Legend', description: 'Complete 100 power-ups', icon: '💎' },
  LEVEL_5: { id: 'level_5', name: 'Elite Status', description: 'Reach level 5', icon: '🏆' },
  LEVEL_10: { id: 'level_10', name: 'Max Level', description: 'Reach level 10', icon: '👹' },
};

// Themed Power-Up Sets
export const POWERUP_THEMES = {
  // Upper Body Themes (for bench/press days)
  UPPER_PUMP: {
    name: '💪 Upper Body Pump',
    description: 'Blast those arms and shoulders!',
    color: '#ff6b9d',
    exercises: [
      { name: 'Barbell Curls', sets: '3x12', xp: XP_VALUES.MEDIUM, notes: 'Strict form, control the eccentric' },
      { name: 'Tricep Pushdowns', sets: '3x15', xp: XP_VALUES.MEDIUM, notes: 'Squeeze at the bottom' },
      { name: 'Lateral Raises', sets: '3x12', xp: XP_VALUES.MEDIUM, notes: 'Light weight, perfect form' },
    ]
  },

  CHEST_FINISHER: {
    name: '🔥 Chest Finisher',
    description: 'Maximum pec activation',
    color: '#ff4757',
    exercises: [
      { name: 'Cable Flyes', sets: '3x15', xp: XP_VALUES.MEDIUM, notes: 'Squeeze at the peak' },
      { name: 'Push-ups to Failure', sets: '2 sets', xp: XP_VALUES.HARD, notes: 'Go until you can\'t' },
    ]
  },

  SHOULDER_BLAST: {
    name: '🎯 Shoulder Blast',
    description: 'Build boulder shoulders',
    color: '#ffa502',
    exercises: [
      { name: 'Face Pulls', sets: '3x20', xp: XP_VALUES.MEDIUM, notes: 'Pull to face, external rotation' },
      { name: 'Rear Delt Flyes', sets: '3x15', xp: XP_VALUES.MEDIUM, notes: 'Chest supported if possible' },
      { name: 'Band Pull-Aparts', sets: '3x25', xp: XP_VALUES.EASY, notes: 'Squeeze shoulder blades together' },
    ]
  },

  // Lower Body Themes (for squat/deadlift days)
  LEG_DESTROYER: {
    name: '🦵 Leg Destroyer',
    description: 'Extra volume for growth',
    color: '#26de81',
    exercises: [
      { name: 'Walking Lunges', sets: '3x12 each leg', xp: XP_VALUES.HARD, notes: 'Control the descent' },
      { name: 'Leg Curls', sets: '3x15', xp: XP_VALUES.MEDIUM, notes: 'Squeeze hamstrings' },
      { name: 'Calf Raises', sets: '4x20', xp: XP_VALUES.EASY, notes: 'Full range of motion' },
    ]
  },

  BACK_ATTACK: {
    name: '🎸 Back Attack',
    description: 'Build that V-taper',
    color: '#4b7bec',
    exercises: [
      { name: 'Lat Pulldowns', sets: '3x12', xp: XP_VALUES.MEDIUM, notes: 'Pull to chest, control up' },
      { name: 'Seated Cable Rows', sets: '3x12', xp: XP_VALUES.MEDIUM, notes: 'Squeeze shoulder blades' },
      { name: 'Straight-Arm Pushdowns', sets: '3x15', xp: XP_VALUES.EASY, notes: 'Feel the lats stretch' },
    ]
  },

  POSTERIOR_CHAIN: {
    name: '⛓️ Posterior Power',
    description: 'Hamstrings and glutes on fire',
    color: '#a55eea',
    exercises: [
      { name: 'Romanian Deadlifts', sets: '3x10', xp: XP_VALUES.HARD, notes: 'Feel the hamstring stretch' },
      { name: 'Glute Bridges', sets: '3x15', xp: XP_VALUES.MEDIUM, notes: 'Squeeze at the top' },
      { name: 'Back Extensions', sets: '3x12', xp: XP_VALUES.MEDIUM, notes: 'Control the movement' },
    ]
  },

  // Core Themes (can appear any day)
  CORE_CRUSHER: {
    name: '🎯 Core Crusher',
    description: 'Abs of steel',
    color: '#fed330',
    exercises: [
      { name: 'Hanging Leg Raises', sets: '3x12', xp: XP_VALUES.HARD, notes: 'Control the swing' },
      { name: 'Planks', sets: '3x60s', xp: XP_VALUES.MEDIUM, notes: 'Keep hips level' },
      { name: 'Russian Twists', sets: '3x20 each side', xp: XP_VALUES.MEDIUM, notes: 'Rotate from core' },
    ]
  },

  AB_BURNER: {
    name: '🔥 Ab Burner',
    description: 'Quick core blast',
    color: '#fc5c65',
    exercises: [
      { name: 'Ab Wheel Rollouts', sets: '3x10', xp: XP_VALUES.HARD, notes: 'Don\'t hyperextend back' },
      { name: 'Dead Bugs', sets: '3x10 each side', xp: XP_VALUES.MEDIUM, notes: 'Keep lower back pressed down' },
    ]
  },

  SIX_PACK_SPECIAL: {
    name: '💎 Six Pack Special',
    description: 'Ultimate ab workout',
    color: '#45aaf2',
    exercises: [
      { name: 'Cable Crunches', sets: '3x15', xp: XP_VALUES.MEDIUM, notes: 'Crunch down, don\'t just pull with arms' },
      { name: 'Bicycle Crunches', sets: '3x20 each side', xp: XP_VALUES.MEDIUM, notes: 'Slow and controlled' },
      { name: 'Side Planks', sets: '2x45s each side', xp: XP_VALUES.MEDIUM, notes: 'Keep body straight' },
    ]
  },

  // Quick Wildcards (can appear any day)
  QUICK_PUMP: {
    name: '⚡ Quick Pump',
    description: 'Fast accessory blast',
    color: '#fd79a8',
    exercises: [
      { name: 'Hammer Curls', sets: '3x12', xp: XP_VALUES.EASY, notes: 'Keep elbows tight' },
      { name: 'Overhead Tricep Extension', sets: '3x12', xp: XP_VALUES.EASY, notes: 'Full stretch at bottom' },
    ]
  },

  CONDITIONING_BOOST: {
    name: '💨 Conditioning Boost',
    description: 'Quick cardio finisher',
    color: '#00d2d3',
    exercises: [
      { name: 'Assault Bike', sets: '5 x 30s sprint / 30s rest', xp: XP_VALUES.HARD, notes: 'All out effort' },
      { name: 'Jump Rope', sets: '3 x 60s', xp: XP_VALUES.MEDIUM, notes: 'Stay on toes' },
    ]
  },
};

// Day-specific theme mappings (what themes can appear on which days)
export const DAY_THEME_MAP = {
  monday: {
    // Squat + Bench day
    themed: ['UPPER_PUMP', 'CHEST_FINISHER', 'LEG_DESTROYER'],
    wildcards: ['CORE_CRUSHER', 'AB_BURNER', 'QUICK_PUMP'],
  },
  tuesday: {
    // Press + Light Deadlift day
    themed: ['SHOULDER_BLAST', 'BACK_ATTACK', 'POSTERIOR_CHAIN'],
    wildcards: ['CORE_CRUSHER', 'SIX_PACK_SPECIAL', 'QUICK_PUMP'],
  },
  wednesday: {
    // Squat + Bench volume day
    themed: ['UPPER_PUMP', 'CHEST_FINISHER', 'LEG_DESTROYER'],
    wildcards: ['AB_BURNER', 'QUICK_PUMP', 'CONDITIONING_BOOST'],
  },
  thursday: {
    // Press volume + Front Squat + RDL
    themed: ['SHOULDER_BLAST', 'POSTERIOR_CHAIN', 'LEG_DESTROYER'],
    wildcards: ['CORE_CRUSHER', 'SIX_PACK_SPECIAL', 'QUICK_PUMP'],
  },
  friday: {
    // Squat + Heavy Deadlift day
    themed: ['BACK_ATTACK', 'POSTERIOR_CHAIN', 'LEG_DESTROYER'],
    wildcards: ['CORE_CRUSHER', 'AB_BURNER', 'CONDITIONING_BOOST'],
  },
};

// Generate random power-ups for a specific day (75% themed, 25% wildcard)
export function generateDailyPowerUps(day, count = 3) {
  const dayThemes = DAY_THEME_MAP[day.toLowerCase()];
  if (!dayThemes) return [];

  const powerUps = [];
  const usedThemes = new Set();

  // 75% chance for themed, 25% for wildcard
  for (let i = 0; i < count; i++) {
    const isThemed = Math.random() < 0.75;
    const pool = isThemed ? dayThemes.themed : dayThemes.wildcards;

    // Find unused theme
    let attempts = 0;
    let themeKey;
    do {
      themeKey = pool[Math.floor(Math.random() * pool.length)];
      attempts++;
    } while (usedThemes.has(themeKey) && attempts < 20);

    if (!usedThemes.has(themeKey)) {
      usedThemes.add(themeKey);
      powerUps.push({
        id: `${day}_${Date.now()}_${i}`,
        themeKey,
        theme: POWERUP_THEMES[themeKey],
        isThemed,
      });
    }
  }

  return powerUps;
}

// Calculate level from total XP
export function calculateLevel(totalXP) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].xp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

// Get XP needed for next level
export function getXPToNextLevel(totalXP) {
  const currentLevel = calculateLevel(totalXP);
  const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);

  if (!nextLevel) {
    return { current: totalXP, needed: totalXP, progress: 100 }; // Max level
  }

  const currentLevelXP = currentLevel.xp;
  const nextLevelXP = nextLevel.xp;
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const progress = (xpInCurrentLevel / xpNeededForLevel) * 100;

  return {
    current: xpInCurrentLevel,
    needed: xpNeededForLevel,
    progress: Math.min(progress, 100),
    nextLevel,
  };
}

// Check which badges should be awarded
export function checkBadges(stats) {
  const earned = [];
  const { totalPowerUps, currentStreak, totalXP } = stats;
  const level = calculateLevel(totalXP);

  if (totalPowerUps >= 1) earned.push(BADGES.FIRST_POWERUP);
  if (currentStreak >= 3) earned.push(BADGES.STREAK_3);
  if (currentStreak >= 7) earned.push(BADGES.STREAK_7);
  if (totalPowerUps >= 10) earned.push(BADGES.COMPLETE_10);
  if (totalPowerUps >= 50) earned.push(BADGES.COMPLETE_50);
  if (totalPowerUps >= 100) earned.push(BADGES.COMPLETE_100);
  if (level.level >= 5) earned.push(BADGES.LEVEL_5);
  if (level.level >= 10) earned.push(BADGES.LEVEL_10);

  return earned;
}
