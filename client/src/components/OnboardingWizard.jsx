import { useState } from 'react';
import { getAllGoalTiers, getAllCharacterClasses } from '../lib/characterClasses';
import '../styles/onboarding.css';

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const goalTiers = getAllGoalTiers();
  const characterClasses = getAllCharacterClasses();

  const handleTierSelect = (tierId) => {
    setSelectedTier(tierId);
  };

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && selectedTier) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    if (selectedTier && selectedClass) {
      const tier = goalTiers.find(t => t.id === selectedTier);
      const characterClass = characterClasses.find(c => c.id === selectedClass);

      onComplete({
        goalTier: selectedTier,
        goalDeadlift: tier.goals.deadlift,
        goalSquat: tier.goals.squat,
        goalBench: tier.goals.bench,
        goalPress: tier.goals.press,
        characterClass: selectedClass,
        onboardingCompleted: true
      });
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-wizard">
        {/* Step Indicators */}
        <div className="onboarding-steps">
          <div className={`step-indicator ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Welcome</div>
          </div>
          <div className="step-line"></div>
          <div className={`step-indicator ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Goal Tier</div>
          </div>
          <div className="step-line"></div>
          <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Character</div>
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="onboarding-step welcome-step">
            <div className="welcome-icon">🏋️</div>
            <h1 className="onboarding-title">Welcome to 4/3/2/1!</h1>
            <p className="onboarding-subtitle">
              Let's customize your path to strength
            </p>
            <div className="welcome-content">
              <p>
                This program uses linear progression to help you reach your strength goals.
                In just a few steps, we'll personalize your training based on your goals and style.
              </p>
              <div className="welcome-features">
                <div className="welcome-feature">
                  <div className="feature-icon">🎯</div>
                  <div className="feature-text">Choose your plate goals</div>
                </div>
                <div className="welcome-feature">
                  <div className="feature-icon">⚔️</div>
                  <div className="feature-text">Select your training style</div>
                </div>
                <div className="welcome-feature">
                  <div className="feature-icon">📈</div>
                  <div className="feature-text">Track your progress</div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary onboarding-btn" onClick={handleNext}>
              Get Started
            </button>
          </div>
        )}

        {/* Step 2: Goal Tier Selection */}
        {step === 2 && (
          <div className="onboarding-step goal-step">
            <h1 className="onboarding-title">Choose Your Destination</h1>
            <p className="onboarding-subtitle">
              Select the plate goals you're working toward
            </p>

            <div className="goal-tiers-grid">
              {goalTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`goal-tier-card ${selectedTier === tier.id ? 'selected' : ''}`}
                  onClick={() => handleTierSelect(tier.id)}
                  style={{ '--tier-color': tier.color }}
                >
                  <div className="tier-badge">
                    <div className="tier-icon">{tier.icon}</div>
                    <div className="tier-name">{tier.name}</div>
                  </div>
                  <div className="tier-difficulty">{tier.difficulty}</div>
                  <div className="tier-goals">
                    <div className="tier-goal">
                      <div className="goal-label">Deadlift</div>
                      <div className="goal-value">{tier.goals.deadlift} lbs</div>
                    </div>
                    <div className="tier-goal">
                      <div className="goal-label">Squat</div>
                      <div className="goal-value">{tier.goals.squat} lbs</div>
                    </div>
                    <div className="tier-goal">
                      <div className="goal-label">Bench</div>
                      <div className="goal-value">{tier.goals.bench} lbs</div>
                    </div>
                    <div className="tier-goal">
                      <div className="goal-label">Press</div>
                      <div className="goal-value">{tier.goals.press} lbs</div>
                    </div>
                  </div>
                  {selectedTier === tier.id && (
                    <div className="selection-check">✓</div>
                  )}
                </div>
              ))}
            </div>

            <div className="onboarding-actions">
              <button className="btn btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!selectedTier}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Character Class Selection */}
        {step === 3 && (
          <div className="onboarding-step character-step">
            <h1 className="onboarding-title">Choose Your Path</h1>
            <p className="onboarding-subtitle">
              Select your training style and character
            </p>

            <div className="character-classes-grid">
              {characterClasses.map((charClass) => (
                <div
                  key={charClass.id}
                  className={`character-card ${selectedClass === charClass.id ? 'selected' : ''}`}
                  onClick={() => handleClassSelect(charClass.id)}
                  style={{ '--class-color': charClass.color }}
                >
                  <div className="character-header">
                    <div className="character-icon">{charClass.icon}</div>
                    <div className="character-info">
                      <div className="character-name">{charClass.name}</div>
                      <div className="character-tagline">{charClass.tagline}</div>
                    </div>
                  </div>

                  <div className="character-description">
                    {charClass.description}
                  </div>

                  <div className="character-narrative">
                    {charClass.narrative}
                  </div>

                  <div className="character-volume">
                    <div className="volume-label">Training Volume</div>
                    <div className="volume-schemes">
                      <div className="volume-scheme">
                        <span className="scheme-type">Main:</span>
                        <span className="scheme-value">{charClass.volumeScheme.main}</span>
                      </div>
                      <div className="volume-scheme">
                        <span className="scheme-type">Volume:</span>
                        <span className="scheme-value">{charClass.volumeScheme.volume}</span>
                      </div>
                    </div>
                    <div className="volume-description">
                      {charClass.volumeScheme.description}
                    </div>
                  </div>

                  {selectedClass === charClass.id && (
                    <div className="selection-check">✓</div>
                  )}
                </div>
              ))}
            </div>

            <div className="onboarding-actions">
              <button className="btn btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleComplete}
                disabled={!selectedClass}
              >
                Start Training
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
