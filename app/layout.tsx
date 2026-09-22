import type {Metadata, Viewport} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { EdukaClientProvider } from '@/components/providers/EdukaClientProvider';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const viewport: Viewport = {
  themeColor: '#7C4DFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'EDUKA — Belajar Lebih Terarah, Tumbuh Setiap Hari',
  description: 'Aplikasi edukasi modern berfokus pada active recall, spaced repetition, dan evaluasi bab terstruktur untuk SD hingga Kuliah.',
  openGraph: {
    title: 'EDUKA — Belajar Lebih Terarah, Tumbuh Setiap Hari',
    description: 'Aplikasi edukasi modern berfokus pada active recall, spaced repetition, dan evaluasi bab terstruktur untuk SD hingga Kuliah.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EDUKA — Belajar Lebih Terarah, Tumbuh Setiap Hari',
    description: 'Aplikasi edukasi modern berfokus pada active recall, spaced repetition, dan evaluasi bab terstruktur untuk SD hingga Kuliah.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <body suppressHydrationWarning className="bg-[#12111A] text-[#171525] antialiased selection:bg-[#E9D9FF] selection:text-[#7C4DFF] min-h-screen flex justify-center items-start">
        {/* Mobile Viewport Shell for Desktop Centering */}
        <div className="w-full max-w-[440px] min-h-screen bg-[#FDFBF7] relative flex flex-col shadow-2xl overflow-x-hidden border-x border-black/[0.04]">
          <EdukaClientProvider>
            {children}
          </EdukaClientProvider>
        </div>
      </body>
    </html>
  );
}

