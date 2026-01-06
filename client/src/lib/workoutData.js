// Workout calculation utilities
export const calculateStartWeight = (max, percentage) => {
  return Math.round((max * percentage) / 2.5) * 2.5;
};

export const calculateWeights = (setup) => {
  return {
    squat: calculateStartWeight(setup.squatMax, 0.85),
    deadlift: calculateStartWeight(setup.deadliftMax, 0.85),
    bench: calculateStartWeight(setup.benchMax, 0.85),
    press: calculateStartWeight(setup.pressMax, 0.85),
    frontSquat: calculateStartWeight(setup.frontSquatMax, 0.80),
    rdl: calculateStartWeight(setup.rdlMax, 0.70)
  };
};

export const getWeekWorkouts = (weights, week) => {
  const weekAWorkouts = {
    monday: [
      { name: 'Squat', sets: '3x5', weight: weights.squat },
      { name: 'Bench Press', sets: '3x5', weight: weights.bench },
      { name: 'Barbell Rows', sets: '3x5', weight: 0 }
    ],
    tuesday: [
      { name: 'Overhead Press', sets: '3x5', weight: weights.press },
      { name: 'Deadlift (Light)', sets: '3x5', weight: Math.round(weights.deadlift * 0.85) },
      { name: 'Chin-ups', sets: '3x8-10', weight: 'BW' }
    ],
    wednesday: [
      { name: 'Squat', sets: '3x5', weight: weights.squat + 5 },
      { name: 'Bench Press', sets: '5x5', weight: Math.round(weights.bench * 0.9 / 2.5) * 2.5 },
      { name: 'Dips', sets: '3x10', weight: 'BW' }
    ],
    thursday: [
      { name: 'Overhead Press', sets: '5x5', weight: Math.round(weights.press * 0.9 / 2.5) * 2.5 },
      { name: 'Front Squat', sets: '3x5', weight: weights.frontSquat },
      { name: 'Romanian Deadlift', sets: '3x8', weight: weights.rdl }
    ],
    friday: [
      { name: 'Squat', sets: '3x5', weight: weights.squat + 10 },
      { name: 'Deadlift (Heavy)', sets: '1x5', weight: weights.deadlift },
      { name: 'Barbell Rows', sets: '3x5', weight: 0 }
    ]
  };

  const weekBWorkouts = {
    monday: [
      { name: 'Squat', sets: '3x5', weight: weights.squat },
      { name: 'Overhead Press', sets: '3x5', weight: weights.press },
      { name: 'Barbell Rows', sets: '3x5', weight: 0 }
    ],
    tuesday: [
      { name: 'Bench Press', sets: '3x5', weight: weights.bench },
      { name: 'Deadlift (Light)', sets: '3x5', weight: Math.round(weights.deadlift * 0.85) },
      { name: 'Pull-ups', sets: '3x8-10', weight: 'BW' }
    ],
    wednesday: [
      { name: 'Squat', sets: '3x5', weight: weights.squat + 5 },
      { name: 'Overhead Press', sets: '5x5', weight: Math.round(weights.press * 0.9 / 2.5) * 2.5 },
      { name: 'Close-Grip Bench', sets: '3x8', weight: 0 }
    ],
    thursday: [
      { name: 'Bench Press', sets: '5x5', weight: Math.round(weights.bench * 0.9 / 2.5) * 2.5 },
      { name: 'Front Squat', sets: '3x5', weight: weights.frontSquat },
      { name: 'Romanian Deadlift', sets: '3x8', weight: weights.rdl }
    ],
    friday: [
      { name: 'Squat', sets: '3x5', weight: weights.squat + 10 },
      { name: 'Deadlift (Heavy)', sets: '1x5', weight: weights.deadlift },
      { name: 'Barbell Rows', sets: '3x5', weight: 0 }
    ]
  };

  return week === 'A' ? weekAWorkouts : weekBWorkouts;
};

export const getDayName = (dayKey) => {
  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday'
  };
  return dayNames[dayKey] || dayKey;
};

export const getTodayWorkout = (weights, currentWeek) => {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  const todayKey = daysOfWeek[today];

  // Only return workout for Mon-Fri
  if (today === 0 || today === 6) {
    return null;
  }

  const workouts = getWeekWorkouts(weights, currentWeek);
  return {
    day: todayKey,
    dayName: getDayName(todayKey),
    exercises: workouts[todayKey] || []
  };
};
