import { useState } from 'react';
import '../styles/powerups.css';

export default function PowerUpCard({ powerUp, onComplete, userLevel }) {
  const { theme, themeKey } = powerUp;
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [notes, setNotes] = useState({});

  const totalXP = theme.exercises.reduce((sum, ex) => sum + ex.xp, 0);
  const isFullyCompleted = completedExercises.size === theme.exercises.length;

  const toggleExercise = (exerciseName) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseName)) {
      newCompleted.delete(exerciseName);
    } else {
      newCompleted.add(exerciseName);
    }
    setCompletedExercises(newCompleted);
  };

  const handleComplete = () => {
    const completedData = theme.exercises.map(exercise => ({
      exercise: exercise.name,
      sets: exercise.sets,
      xp: completedExercises.has(exercise.name) ? exercise.xp : 0,
      notes: notes[exercise.name] || '',
    }));

    onComplete({
      themeKey,
      themeName: theme.name,
      exercises: completedData,
      totalXP: completedData.reduce((sum, ex) => sum + ex.xp, 0),
    });
  };

  return (
    <div className="powerup-card" style={{ '--theme-color': theme.color }}>
      <div className="powerup-header">
        <div className="powerup-title-section">
          <h3 className="powerup-title">{theme.name}</h3>
          <p className="powerup-description">{theme.description}</p>
        </div>
        <div className="powerup-xp-badge">
          <div className="xp-value">{totalXP}</div>
          <div className="xp-label">XP</div>
        </div>
      </div>

      <div className="powerup-exercises">
        {theme.exercises.map((exercise, idx) => {
          const isCompleted = completedExercises.has(exercise.name);
          return (
            <div
              key={idx}
              className={`powerup-exercise ${isCompleted ? 'completed' : ''}`}
            >
              <div className="exercise-check-row">
                <button
                  className="exercise-checkbox"
                  onClick={() => toggleExercise(exercise.name)}
                  aria-label={`Toggle ${exercise.name}`}
                >
                  {isCompleted && <span className="checkmark">✓</span>}
                </button>
                <div className="exercise-info">
                  <div className="exercise-name-row">
                    <span className="exercise-name">{exercise.name}</span>
                    <span className="exercise-xp">+{exercise.xp} XP</span>
                  </div>
                  <div className="exercise-sets">{exercise.sets}</div>
                  {exercise.notes && (
                    <div className="exercise-hint">💡 {exercise.notes}</div>
                  )}
                </div>
              </div>

              <textarea
                className="exercise-notes"
                placeholder="Notes (optional)..."
                value={notes[exercise.name] || ''}
                onChange={(e) => setNotes({ ...notes, [exercise.name]: e.target.value })}
                rows={1}
              />
            </div>
          );
        })}
      </div>

      <button
        className={`powerup-complete-btn ${isFullyCompleted ? 'ready' : ''}`}
        onClick={handleComplete}
        disabled={completedExercises.size === 0}
      >
        {isFullyCompleted ? (
          <>
            <span className="btn-icon">⚡</span>
            CLAIM {totalXP} XP
          </>
        ) : (
          <>
            Log Progress ({completedExercises.size}/{theme.exercises.length})
          </>
        )}
      </button>
    </div>
  );
}
