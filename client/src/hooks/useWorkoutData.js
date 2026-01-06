import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

const DEFAULT_SETUP = {
  squatMax: 275,
  deadliftMax: 295,
  benchMax: 165,
  pressMax: 105,
  frontSquatMax: 225,
  rdlMax: 185
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
        rdlMax: setupData.rdl_max
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

    setSetup(newSetup);

    const { error } = await supabase
      .from('user_setup')
      .upsert({
        user_id: user.id,
        squat_max: newSetup.squatMax,
        deadlift_max: newSetup.deadliftMax,
        bench_max: newSetup.benchMax,
        press_max: newSetup.pressMax,
        front_squat_max: newSetup.frontSquatMax,
        rdl_max: newSetup.rdlMax,
        current_week: currentWeek
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
