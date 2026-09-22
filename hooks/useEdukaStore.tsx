'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { APP_CONFIG, EducationLevelId } from '@/lib/constants/config';
import {
  UserProfile,
  HeartsState,
  ChapterProgress,
  QuizAttempt,
  StudyTask,
  StudyNote,
  FlashcardItem,
  StudyStreak,
  AppNotification
} from '@/types';
import { calculateDynamicHearts, isChapterCompleted, isRewardUnlocked } from '@/lib/utils/quizUtils';
import { getSubjectsByLevel, INITIAL_FLASHCARDS } from '@/lib/data/educationData';

interface EdukaContextType {
  // User
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  setEducationLevel: (level: EducationLevelId) => void;

  // Hearts
  hearts: HeartsState;
  secondsUntilNextHeart: number;
  deductHeart: () => boolean; // returns false if already 0
  refillHearts: () => void;
  canTakeQuiz: boolean;

  // Progress & Quizzes
  chapterProgress: Record<string, ChapterProgress>;
  quizHistory: QuizAttempt[];
  recordQuizResult: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => { passed: boolean; score: number };
  getChapterProgress: (chapterId: string) => ChapterProgress | undefined;
  getSubjectProgress: (subjectId: string) => { completedCount: number; totalCount: number; percentage: number };
  getOverallProgress: () => { completedCount: number; totalCount: number; percentage: number };
  getAverageScore: () => number;

  // Study Streak
  streak: StudyStreak;
  incrementStreak: () => void;

  // Rewards
  isSubjectRewardUnlocked: (subjectId: string) => boolean;
  getSubjectChaptersStatus: (subjectId: string) => { chapterNumber: number; title: string; score: number; completed: boolean }[];

  // Tasks & Notes
  tasks: StudyTask[];
  addTask: (title: string, priority?: 'low' | 'medium' | 'high') => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;

  notes: StudyNote[];
  saveNote: (id: string | null, title: string, content: string, subjectName: string) => void;
  deleteNote: (id: string) => void;

  // Flashcards
  flashcards: FlashcardItem[];
  updateFlashcardStatus: (cardId: string, status: 'new' | 'learning' | 'mastered') => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Reset
  resetDemoData: () => void;
  isHydrated: boolean;
}

const EdukaContext = createContext<EdukaContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'eduka_user_v2',
  HEARTS: 'eduka_hearts_v2',
  PROGRESS: 'eduka_progress_v2',
  QUIZ_HISTORY: 'eduka_quiz_history_v2',
  STREAK: 'eduka_streak_v2',
  TASKS: 'eduka_tasks_v2',
  NOTES: 'eduka_notes_v2',
  FLASHCARDS: 'eduka_flashcards_v2',
  NOTIFICATIONS: 'eduka_notifications_v2',
};

// Initial default state
const DEFAULT_USER: UserProfile = {
  id: 'usr-101',
  name: 'Budi Santoso',
  email: 'budi.santoso@eduka.id',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  educationLevel: 'SMA',
  gradeSemester: 'Kelas 11 IPA',
  joinedDate: 'Januari 2026',
  dailyGoalMinutes: 45,
};

const DEFAULT_HEARTS: HeartsState = {
  current: 5,
  max: 5,
  lastHeartLostTimestamp: null,
  nextRecoveryTimestamp: null,
};

