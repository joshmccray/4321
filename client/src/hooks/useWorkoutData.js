import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

const DEFAULT_SETUP = {
  squatMax: 275,
  deadliftMax: 295,
  benchMax: 165,
  pressMax: 105,
  frontSquatMax: 225,
  rdlMax: 185,
  goalTier: '4321',
  goalDeadlift: 405,
  goalSquat: 315,
  goalBench: 225,
  goalPress: 135,
  characterClass: 'tactician',
  onboardingCompleted: false
};

export function useWorkoutData() {
  const { user } = useAuth();
  const [setup, setSetup] = useState(DEFAULT_SETUP);
  const [currentWeek, setCurrentWeek] = useState('A');
  const [workoutLog, setWorkoutLog] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user data from Supabase
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);

    // Load user setup
    const { data: setupData } = await supabase
      .from('user_setup')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (setupData) {
      setSetup({
        squatMax: setupData.squat_max,
        deadliftMax: setupData.deadlift_max,
        benchMax: setupData.bench_max,
        pressMax: setupData.press_max,
        frontSquatMax: setupData.front_squat_max,
        rdlMax: setupData.rdl_max,
        goalTier: setupData.goal_tier || '4321',
        goalDeadlift: setupData.goal_deadlift || 405,
        goalSquat: setupData.goal_squat || 315,
        goalBench: setupData.goal_bench || 225,
        goalPress: setupData.goal_press || 135,
        characterClass: setupData.character_class || 'tactician',
        onboardingCompleted: setupData.onboarding_completed || false
      });
      setCurrentWeek(setupData.current_week);
    } else {
      // Create default setup for new user
      await saveSetup(DEFAULT_SETUP);
    }

    // Load workout log
    const { data: logData } = await supabase
      .from('workout_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (logData) {
      setWorkoutLog(logData.map(log => ({
        id: log.id,
        date: log.date,
        week: log.week,
        day: log.day,
        exercise: log.exercise,
        weight: log.weight,
        sets: log.sets,
        success: log.success,
        notes: log.notes
      })));
    }

    setLoading(false);
  };

  const saveSetup = async (newSetup) => {
    if (!user) return;

    // Merge with existing setup to preserve all fields
    const mergedSetup = { ...setup, ...newSetup };
    setSetup(mergedSetup);

    const { error } = await supabase
      .from('user_setup')
      .upsert({
        user_id: user.id,
        squat_max: mergedSetup.squatMax,
        deadlift_max: mergedSetup.deadliftMax,
        bench_max: mergedSetup.benchMax,
        press_max: mergedSetup.pressMax,
        front_squat_max: mergedSetup.frontSquatMax,
        rdl_max: mergedSetup.rdlMax,
        current_week: currentWeek,
        goal_tier: mergedSetup.goalTier,
        goal_deadlift: mergedSetup.goalDeadlift,
        goal_squat: mergedSetup.goalSquat,
        goal_bench: mergedSetup.goalBench,
        goal_press: mergedSetup.goalPress,
        character_class: mergedSetup.characterClass,
        onboarding_completed: mergedSetup.onboardingCompleted
      }, {
        onConflict: 'user_id'
      });

    if (error) console.error('Error saving setup:', error);
  };

  const updateCurrentWeek = async (week) => {
    if (!user) return;

    setCurrentWeek(week);

    const { error } = await supabase
      .from('user_setup')
      .update({ current_week: week })
      .eq('user_id', user.id);

    if (error) console.error('Error updating week:', error);
  };

  const logWorkout = async (date, week, day, exercise, weight, sets, success, notes) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('workout_logs')
      .insert({
        user_id: user.id,
        date,
        week,
        day,
        exercise,
        weight,
        sets,
        success,
        notes
      })
      .select()
      .single();

    if (error) {
      console.error('Error logging workout:', error);
      return;
    }

    // Add to local state
    const entry = {
      id: data.id,
      date,
      week,
      day,
      exercise,
      weight,
      sets,
      success,
      notes
    };
    setWorkoutLog([entry, ...workoutLog]);
  };

  return {
    setup,
    setSetup: saveSetup,
    currentWeek,
    setCurrentWeek: updateCurrentWeek,
    workoutLog,
    logWorkout,
    loading
  };
}
