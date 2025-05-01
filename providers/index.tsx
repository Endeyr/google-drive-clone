import Layout from '@/components/layouts';
import { ClerkProvider } from '@clerk/nextjs';
import { PostHogProvider } from './posthog';

interface Props {
  children: React.ReactNode;
}
const ProvidersWrapper = ({ children }: Props) => {
  return (
    <PostHogProvider>
      <ClerkProvider>
        <Layout>{children}</Layout>
      </ClerkProvider>
    </PostHogProvider>
  );
};

export default ProvidersWrapper;
