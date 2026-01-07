// Character Classes & Goal Tiers
// RPG-style customization for training styles and goals

// Goal Tier Definitions
export const GOAL_TIERS = {
  '5432': {
    id: '5432',
    name: 'Elite Tier',
    level: 'Advanced',
    description: 'The pinnacle of strength',
    badge: '👑',
    color: '#ffd700', // Gold
    goals: {
      deadlift: 505,
      squat: 405,
      bench: 315,
      press: 225,
    },
  },
  '4321': {
    id: '4321',
    name: 'Advanced Tier',
    level: 'Intermediate-Advanced',
    description: 'The classic 1000lb club path',
    badge: '💎',
    color: '#00d4ff', // Cyan
    goals: {
      deadlift: 405,
      squat: 315,
      bench: 225,
      press: 135,
    },
  },
  '3210': {
    id: '3210',
    name: 'Intermediate Tier',
    level: 'Beginner-Intermediate',
    description: 'Build your foundation strong',
    badge: '⭐',
    color: '#00ff88', // Green (accent color)
    goals: {
      deadlift: 315,
      squat: 225,
      bench: 135,
      press: 95,
    },
  },
};

// Character Class Definitions
export const CHARACTER_CLASSES = {
  bruiser: {
    id: 'bruiser',
    name: 'The Bruiser',
    icon: '💪',
    tagline: 'Raw Strength',
    description: 'Maximum weight. Minimal reps. Pure power.',
    narrative: 'The Bruiser doesn\'t count reps - they count plates. Every set is a statement of dominance. Heavy triples and grindy doubles are your bread and butter.',
    color: '#ff4757', // Red
    theme: 'powerlifting',
    volumeScheme: {
      main: '5x3',          // Main lifts
      volume: '3x3',        // Volume days
      accessory: '3x5',     // Accessories
      description: 'Low reps, heavy weight, pure strength',
    },
  },
  tactician: {
    id: 'tactician',
    name: 'The Tactician',
    icon: '🎯',
    tagline: 'Strategic Programming',
    description: 'Balanced, calculated, efficient gains.',
    narrative: 'The Tactician knows that progress is a chess game, not a battle. Every rep has a purpose. 3x5 and 5x5 schemes have built champions for decades.',
    color: '#4b7bec', // Blue
    theme: 'balanced',
    volumeScheme: {
      main: '3x5',          // Main lifts
      volume: '5x5',        // Volume days
      accessory: '3x8',     // Accessories
      description: 'Classic 3x5/5x5 - the proven path',
    },
  },
  sculptor: {
    id: 'sculptor',
    name: 'The Sculptor',
    icon: '🗿',
    tagline: 'Build The Masterpiece',
    description: 'Volume is the answer. Pump is life.',
    narrative: 'The Sculptor believes every rep carves the physique. More sets, more reps, more growth. 4x8 and 5x10 create the canvas for your masterpiece.',
    color: '#a55eea', // Purple
    theme: 'bodybuilding',
    volumeScheme: {
      main: '4x8',          // Main lifts
      volume: '5x10',       // Volume days
      accessory: '3x12',    // Accessories
      description: 'High volume for maximum muscle growth',
    },
  },
  warrior: {
    id: 'warrior',
    name: 'The Warrior',
    icon: '⚔️',
    tagline: 'Power Meets Performance',
    description: 'Train like an athlete. Move with purpose.',
    narrative: 'The Warrior blends strength with speed. 4x6 builds explosive power while maintaining volume. You\'re not just strong - you\'re athletic.',
    color: '#26de81', // Green
    theme: 'athletic',
    volumeScheme: {
      main: '4x6',          // Main lifts
      volume: '5x8',        // Volume days
      accessory: '3x10',    // Accessories
      description: 'Balanced power and athleticism',
    },
  },
};

// Helper: Get goal tier by ID
export function getGoalTier(tierId) {
  return GOAL_TIERS[tierId] || GOAL_TIERS['4321'];
}

// Helper: Get character class by ID
export function getCharacterClass(classId) {
  return CHARACTER_CLASSES[classId] || CHARACTER_CLASSES.tactician;
}

// Helper: Get volume scheme for a character class
export function getVolumeScheme(classId, exerciseType = 'main') {
  const characterClass = getCharacterClass(classId);
  return characterClass.volumeScheme[exerciseType] || '3x5';
}

// Helper: Parse volume scheme to { sets, reps }
export function parseVolumeScheme(scheme) {
  // Handle formats: "3x5", "5x5", "1x5", etc.
  const match = scheme.match(/(\d+)x(\d+)/);
  if (match) {
    return {
      sets: parseInt(match[1]),
      reps: parseInt(match[2]),
      formatted: scheme,
    };
  }
  // Default fallback
  return {
    sets: 3,
    reps: 5,
    formatted: '3x5',
  };
}

// Helper: Apply volume scheme to exercise
export function applyVolumeScheme(exercise, classId, isVolumeDay = false) {
  const scheme = getVolumeScheme(classId, isVolumeDay ? 'volume' : 'main');
  return {
    ...exercise,
    sets: scheme,
  };
}

// Get all available goal tiers as array
export function getAllGoalTiers() {
  return Object.values(GOAL_TIERS);
}

// Get all available character classes as array
export function getAllCharacterClasses() {
  return Object.values(CHARACTER_CLASSES);
}
