import Layout from '@/components/layouts';
import { ClerkProvider } from '@clerk/nextjs';
import { PostHogProvider } from './posthog';

interface Props {
  children: React.ReactNode;
}
const ProvidersWrapper = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <PostHogProvider>
        <Layout>{children}</Layout>
      </PostHogProvider>
    </ClerkProvider>
  );
};

export default ProvidersWrapper;
