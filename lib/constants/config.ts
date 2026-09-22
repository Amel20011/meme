// Centralized application configuration.
// Change APP_NAME here to update branding everywhere in the app.

export const APP_CONFIG = {
  name: 'EDUKA',
  tagline: 'Belajar lebih terarah. Tumbuh setiap hari.',
  version: '2.0.0',
  author: 'EDUKA Education Team',
  supportEmail: 'halo@eduka.id',
  passingScore: 80, // 80% completion rule
  maxHearts: 5,
  heartRecoverySeconds: 60, // 1 minute per heart recovery
  totalChaptersPerSubject: 8, // Exactly BAB 1 to BAB 8
  defaultEducationLevel: 'SMA' as const,
  levels: [
    { id: 'SD', name: 'Sekolah Dasar', shortName: 'SD', grades: 'Kelas 1 - 6', icon: '🎒' },
    { id: 'SMP', name: 'Sekolah Menengah Pertama', shortName: 'SMP', grades: 'Kelas 7 - 9', icon: '📐' },
    { id: 'SMA', name: 'Sekolah Menengah Atas', shortName: 'SMA', grades: 'Kelas 10 - 12', icon: '🔬' },
    { id: 'SMK', name: 'Sekolah Menengah Kejuruan', shortName: 'SMK', grades: 'Kelas 10 - 12', icon: '⚙️' },
    { id: 'KULIAH', name: 'Perguruan Tinggi', shortName: 'KULIAH', grades: 'Semester 1 - 8', icon: '🎓' },
  ],
  palette: {
    lavender: '#E9D9FF',
    purple: '#7C4DFF',
    pink: '#F6B6D8',
    peach: '#FFD1C1',
    orange: '#FFB86B',
    mint: '#BFEBD7',
    sky: '#BFDFFF',
    white: '#FFFFFF',
    dark: '#171525',
  }
};

export type EducationLevelId = 'SD' | 'SMP' | 'SMA' | 'SMK' | 'KULIAH';
