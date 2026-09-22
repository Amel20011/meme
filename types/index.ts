import { EducationLevelId } from '@/lib/constants/config';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed index of options
  explanation: string;
}

export interface Chapter {
  id: string;
  chapterNumber: number; // 1 to 8
  title: string;
  subtitle: string;
  summary: string;
  readingDurationMinutes: number;
  keyPoints: string[];
  sampleQuestions: QuizQuestion[];
}

export interface Subject {
  id: string;
  educationLevel: EducationLevelId;
  name: string;
  slug: string;
  category: string;
  color: string;
  iconName: string;
  description: string;
  chapters: Chapter[]; // EXACTLY 8 chapters
}

export interface ChapterProgress {
  chapterId: string;
  subjectId: string;
  score: number; // 0 to 100
  completed: boolean; // score >= 80
  attemptsCount: number;
  lastAttemptAt?: string;
  bestScore: number;
}

export interface QuizAttempt {
  id: string;
  chapterId: string;
  subjectId: string;
  chapterTitle: string;
  subjectName: string;
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
}

export interface StudyTask {
  id: string;
  title: string;
  subjectId?: string;
  dueDate?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  subjectName: string;
  updatedAt: string;
}

export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  hint?: string;
  subjectId: string;
  subjectName: string;
  status: 'new' | 'learning' | 'mastered';
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  // Sunday to Saturday: boolean for whether completed
  weeklyDays: {
    day: string; // 'S' | 'M' | 'T' | 'W' | 'T' | 'F' | 'S'
    label: string;
    completed: boolean;
    isToday: boolean;
  }[];
}

export interface HeartsState {
  current: number; // 0 - 5
  max: number; // 5
  lastHeartLostTimestamp: number | null; // epoch ms
  nextRecoveryTimestamp: number | null; // epoch ms
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  educationLevel: EducationLevelId;
  gradeSemester: string;
  joinedDate: string;
  dailyGoalMinutes: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'streak' | 'reward' | 'quiz' | 'reminder';
  link?: string;
}
