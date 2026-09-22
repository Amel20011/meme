import { APP_CONFIG } from '@/lib/constants/config';
import { HeartsState } from '@/types';

/**
 * Calculates percentage score between 0 and 100
 */
export function calculateScore(correctAnswers: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
}

/**
 * Checks 80% completion rule: a chapter is completed ONLY when score >= 80
 */
export function isChapterCompleted(score: number): boolean {
  return score >= APP_CONFIG.passingScore;
}

/**
 * Reward unlocking rule: strictly only unlocked when ALL 8 chapters have score >= 80%
 */
export function isRewardUnlocked(chapterScores: number[]): boolean {
  if (!chapterScores || chapterScores.length < APP_CONFIG.totalChaptersPerSubject) {
    return false;
  }
  // All 8 must meet >= 80
  return chapterScores.every(score => score >= APP_CONFIG.passingScore);
}

/**
 * Evaluates current heart count and next recovery based on stored timestamps.
 * 1 lost heart recovers every 60 seconds (1 minute).
 * Dynamic calculation ensures page reloads or closing browser tabs preserve the recovery.
 */
export function calculateDynamicHearts(storedState: HeartsState): {
  currentHearts: number;
  secondsUntilNextHeart: number;
  nextRecoveryTimestamp: number | null;
  lastHeartLostTimestamp: number | null;
} {
  const maxHearts = APP_CONFIG.maxHearts;
  const recoveryIntervalMs = APP_CONFIG.heartRecoverySeconds * 1000;
  const now = Date.now();

  // If already at maximum hearts, no countdown needed
  if (storedState.current >= maxHearts) {
    return {
      currentHearts: maxHearts,
      secondsUntilNextHeart: 0,
      nextRecoveryTimestamp: null,
      lastHeartLostTimestamp: null,
    };
  }

  // If no timestamp stored yet, anchor it to now
  const referenceTimestamp = storedState.lastHeartLostTimestamp || now;
  const elapsedMs = Math.max(0, now - referenceTimestamp);

  // How many full heart increments have recovered since the reference timestamp?
  const recoveredHearts = Math.floor(elapsedMs / recoveryIntervalMs);
  const newCurrent = Math.min(maxHearts, storedState.current + recoveredHearts);

  if (newCurrent >= maxHearts) {
    return {
      currentHearts: maxHearts,
      secondsUntilNextHeart: 0,
      nextRecoveryTimestamp: null,
      lastHeartLostTimestamp: null,
    };
  }

  // Remainder ms until the next heart recovers
  const remainderMs = elapsedMs % recoveryIntervalMs;
  const msUntilNext = recoveryIntervalMs - remainderMs;
  const secondsUntilNext = Math.ceil(msUntilNext / 1000);
  const nextTimestamp = now + msUntilNext;

  // New anchor is the last completed recovery cycle
  const updatedAnchor = referenceTimestamp + (recoveredHearts * recoveryIntervalMs);

  return {
    currentHearts: newCurrent,
    secondsUntilNextHeart: secondsUntilNext,
    nextRecoveryTimestamp: nextTimestamp,
    lastHeartLostTimestamp: updatedAnchor,
  };
}

/**
 * Format seconds into mm:ss
 */
export function formatSeconds(totalSeconds: number): string {
  if (totalSeconds < 0) return '00:00';
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
