import { calculateWeights } from '../lib/workoutData';
import { getAllGoalTiers, getAllCharacterClasses } from '../lib/characterClasses';

export default function SetupTab({ setup, setSetup }) {
  const weights = calculateWeights(setup);
  const goalTiers = getAllGoalTiers();
  const characterClasses = getAllCharacterClasses();

  const handleChange = (field, value) => {
    setSetup({
      ...setup,
      [field]: Number(value)
    });
  };

  const handleGoalTierChange = (tierId) => {
    const tier = goalTiers.find(t => t.id === tierId);
    if (tier) {
      setSetup({
        ...setup,
        goalTier: tierId,
        goalDeadlift: tier.goals.deadlift,
        goalSquat: tier.goals.squat,
        goalBench: tier.goals.bench,
        goalPress: tier.goals.press
      });
    }
  };

  const handleCharacterClassChange = (classId) => {
    setSetup({
      ...setup,
      characterClass: classId
    });
  };

  const handleRerunOnboarding = () => {
    setSetup({
      ...setup,
      onboardingCompleted: false
    });
  };

  const currentTier = goalTiers.find(t => t.id === setup.goalTier);
  const currentClass = characterClasses.find(c => c.id === setup.characterClass);

  return (
    <>
      {/* Training Preferences */}
      <div className="card">
        <div className="card-title">Training Preferences</div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Goal Tier</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {goalTiers.map(tier => (
              <button
                key={tier.id}
                onClick={() => handleGoalTierChange(tier.id)}
                className={`btn ${setup.goalTier === tier.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  flex: '1',
                  minWidth: '150px',
                  borderColor: setup.goalTier === tier.id ? tier.color : undefined
                }}
              >
                {tier.icon} {tier.name}
              </button>
            ))}
          </div>
          {currentTier && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: '6px',
              borderLeft: `3px solid ${currentTier.color}`
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Current Goals: DL {currentTier.goals.deadlift} | SQ {currentTier.goals.squat} | BP {currentTier.goals.bench} | OHP {currentTier.goals.press}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Character Class</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            {characterClasses.map(charClass => (
              <button
                key={charClass.id}
                onClick={() => handleCharacterClassChange(charClass.id)}
                className={`btn ${setup.characterClass === charClass.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  textAlign: 'left',
                  borderColor: setup.characterClass === charClass.id ? charClass.color : undefined
                }}
              >
                <div>{charClass.icon} {charClass.name}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                  {charClass.volumeScheme.main}
                </div>
              </button>
            ))}
          </div>
          {currentClass && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: '6px',
              borderLeft: `3px solid ${currentClass.color}`
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {currentClass.tagline}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {currentClass.volumeScheme.description}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleRerunOnboarding}
          className="btn btn-secondary"
          style={{ marginTop: '1rem', width: '100%' }}
        >
          🔄 Re-run Onboarding Wizard
        </button>
      </div>

      {/* 1RM Maxes */}
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
    </>
  );
}
