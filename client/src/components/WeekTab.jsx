import { getDayName } from '../lib/workoutData';

export default function WeekTab({ week, workouts }) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  return (
    <div className="card">
      <div className="card-title">Week {week} Workouts</div>
      {days.map(day => (
        <div key={day} className="workout-day">
          <div className="day-header">{getDayName(day)}</div>
          <div className="exercise-list">
            {workouts[day].map((exercise, idx) => (
              <div key={idx} className="exercise-item">
                <div className="exercise-name">{exercise.name}</div>
                <div className="exercise-sets">{exercise.sets}</div>
                <div className="exercise-weight">
                  {exercise.weight === 'BW' ? 'Bodyweight' : exercise.weight === 0 ? 'Fill in' : `${exercise.weight} lbs`}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
