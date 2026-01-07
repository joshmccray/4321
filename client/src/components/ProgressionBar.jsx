import { calculateLevel, getXPToNextLevel, checkBadges } from '../lib/powerUps';
import '../styles/powerups.css';

export default function ProgressionBar({ progression }) {
  if (!progression) return null;

  const { total_xp, total_powerups, current_streak, earned_badges } = progression;
  const level = calculateLevel(total_xp);
  const xpProgress = getXPToNextLevel(total_xp);
  const badges = checkBadges({
    totalPowerUps: total_powerups,
    currentStreak: current_streak,
    totalXP: total_xp,
  });

  return (
    <div className="progression-container">
      <div className="progression-header">
        <div className="level-display">
          <div className="level-number">LVL {level.level}</div>
          <div className="level-title">{level.title}</div>
        </div>
        <div className="progression-stats">
          <div className="stat-item">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">{total_xp}</span>
            <span className="stat-label">Total XP</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💪</span>
            <span className="stat-value">{total_powerups}</span>
            <span className="stat-label">Power-Ups</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{current_streak}</span>
            <span className="stat-label">Streak</span>
          </div>
        </div>
      </div>

      {xpProgress.nextLevel && (
        <div className="xp-bar-container">
          <div className="xp-bar-label">
            <span>{xpProgress.current} / {xpProgress.needed} XP</span>
            <span>Next: {xpProgress.nextLevel.title}</span>
          </div>
          <div className="xp-bar-bg">
            <div
              className="xp-bar-fill"
              style={{ width: `${xpProgress.progress}%` }}
            >
              <div className="xp-bar-shine"></div>
            </div>
          </div>
        </div>
      )}

      {badges.length > 0 && (
        <div className="badges-container">
          <div className="badges-title">Badges Earned</div>
          <div className="badges-grid">
            {badges.map(badge => {
              const isEarned = earned_badges?.includes?.(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`badge-item ${isEarned ? 'earned' : 'locked'}`}
                  title={badge.description}
                >
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-name">{badge.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
