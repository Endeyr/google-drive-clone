import { Button } from '@/components/ui/button';
import { MUTATION, QUERY } from '@/server/db/queries';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface Props {}
const DrivePage = async (props: Props) => {
  const session = await auth();
  if (!session.userId) {
    return redirect('/sign-in');
  }
  const rootFolder = await QUERY.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <form
        action={async () => {
          'use server';

          const session = await auth();

          if (!session.userId) {
            return redirect('/sign-in');
          }

          const rootFolderId = await MUTATION.onboardUser(session.userId);

          return redirect(`/f/${rootFolderId}`);
        }}
      >
        <Button>Create New Drive</Button>
      </form>
    );
  }
  return redirect(`/f/${rootFolder.id}`);
};
export default DrivePage;
