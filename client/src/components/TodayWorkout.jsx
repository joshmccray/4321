import { useState } from 'react';
import { format } from 'date-fns';

export default function TodayWorkout({ todayWorkout, logWorkout, currentWeek }) {
  if (!todayWorkout) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">🎉</div>
          <div>Rest day! Enjoy your weekend.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="today-header">
        <div className="today-title">Today's Workout - {todayWorkout.dayName}</div>
        <div className="today-date">{format(new Date(), 'EEEE, MMM d, yyyy')}</div>
      </div>

      <div className="today-workout">
        {todayWorkout.exercises.map((exercise, idx) => (
          <ExerciseLogItem
            key={idx}
            exercise={exercise}
            logWorkout={logWorkout}
            currentWeek={currentWeek}
            day={todayWorkout.day}
          />
        ))}
      </div>
    </div>
  );
}

function ExerciseLogItem({ exercise, logWorkout, currentWeek, day }) {
  const [weight, setWeight] = useState(
    exercise.weight === 'BW' ? 'BW' : exercise.weight === 0 ? '' : String(exercise.weight)
  );
  const [sets, setSets] = useState(exercise.sets);
  const [success, setSuccess] = useState(true);
  const [notes, setNotes] = useState('');
  const [logged, setLogged] = useState(false);

  const handleLog = () => {
    const today = new Date().toISOString().split('T')[0];
    logWorkout(today, currentWeek, day, exercise.name, weight, sets, success, notes);
    setLogged(true);
    setNotes('');
  };

  return (
    <div className="exercise-log-item">
      <div className="exercise-header">
        <div>
          <div className="exercise-title">{exercise.name}</div>
          {logged && (
            <span className="badge badge-success" style={{ marginTop: '0.5rem' }}>
              ✓ Logged
            </span>
          )}
        </div>
        <div className="exercise-target">
          <div className="target-weight">
            {exercise.weight === 'BW'
              ? 'Bodyweight'
              : exercise.weight === 0
              ? 'Enter weight'
              : `${exercise.weight} lbs`}
          </div>
          <div className="target-sets">{exercise.sets}</div>
        </div>
      </div>

      {!logged && (
        <div className="quick-log-form">
          <div className="form-group">
            <label>Actual Weight</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={exercise.weight === 0 ? '0' : String(exercise.weight)}
            />
          </div>

          <div className="form-group">
            <label>Sets x Reps</label>
            <input
              type="text"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              placeholder={exercise.sets}
            />
          </div>

          <div className="form-group">
            <label>Result</label>
            <select value={success} onChange={(e) => setSuccess(e.target.value === 'true')}>
              <option value="true">✓ Success</option>
              <option value="false">✗ Missed reps</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes (optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Felt strong..."
            />
          </div>

          <button type="button" className="btn" onClick={handleLog}>
            Log
          </button>
        </div>
      )}
    </div>
  );
}
