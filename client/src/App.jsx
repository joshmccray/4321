import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useWorkoutData } from './hooks/useWorkoutData';
import { calculateWeights, getWeekWorkouts, getTodayWorkout } from './lib/workoutData';
import Auth from './components/Auth';
import OnboardingWizard from './components/OnboardingWizard';
import TodayWorkout from './components/TodayWorkout';
import SetupTab from './components/SetupTab';
import WeekTab from './components/WeekTab';
import HistoryTab from './components/HistoryTab';
import './styles/index.css';

function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { setup, setSetup, currentWeek, setCurrentWeek, workoutLog, logWorkout, loading: dataLoading } = useWorkoutData();
  const [activeTab, setActiveTab] = useState('today');

  // Show loading state
  if (authLoading || (user && dataLoading)) {
    return (
      <div className="auth-container">
        <div>Loading...</div>
      </div>
    );
  }

  // Show auth screen if not logged in
  if (!user) {
    return <Auth />;
  }

  // Show onboarding if not completed
  if (!setup.onboardingCompleted) {
    const handleOnboardingComplete = async (onboardingData) => {
      await setSetup({
        ...setup,
        ...onboardingData
      });
    };

    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  const weights = calculateWeights(setup);
  const characterClass = setup.characterClass || 'tactician';
  const weekAWorkouts = getWeekWorkouts(weights, 'A', characterClass);
  const weekBWorkouts = getWeekWorkouts(weights, 'B', characterClass);
  const todayWorkout = getTodayWorkout(weights, currentWeek, characterClass);

  // Use custom goals from setup instead of hardcoded values
  const goals = [
    { label: 'Deadlift', weight: setup.goalDeadlift || 405 },
    { label: 'Squat', weight: setup.goalSquat || 315 },
    { label: 'Bench', weight: setup.goalBench || 225 },
    { label: 'Press', weight: setup.goalPress || 135 }
  ];

  return (
    <div className="app">
      <div className="header">
        <h1>4/3/2/1</h1>
        <div className="subtitle">Starting Strength • 5-Day Split</div>
      </div>

      <div className="user-info">
        <div className="user-email">{user.email}</div>
        <button className="btn btn-secondary" onClick={signOut}>
          Sign Out
        </button>
      </div>

      <div className="goals-grid">
        {goals.map(goal => (
          <div key={goal.label} className="goal-card">
            <div className="goal-label">{goal.label}</div>
            <div className="goal-weight">
              {goal.weight}
              <span className="goal-unit">lbs</span>
            </div>
          </div>
        ))}
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          Today
        </button>
        <button
          className={`tab ${activeTab === 'setup' ? 'active' : ''}`}
          onClick={() => setActiveTab('setup')}
        >
          Setup
        </button>
        <button
          className={`tab ${activeTab === 'weekA' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekA')}
        >
          Week A
        </button>
        <button
          className={`tab ${activeTab === 'weekB' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekB')}
        >
          Week B
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current Week:</label>
        <select
          value={currentWeek}
          onChange={(e) => setCurrentWeek(e.target.value)}
          style={{ padding: '0.5rem 1rem' }}
        >
          <option value="A">Week A</option>
          <option value="B">Week B</option>
        </select>
      </div>

      {activeTab === 'today' && (
        <TodayWorkout
          todayWorkout={todayWorkout}
          logWorkout={logWorkout}
          currentWeek={currentWeek}
          user={user}
        />
      )}
      {activeTab === 'setup' && <SetupTab setup={setup} setSetup={setSetup} />}
      {activeTab === 'weekA' && <WeekTab week="A" workouts={weekAWorkouts} />}
      {activeTab === 'weekB' && <WeekTab week="B" workouts={weekBWorkouts} />}
      {activeTab === 'history' && <HistoryTab workoutLog={workoutLog} />}
    </div>
  );
}

export default App;
