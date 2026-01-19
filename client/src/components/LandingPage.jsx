import { useState } from 'react';

export default function LandingPage({ onGetStarted }) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="landing">
      {/* Hero Section */}
      <header className="landing-header">
        <nav className="landing-nav">
          <div className="landing-logo">4/3/2/1</div>
          <button className="btn" onClick={onGetStarted}>
            Sign In
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-numbers">4/3/2/1</span>
            <span className="hero-subtitle-text">The Only Goal That Matters</span>
          </h1>
          <p className="hero-description">
            Track your journey to the legendary plates: 405 deadlift, 315 squat,
            225 bench, 135 press. Built for lifters who are serious about getting strong.
          </p>
          <button className="btn btn-large" onClick={onGetStarted}>
            Start Lifting →
          </button>
        </div>

        <div className="hero-visual">
          <div className="plate-stack">
            <div className="plate plate-4">405</div>
            <div className="plate plate-3">315</div>
            <div className="plate plate-2">225</div>
            <div className="plate plate-1">135</div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="app-preview">
        <h2 className="section-title">See It In Action</h2>
        <div className="preview-container">
          <div className="preview-window">
            <div className="preview-header">
              <div className="preview-title">4/3/2/1</div>
              <div className="preview-subtitle">Strength Training • 5-Day Split</div>
            </div>

            <div className="preview-goals">
              <div className="preview-goal">
                <span className="preview-goal-label">Deadlift</span>
                <span className="preview-goal-value">405</span>
              </div>
              <div className="preview-goal">
                <span className="preview-goal-label">Squat</span>
                <span className="preview-goal-value">315</span>
              </div>
              <div className="preview-goal">
                <span className="preview-goal-label">Bench</span>
                <span className="preview-goal-value">225</span>
              </div>
              <div className="preview-goal">
                <span className="preview-goal-label">Press</span>
                <span className="preview-goal-value">135</span>
              </div>
            </div>

            <div className="preview-tabs">
              <span className="preview-tab active">Today</span>
              <span className="preview-tab">Setup</span>
              <span className="preview-tab">Week A</span>
              <span className="preview-tab">Week B</span>
              <span className="preview-tab">History</span>
            </div>

            <div className="preview-carousel">
              <div className="preview-slides" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {/* Slide 1: Main Lifts */}
                <div className="preview-slide">
                  <div className="preview-workout">
                    <div className="preview-workout-header">
                      <span className="preview-day">Monday • Week A</span>
                      <span className="preview-badge">Main Lifts</span>
                    </div>

                    <div className="preview-exercise">
                      <div className="preview-exercise-info">
                        <span className="preview-exercise-name">Squat</span>
                        <span className="preview-exercise-sets">3 × 5</span>
                      </div>
                      <span className="preview-exercise-weight">245 lbs</span>
                    </div>

                    <div className="preview-exercise">
                      <div className="preview-exercise-info">
                        <span className="preview-exercise-name">Bench Press</span>
                        <span className="preview-exercise-sets">3 × 5</span>
                      </div>
                      <span className="preview-exercise-weight">175 lbs</span>
                    </div>

                    <div className="preview-exercise">
                      <div className="preview-exercise-info">
                        <span className="preview-exercise-name">Barbell Row</span>
                        <span className="preview-exercise-sets">3 × 8</span>
                      </div>
                      <span className="preview-exercise-weight">135 lbs</span>
                    </div>
                  </div>
                </div>

                {/* Slide 2: Power-Ups (Bonus Workouts) */}
                <div className="preview-slide">
                  <div className="preview-powerups">
                    <div className="preview-powerups-header">
                      <span className="preview-powerups-title">Bonus Power-Ups</span>
                      <span className="preview-xp-badge">+60 XP</span>
                    </div>

                    <div className="preview-powerup-card" style={{ borderColor: '#fed330' }}>
                      <div className="preview-powerup-header">
                        <span className="preview-powerup-name">🎯 Core Crusher</span>
                        <span className="preview-powerup-xp">+20 XP</span>
                      </div>
                      <div className="preview-powerup-exercises">
                        <div className="preview-powerup-exercise">
                          <span>Hanging Leg Raises</span>
                          <span>3×12</span>
                        </div>
                        <div className="preview-powerup-exercise">
                          <span>Planks</span>
                          <span>3×60s</span>
                        </div>
                      </div>
                    </div>

                    <div className="preview-powerup-card" style={{ borderColor: '#ff6b9d' }}>
                      <div className="preview-powerup-header">
                        <span className="preview-powerup-name">💪 Upper Body Pump</span>
                        <span className="preview-powerup-xp">+20 XP</span>
                      </div>
                      <div className="preview-powerup-exercises">
                        <div className="preview-powerup-exercise">
                          <span>Barbell Curls</span>
                          <span>3×12</span>
                        </div>
                        <div className="preview-powerup-exercise">
                          <span>Tricep Pushdowns</span>
                          <span>3×15</span>
                        </div>
                      </div>
                    </div>

                    <div className="preview-powerup-card" style={{ borderColor: '#00d2d3' }}>
                      <div className="preview-powerup-header">
                        <span className="preview-powerup-name">💨 Conditioning Boost</span>
                        <span className="preview-powerup-xp">+20 XP</span>
                      </div>
                      <div className="preview-powerup-exercises">
                        <div className="preview-powerup-exercise">
                          <span>Assault Bike Sprints</span>
                          <span>5×30s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="preview-carousel-controls">
                <button
                  className={`preview-dot ${activeSlide === 0 ? 'active' : ''}`}
                  onClick={() => setActiveSlide(0)}
                  aria-label="Main lifts"
                />
                <button
                  className={`preview-dot ${activeSlide === 1 ? 'active' : ''}`}
                  onClick={() => setActiveSlide(1)}
                  aria-label="Power-ups"
                />
              </div>

              <div className="preview-carousel-labels">
                <span className={activeSlide === 0 ? 'active' : ''} onClick={() => setActiveSlide(0)}>Main Lifts</span>
                <span className={activeSlide === 1 ? 'active' : ''} onClick={() => setActiveSlide(1)}>Power-Ups</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Everything You Need</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Today's Workout</h3>
            <p>Auto-populated workouts based on your 5-day split. Just show up and lift.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>See your complete workout history with success/failure indicators.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Goal-Focused</h3>
            <p>Custom goals calculated from your 1RM maxes. Always know your targets.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Week A/B Split</h3>
            <p>Alternating 5-day programming built for linear progression.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>Cloud Sync</h3>
            <p>Your data syncs across all devices. Log from the gym, review at home.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Simple</h3>
            <p>No bloat. No ads. Just a clean interface designed for lifters.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Enter Your Maxes</h3>
            <p>Input your current 1RM for the big four lifts during onboarding.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Follow the Program</h3>
            <p>Each day shows your scheduled workout with calculated weights.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Log Your Lifts</h3>
            <p>Record sets, reps, and weight. Track successes and failures.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Hit 4/3/2/1</h3>
            <p>Progress week over week until you hit the legendary plates.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Strong?</h2>
        <p>Join lifters tracking their journey to 4/3/2/1.</p>
        <button className="btn btn-large" onClick={onGetStarted}>
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">4/3/2/1</div>
          <p>Built for serious lifters.</p>
        </div>
      </footer>
    </div>
  );
}
