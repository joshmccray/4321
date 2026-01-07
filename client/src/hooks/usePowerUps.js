import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { generateDailyPowerUps } from '../lib/powerUps';

export function usePowerUps(user) {
  const [progression, setProgression] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgression();
    }
  }, [user]);

  const fetchProgression = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progression')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error fetching progression:', error);
        return;
      }

      if (!data) {
        // Create initial progression record
        const { data: newData, error: insertError } = await supabase
          .from('user_progression')
          .insert([{
            user_id: user.id,
            total_xp: 0,
            total_powerups: 0,
            current_streak: 0,
            longest_streak: 0,
            earned_badges: [],
          }])
          .select()
          .single();

        if (insertError) {
          console.error('Error creating progression:', insertError);
          return;
        }

        setProgression(newData);
      } else {
        setProgression(data);
      }
    } catch (error) {
      console.error('Error in fetchProgression:', error);
    } finally {
      setLoading(false);
    }
  };

  const logPowerUp = async (powerUpData) => {
    const { themeKey, themeName, exercises, totalXP } = powerUpData;
    const today = new Date().toISOString().split('T')[0];

    try {
      // Log each exercise
      const logs = exercises.map(ex => ({
        user_id: user.id,
        date: today,
        theme_key: themeKey,
        theme_name: themeName,
        exercise: ex.exercise,
        sets: ex.sets,
        xp_earned: ex.xp,
        notes: ex.notes,
      }));

      const { error: logError } = await supabase
        .from('powerup_logs')
        .insert(logs);

      if (logError) {
        console.error('Error logging power-up:', logError);
        return false;
      }

      // Update progression
      const newStreak = calculateNewStreak(progression.last_powerup_date, today);
      const newTotalXP = progression.total_xp + totalXP;
      const newTotalPowerUps = progression.total_powerups + 1;

      const { error: progressError } = await supabase
        .from('user_progression')
        .update({
          total_xp: newTotalXP,
          total_powerups: newTotalPowerUps,
          current_streak: newStreak,
          longest_streak: Math.max(progression.longest_streak, newStreak),
          last_powerup_date: today,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (progressError) {
        console.error('Error updating progression:', progressError);
        return false;
      }

      // Refresh progression data
      await fetchProgression();
      return true;
    } catch (error) {
      console.error('Error in logPowerUp:', error);
      return false;
    }
  };

  const calculateNewStreak = (lastDate, currentDate) => {
    if (!lastDate) return 1;

    const last = new Date(lastDate);
    const current = new Date(currentDate);
    const diffTime = current - last;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day - maintain current streak
      return progression.current_streak;
    } else if (diffDays === 1) {
      // Consecutive day - increment streak
      return progression.current_streak + 1;
    } else {
      // Streak broken - reset to 1
      return 1;
    }
  };

  return {
    progression,
    loading,
    logPowerUp,
    refreshProgression: fetchProgression,
  };
}

export function useDailyPowerUps(day) {
  const [powerUps, setPowerUps] = useState([]);

  useEffect(() => {
    if (day) {
      const generated = generateDailyPowerUps(day, 3);
      setPowerUps(generated);
    }
  }, [day]);

  return powerUps;
}
