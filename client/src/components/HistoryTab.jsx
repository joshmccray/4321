export default function HistoryTab({ workoutLog }) {
  if (workoutLog.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">💪</div>
          <div>No workouts logged yet. Start tracking your progress!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-title">Workout History</div>
      {workoutLog.map(entry => (
        <div key={entry.id} className={`log-entry ${entry.success ? 'success' : 'fail'}`}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{entry.date}</div>
          <span className="badge badge-week">Week {entry.week}</span>
          <div>
            <div style={{ fontWeight: '700' }}>{entry.exercise}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{entry.day}</div>
          </div>
          <div style={{ fontWeight: '700', color: 'var(--accent)' }}>
            {entry.weight} {entry.weight !== 'BW' && 'lbs'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{entry.sets}</div>
          <span className={`badge ${entry.success ? 'badge-success' : 'badge-fail'}`}>
            {entry.success ? '✓' : '✗'}
          </span>
          {entry.notes && (
            <div style={{ gridColumn: '1 / -1', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              {entry.notes}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
