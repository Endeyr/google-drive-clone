import Layout from '@/components/layouts';

interface Props {
  children: React.ReactNode;
}
const ProvidersWrapper = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};

export default ProvidersWrapper;
