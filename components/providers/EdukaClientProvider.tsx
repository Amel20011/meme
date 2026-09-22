'use client';

import React from 'react';
import { EdukaProvider } from '@/hooks/useEdukaStore';

export function EdukaClientProvider({ children }: { children: React.ReactNode }) {
  return <EdukaProvider>{children}</EdukaProvider>;
}
