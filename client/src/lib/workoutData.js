// Workout calculation utilities
import { getVolumeScheme } from './characterClasses';

export const calculateStartWeight = (max, percentage) => {
  return Math.round((max * percentage) / 2.5) * 2.5;
};

export const calculateWeights = (setup) => {
  return {
    squat: calculateStartWeight(setup.squatMax || setup.squat_max, 0.85),
    deadlift: calculateStartWeight(setup.deadliftMax || setup.deadlift_max, 0.85),
    bench: calculateStartWeight(setup.benchMax || setup.bench_max, 0.85),
    press: calculateStartWeight(setup.pressMax || setup.press_max, 0.85),
    frontSquat: calculateStartWeight(setup.frontSquatMax || setup.front_squat_max, 0.80),
    rdl: calculateStartWeight(setup.rdlMax || setup.rdl_max, 0.70)
  };
};

export const getWeekWorkouts = (weights, week, characterClass = 'tactician') => {
  // Get volume schemes for this character class
  const mainScheme = getVolumeScheme(characterClass, 'main');
  const volumeScheme = getVolumeScheme(characterClass, 'volume');
  const accessoryScheme = getVolumeScheme(characterClass, 'accessory');


  const weekAWorkouts = {
    monday: [
      { name: 'Squat', sets: mainScheme, weight: weights.squat },
      { name: 'Bench Press', sets: mainScheme, weight: weights.bench },
      { name: 'Barbell Rows', sets: accessoryScheme, weight: 0 }
    ],
    tuesday: [
      { name: 'Overhead Press', sets: mainScheme, weight: weights.press },
      { name: 'Deadlift (Light)', sets: mainScheme, weight: Math.round(weights.deadlift * 0.85) },
      { name: 'Chin-ups', sets: accessoryScheme, weight: 'BW' }
    ],
    wednesday: [
      { name: 'Squat', sets: mainScheme, weight: weights.squat + 5 },
      { name: 'Bench Press', sets: volumeScheme, weight: Math.round(weights.bench * 0.9 / 2.5) * 2.5 },
      { name: 'Dips', sets: accessoryScheme, weight: 'BW' }
    ],
    thursday: [
      { name: 'Overhead Press', sets: volumeScheme, weight: Math.round(weights.press * 0.9 / 2.5) * 2.5 },
      { name: 'Front Squat', sets: mainScheme, weight: weights.frontSquat },
      { name: 'Romanian Deadlift', sets: accessoryScheme, weight: weights.rdl }
    ],
    friday: [
      { name: 'Squat', sets: mainScheme, weight: weights.squat + 10 },
      { name: 'Deadlift (Heavy)', sets: mainScheme, weight: weights.deadlift },
      { name: 'Barbell Rows', sets: accessoryScheme, weight: 0 }
    ]
  };

  const weekBWorkouts = {
    monday: [
      { name: 'Squat', sets: mainScheme, weight: weights.squat },
      { name: 'Overhead Press', sets: mainScheme, weight: weights.press },
      { name: 'Barbell Rows', sets: accessoryScheme, weight: 0 }
    ],
    tuesday: [
      { name: 'Bench Press', sets: mainScheme, weight: weights.bench },
      { name: 'Deadlift (Light)', sets: mainScheme, weight: Math.round(weights.deadlift * 0.85) },
      { name: 'Pull-ups', sets: accessoryScheme, weight: 'BW' }
    ],
    wednesday: [
      { name: 'Squat', sets: mainScheme, weight: weights.squat + 5 },
      { name: 'Overhead Press', sets: volumeScheme, weight: Math.round(weights.press * 0.9 / 2.5) * 2.5 },
      { name: 'Close-Grip Bench', sets: accessoryScheme, weight: 0 }
    ],
    thursday: [
      { name: 'Bench Press', sets: volumeScheme, weight: Math.round(weights.bench * 0.9 / 2.5) * 2.5 },
      { name: 'Front Squat', sets: mainScheme, weight: weights.frontSquat },
      { name: 'Romanian Deadlift', sets: accessoryScheme, weight: weights.rdl }
    ],
    friday: [
      { name: 'Squat', sets: mainScheme, weight: weights.squat + 10 },
      { name: 'Deadlift (Heavy)', sets: mainScheme, weight: weights.deadlift },
      { name: 'Barbell Rows', sets: accessoryScheme, weight: 0 }
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

export const getTodayWorkout = (weights, currentWeek, characterClass = 'tactician') => {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  const todayKey = daysOfWeek[today];

  // Only return workout for Mon-Fri
  if (today === 0 || today === 6) {
    return null;
  }

  const workouts = getWeekWorkouts(weights, currentWeek, characterClass);
  return {
    day: todayKey,
    dayName: getDayName(todayKey),
    exercises: workouts[todayKey] || []
  };
};