// Initial realistic progress matching the reference ("Matematika - Persamaan Linear 75%")
const DEFAULT_PROGRESS: Record<string, ChapterProgress> = {
  'sma-matematika-bab-1': {
    chapterId: 'sma-matematika-bab-1',
    subjectId: 'sma-matematika',
    score: 85,
    completed: true,
    attemptsCount: 2,
    bestScore: 85,
    lastAttemptAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  'sma-matematika-bab-2': {
    chapterId: 'sma-matematika-bab-2',
    subjectId: 'sma-matematika',
    score: 75, // 75% in progress as in reference!
    completed: false, // Incomplete since < 80%
    attemptsCount: 1,
    bestScore: 75,
    lastAttemptAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  'sma-fisika-bab-1': {
    chapterId: 'sma-fisika-bab-1',
    subjectId: 'sma-fisika',
    score: 90,
    completed: true,
    attemptsCount: 1,
    bestScore: 90,
    lastAttemptAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  'sma-bahasa-inggris-bab-1': {
    chapterId: 'sma-bahasa-inggris-bab-1',
    subjectId: 'sma-bahasa-inggris',
    score: 80,
    completed: true,
    attemptsCount: 1,
    bestScore: 80,
    lastAttemptAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  }
};

const DEFAULT_STREAK: StudyStreak = {
  currentStreak: 12, // Exact 12 days streak from reference
  longestStreak: 16,
  lastActiveDate: new Date().toISOString().split('T')[0],
  weeklyDays: [
    { day: 'S', label: 'Min', completed: true, isToday: false },
    { day: 'M', label: 'Sen', completed: true, isToday: false },
    { day: 'T', label: 'Sel', completed: true, isToday: true },
    { day: 'W', label: 'Rab', completed: true, isToday: false },
    { day: 'T', label: 'Kam', completed: false, isToday: false },
    { day: 'F', label: 'Jum', completed: false, isToday: false },
    { day: 'S', label: 'Sab', completed: false, isToday: false },
  ]
};

const DEFAULT_TASKS: StudyTask[] = [
  { id: 'task-1', title: 'Selesaikan latihan soal Matematika Bab 2 (75% → 80%)', completed: false, priority: 'high' },
  { id: 'task-2', title: 'Review 5 Smart Flashcards Fisika Gaya Newton', completed: true, priority: 'medium' },
  { id: 'task-3', title: 'Baca rangkuman materi Biologi Enzim & Metabolisme', completed: false, priority: 'medium' },
  { id: 'task-4', title: 'Ikuti sesi Pomodoro 25 menit untuk Bahasa Inggris', completed: false, priority: 'low' },
];

const DEFAULT_NOTES: StudyNote[] = [
  {
    id: 'note-1',
    title: 'Formula Kunci Turunan & Limit',
    content: '1. Turunan ax^n = n*a*x^(n-1)\n2. Jika limit menghasilkan 0/0, coba kalikan sekawan akar atau faktorkan aljabar!\n3. Limit sin(x)/x saat x mendekati 0 bernilai 1.',
    subjectName: 'Matematika',
    updatedAt: '2 jam yang lalu',
  },
  {
    id: 'note-2',
    title: 'Hukum Kekekalan Energi Mekanik',
    content: 'Em = Ep + Ek = konstan jika gaya non-konservatif = 0.\nEp = m*g*h\nEk = 0.5*m*v^2',
    subjectName: 'Fisika',
    updatedAt: 'Kemarin',
  }
];

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Study Streak Membara! 🔥',
    message: 'Hebat! Kamu telah mempertahankan 12 hari belajar berturut-turut. Lanjutkan hari ini!',
    timestamp: 'Baru saja',
    read: false,
    type: 'streak',
    link: '/statistics'
  },
  {
    id: 'notif-2',
    title: 'Target Fokus Hari Ini 🎯',
    message: 'Matematika — Persamaan Linear sudah mencapai 75%. Sedikit lagi (>= 80%) untuk menyelesaikannya!',
    timestamp: '2 jam lalu',
    read: false,
    type: 'quiz',
    link: '/subjects/sma-matematika'
  },
  {
    id: 'notif-3',
    title: 'Sesi Pengingat Belajar',
    message: 'Waktu terbaik belajar sore ini telah tiba. Mulai 25 menit sesi Pomodoro terfokus.',
    timestamp: '5 jam lalu',
    read: true,
    type: 'reminder',
    link: '/planner'
  }
];

export function EdukaProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [hearts, setHearts] = useState<HeartsState>(DEFAULT_HEARTS);
  const [secondsUntilNextHeart, setSecondsUntilNextHeart] = useState<number>(0);
  const [chapterProgress, setChapterProgress] = useState<Record<string, ChapterProgress>>(DEFAULT_PROGRESS);
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [streak, setStreak] = useState<StudyStreak>(DEFAULT_STREAK);
  const [tasks, setTasks] = useState<StudyTask[]>(DEFAULT_TASKS);
  const [notes, setNotes] = useState<StudyNote[]>(DEFAULT_NOTES);
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(INITIAL_FLASHCARDS);
  const [notifications, setNotifications] = useState<AppNotification[]>(DEFAULT_NOTIFICATIONS);

  // Initialize from LocalStorage safely on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (storedUser) setUser(JSON.parse(storedUser));

        const storedHearts = localStorage.getItem(STORAGE_KEYS.HEARTS);
        if (storedHearts) {
          const parsedHearts: HeartsState = JSON.parse(storedHearts);
          const evaluated = calculateDynamicHearts(parsedHearts);
          setHearts({
            current: evaluated.currentHearts,
            max: APP_CONFIG.maxHearts,
            lastHeartLostTimestamp: evaluated.lastHeartLostTimestamp,
            nextRecoveryTimestamp: evaluated.nextRecoveryTimestamp,
          });
          setSecondsUntilNextHeart(evaluated.secondsUntilNextHeart);
        }

        const storedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        if (storedProgress) setChapterProgress(JSON.parse(storedProgress));

        const storedHistory = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
        if (storedHistory) setQuizHistory(JSON.parse(storedHistory));

        const storedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);
        if (storedStreak) setStreak(JSON.parse(storedStreak));

        const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
        if (storedTasks) setTasks(JSON.parse(storedTasks));

        const storedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
        if (storedNotes) setNotes(JSON.parse(storedNotes));

        const storedCards = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
        if (storedCards) setFlashcards(JSON.parse(storedCards));

        const storedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
        if (storedNotifs) setNotifications(JSON.parse(storedNotifs));
      } catch (e) {
        console.error('Failed to load Eduka state from localStorage:', e);
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Heart Recovery Real-time Clock (1 second interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setHearts(prevHearts => {
        if (prevHearts.current >= APP_CONFIG.maxHearts) {
          setSecondsUntilNextHeart(0);
          return prevHearts;
        }

        const evaluated = calculateDynamicHearts(prevHearts);
        setSecondsUntilNextHeart(evaluated.secondsUntilNextHeart);

        if (evaluated.currentHearts !== prevHearts.current) {
          const updated: HeartsState = {
            current: evaluated.currentHearts,
            max: APP_CONFIG.maxHearts,
            lastHeartLostTimestamp: evaluated.lastHeartLostTimestamp,
            nextRecoveryTimestamp: evaluated.nextRecoveryTimestamp,
          };
          try {
            localStorage.setItem(STORAGE_KEYS.HEARTS, JSON.stringify(updated));
          } catch {
            // ignore
          }
          return updated;
        }

        return prevHearts;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Synchronize state changes to localStorage
  const saveState = useCallback((key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Could not save state to ${key}`, e);
    }
  }, []);

  // User Actions
  const updateUser = useCallback((updates: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      saveState(STORAGE_KEYS.USER, updated);
      return updated;
    });
  }, [saveState]);

  const setEducationLevel = useCallback((level: EducationLevelId) => {
    setUser(prev => {
      const updated = {
        ...prev,
        educationLevel: level,
        gradeSemester: level === 'SD' ? 'Kelas 5' : level === 'SMP' ? 'Kelas 8' : level === 'SMA' ? 'Kelas 11 IPA' : level === 'SMK' ? 'Kelas 11 RPL' : 'Semester 4'
      };
      saveState(STORAGE_KEYS.USER, updated);
      return updated;
    });
  }, [saveState]);

  // Heart Actions
  const deductHeart = useCallback((): boolean => {
    let succeeded = false;
    setHearts(prev => {
      if (prev.current <= 0) {
        return prev;
      }
      succeeded = true;
      const newCurrent = prev.current - 1;
      const now = Date.now();
      const updated: HeartsState = {
        current: newCurrent,
        max: APP_CONFIG.maxHearts,
        lastHeartLostTimestamp: prev.lastHeartLostTimestamp || now,
        nextRecoveryTimestamp: now + (APP_CONFIG.heartRecoverySeconds * 1000),
      };
      saveState(STORAGE_KEYS.HEARTS, updated);
      return updated;
    });
    return succeeded;
  }, [saveState]);

  const refillHearts = useCallback(() => {
    const full: HeartsState = {
      current: APP_CONFIG.maxHearts,
      max: APP_CONFIG.maxHearts,
      lastHeartLostTimestamp: null,
      nextRecoveryTimestamp: null,
    };
    setHearts(full);
    setSecondsUntilNextHeart(0);
    saveState(STORAGE_KEYS.HEARTS, full);
  }, [saveState]);

  // Quiz & Progress Actions
  const recordQuizResult = useCallback((attemptData: Omit<QuizAttempt, 'id' | 'completedAt'>) => {
    const passed = isChapterCompleted(attemptData.score);
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `attempt-${Date.now()}`,
      passed,
      completedAt: new Date().toISOString(),
    };

    setQuizHistory(prev => {
      const updated = [newAttempt, ...prev].slice(0, 50);
      saveState(STORAGE_KEYS.QUIZ_HISTORY, updated);
      return updated;
    });

    setChapterProgress(prev => {
      const existing = prev[attemptData.chapterId];
      const attemptsCount = (existing?.attemptsCount || 0) + 1;
      const bestScore = Math.max(existing?.bestScore || 0, attemptData.score);
      const isNowCompleted = bestScore >= APP_CONFIG.passingScore;

      const updatedProgress: ChapterProgress = {
        chapterId: attemptData.chapterId,
        subjectId: attemptData.subjectId,
        score: attemptData.score,
        bestScore,
        completed: isNowCompleted,
        attemptsCount,
        lastAttemptAt: new Date().toISOString(),
      };

      const newState = {
        ...prev,
        [attemptData.chapterId]: updatedProgress,
      };

      saveState(STORAGE_KEYS.PROGRESS, newState);
      return newState;
    });

    return { passed, score: attemptData.score };
  }, [saveState]);

  const getChapterProgress = useCallback((chapterId: string) => {
    return chapterProgress[chapterId];
  }, [chapterProgress]);

  const getSubjectProgress = useCallback((subjectId: string) => {
    const subjects = getSubjectsByLevel(user.educationLevel);
    const subject = subjects.find(s => s.id === subjectId);
    const totalCount = subject ? subject.chapters.length : APP_CONFIG.totalChaptersPerSubject;

    let completedCount = 0;
    if (subject) {
      for (const ch of subject.chapters) {
        const prog = chapterProgress[ch.id];
        if (prog && prog.completed && prog.bestScore >= APP_CONFIG.passingScore) {
          completedCount++;
        }
      }
    }

    const percentage = Math.round((completedCount / totalCount) * 100);
    return { completedCount, totalCount, percentage };
  }, [chapterProgress, user.educationLevel]);

  const getOverallProgress = useCallback(() => {
    const subjects = getSubjectsByLevel(user.educationLevel);
    let totalChapters = 0;
    let completedChapters = 0;

    for (const sub of subjects) {
      totalChapters += sub.chapters.length;
      for (const ch of sub.chapters) {
        const prog = chapterProgress[ch.id];
        if (prog && prog.completed && prog.bestScore >= APP_CONFIG.passingScore) {
          completedChapters++;
        }
      }
    }

    const percentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
    return { completedCount: completedChapters, totalCount: totalChapters, percentage };
  }, [chapterProgress, user.educationLevel]);

  const getAverageScore = useCallback(() => {
    const scores = Object.values(chapterProgress).map(p => p.bestScore).filter(s => s > 0);
    if (scores.length === 0) return 0;
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / scores.length);
  }, [chapterProgress]);

  // Streak
  const incrementStreak = useCallback(() => {
    setStreak(prev => {
      const updated = {
        ...prev,
        currentStreak: prev.currentStreak + 1,
        longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      saveState(STORAGE_KEYS.STREAK, updated);
      return updated;
    });
  }, [saveState]);

  // Rewards rule: All 8 chapters must be score >= 80
  const isSubjectRewardUnlocked = useCallback((subjectId: string) => {
    const subjects = getSubjectsByLevel(user.educationLevel);
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return false;

    const chapterScores = subject.chapters.map(ch => {
      const prog = chapterProgress[ch.id];
      return prog?.bestScore || 0;
    });

    return isRewardUnlocked(chapterScores);
  }, [chapterProgress, user.educationLevel]);

  const getSubjectChaptersStatus = useCallback((subjectId: string) => {
    const subjects = getSubjectsByLevel(user.educationLevel);
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return [];

    return subject.chapters.map(ch => {
      const prog = chapterProgress[ch.id];
      const score = prog?.bestScore || 0;
      return {
        chapterNumber: ch.chapterNumber,
        title: ch.title,
        score,
        completed: score >= APP_CONFIG.passingScore,
      };
    });
  }, [chapterProgress, user.educationLevel]);

  // Tasks
  const addTask = useCallback((title: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    setTasks(prev => {
      const newTask: StudyTask = {
        id: `task-${Date.now()}`,
        title,
        completed: false,
        priority,
      };
      const updated = [newTask, ...prev];
      saveState(STORAGE_KEYS.TASKS, updated);
      return updated;
    });
  }, [saveState]);

  const toggleTask = useCallback((taskId: string) => {
    setTasks(prev => {
      const updated = prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      saveState(STORAGE_KEYS.TASKS, updated);
      return updated;
    });
  }, [saveState]);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => {
      const updated = prev.filter(t => t.id !== taskId);
      saveState(STORAGE_KEYS.TASKS, updated);
      return updated;
    });
  }, [saveState]);

  // Notes
  const saveNote = useCallback((id: string | null, title: string, content: string, subjectName: string) => {
    setNotes(prev => {
      let updated: StudyNote[];
      if (id) {
        updated = prev.map(n => (n.id === id ? { ...n, title, content, subjectName, updatedAt: 'Baru saja' } : n));
      } else {
        const newNote: StudyNote = {
          id: `note-${Date.now()}`,
          title,
          content,
          subjectName,
          updatedAt: 'Baru saja',
        };
        updated = [newNote, ...prev];
      }
      saveState(STORAGE_KEYS.NOTES, updated);
      return updated;
    });
  }, [saveState]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => {
      const updated = prev.filter(n => n.id !== id);
      saveState(STORAGE_KEYS.NOTES, updated);
      return updated;
    });
  }, [saveState]);

  // Flashcards
  const updateFlashcardStatus = useCallback((cardId: string, status: 'new' | 'learning' | 'mastered') => {
    setFlashcards(prev => {
      const updated = prev.map(c => (c.id === cardId ? { ...c, status } : c));
      saveState(STORAGE_KEYS.FLASHCARDS, updated);
      return updated;
    });
  }, [saveState]);

  // Notifications
  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => (n.id === id ? { ...n, read: true } : n));
      saveState(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  }, [saveState]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      saveState(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  }, [saveState]);

  // Reset demo
  const resetDemoData = useCallback(() => {
    try {
      localStorage.clear();
      setUser(DEFAULT_USER);
      setHearts(DEFAULT_HEARTS);
      setSecondsUntilNextHeart(0);
      setChapterProgress(DEFAULT_PROGRESS);
      setQuizHistory([]);
      setStreak(DEFAULT_STREAK);
      setTasks(DEFAULT_TASKS);
      setNotes(DEFAULT_NOTES);
      setFlashcards(INITIAL_FLASHCARDS);
      setNotifications(DEFAULT_NOTIFICATIONS);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(() => ({
    user,
    updateUser,
    setEducationLevel,
    hearts,
    secondsUntilNextHeart,
    deductHeart,
    refillHearts,
    canTakeQuiz: hearts.current > 0,
    chapterProgress,
    quizHistory,
    recordQuizResult,
    getChapterProgress,
    getSubjectProgress,
    getOverallProgress,
    getAverageScore,
    streak,
    incrementStreak,
    isSubjectRewardUnlocked,
    getSubjectChaptersStatus,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    notes,
    saveNote,
    deleteNote,
    flashcards,
    updateFlashcardStatus,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    resetDemoData,
    isHydrated,
  }), [
    user,
    updateUser,
    setEducationLevel,
    hearts,
    secondsUntilNextHeart,
    deductHeart,
    refillHearts,
    chapterProgress,
    quizHistory,
    recordQuizResult,
    getChapterProgress,
    getSubjectProgress,
    getOverallProgress,
    getAverageScore,
    streak,
    incrementStreak,
    isSubjectRewardUnlocked,
    getSubjectChaptersStatus,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    notes,
    saveNote,
    deleteNote,
    flashcards,
    updateFlashcardStatus,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    resetDemoData,
    isHydrated,
  ]);

  return <EdukaContext.Provider value={value}>{children}</EdukaContext.Provider>;
}

// Reusable custom hooks requested by user
export function useEduka() {
  const context = useContext(EdukaContext);
  if (!context) {
    throw new Error('useEduka must be used within an EdukaProvider');
  }
  return context;
}

export function useUser() {
  const { user, updateUser, setEducationLevel, isHydrated } = useEduka();
  return { user, updateUser, setEducationLevel, isHydrated };
}

export function useHearts() {
  const { hearts, secondsUntilNextHeart, deductHeart, refillHearts, canTakeQuiz } = useEduka();
  return { hearts, secondsUntilNextHeart, deductHeart, refillHearts, canTakeQuiz };
}

export function useProgress() {
  const { chapterProgress, getChapterProgress, getSubjectProgress, getOverallProgress, getAverageScore } = useEduka();
  return { chapterProgress, getChapterProgress, getSubjectProgress, getOverallProgress, getAverageScore };
}

export function useQuiz() {
  const { recordQuizResult, quizHistory, canTakeQuiz } = useEduka();
  return { recordQuizResult, quizHistory, canTakeQuiz };
}

export function useStudyStreak() {
  const { streak, incrementStreak } = useEduka();
  return { streak, incrementStreak };
}

export function useRewards() {
  const { isSubjectRewardUnlocked, getSubjectChaptersStatus } = useEduka();
  return { isSubjectRewardUnlocked, getSubjectChaptersStatus };
}
