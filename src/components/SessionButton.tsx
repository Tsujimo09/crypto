import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { URL } from '@/Utility/URL';
import { Icon } from '@/Utility/Icon';

export async function SessionButton({ mode }: { mode: ButtonMode }) {
  async function actions() {
    'use server';
    //modeによる処理の内容
    if (mode === 'github' || mode === 'google') {
      await signIn(mode);
      return;
    }

    if (mode === 'guest') {
      await signIn('credentials');
      return;
    }

    if (mode === 'signIn') {
      redirect(URL.LOGIN);
    }
    if (mode === 'signOut') {
      await signOut({ redirectTo: URL.HOME });
      return;
    }
    if (mode === 'Home') {
      redirect(URL.HOME);
    }
    // fallback
    console.error('無効なモードです:', mode);
  }

  return (
    <form action={actions}>
      <button name="mode" value={mode} className="glassButton flex w-full">
        {Icon(mode)}
        {mode}
      </button>
    </form>
  );
}
