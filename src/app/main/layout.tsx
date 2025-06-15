import { auth } from '@/auth';
import { URL } from '@/Utility/URL';
import { redirect } from 'next/navigation';

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    redirect(URL.LOGIN);
  }
  return <>{children}</>;
}
