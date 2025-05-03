import { SignInButton } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <>
      <SignInButton forceRedirectUrl={'/drive'} />
      <footer className='mt-16 text-sm text-neutral-500'>
        © {new Date().getFullYear()} Storage Drive. All rights reserved.
      </footer>
    </>
  );
};
export default SignInPage;
