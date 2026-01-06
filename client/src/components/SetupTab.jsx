import { calculateWeights } from '../lib/workoutData';

export default function SetupTab({ setup, setSetup }) {
  const weights = calculateWeights(setup);

  const handleChange = (field, value) => {
    setSetup({
      ...setup,
      [field]: Number(value)
    });
  };

  return (
    <div className="card">
      <div className="card-title">Current 1RM Maxes</div>
      <div className="form-grid">
        <div className="form-group">
          <label>Squat 1RM</label>
          <input
            type="number"
            value={setup.squatMax}
            onChange={(e) => handleChange('squatMax', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Deadlift 1RM</label>
          <input
            type="number"
            value={setup.deadliftMax}
            onChange={(e) => handleChange('deadliftMax', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Bench Press 1RM</label>
          <input
            type="number"
            value={setup.benchMax}
            onChange={(e) => handleChange('benchMax', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Overhead Press 1RM</label>
          <input
            type="number"
            value={setup.pressMax}
            onChange={(e) => handleChange('pressMax', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Front Squat 1RM</label>
          <input
            type="number"
            value={setup.frontSquatMax}
            onChange={(e) => handleChange('frontSquatMax', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Romanian Deadlift 1RM</label>
          <input
            type="number"
            value={setup.rdlMax}
            onChange={(e) => handleChange('rdlMax', e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div className="card-title">Starting 3x5 Weights</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>SQUAT</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)' }}>{weights.squat} lbs</div>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>DEADLIFT</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)' }}>{weights.deadlift} lbs</div>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>BENCH</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)' }}>{weights.bench} lbs</div>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>PRESS</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)' }}>{weights.press} lbs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
