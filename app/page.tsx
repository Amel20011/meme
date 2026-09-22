import { redirect } from 'next/navigation';

export default function RootPage() {
  // Direct entry to Onboarding or Home
  redirect('/onboarding');
}
