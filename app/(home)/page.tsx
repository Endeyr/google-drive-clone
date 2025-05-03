import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function HomePage() {
  return (
    <>
      <h1 className='mb-4 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl'>
        Storage Drive
      </h1>
      <p className='mx-auto mb-8 max-w-md text-xl text-zinc-500 md:text-2xl'>
        Secure, fast, and easy file storage for the modern web
      </p>
      <form
        action={async () => {
          'use server';

          const session = await auth();

          if (!session.userId) {
            return redirect('/sign-in');
          }

          return redirect('/drive');
        }}
      >
        <Button
          size='lg'
          type='submit'
          className='border border-zinc-700 bg-zinc-800 text-white transition-colors hover:bg-zinc-700'
        >
          Get Started
        </Button>
      </form>
      <footer className='mt-16 text-sm text-zinc-500'>
        © {new Date().getFullYear()} Storage Drive. All rights reserved.
      </footer>
    </>
  );
}
