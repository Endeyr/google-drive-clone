import { QUERY } from '@/server/db/queries';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import FileContents from './file-contents';

export default async function GoogleDriveClone(props: {
  params: Promise<{ fileId: string }>;
}) {
  const params = await props.params;
  const parsedFileId = parseInt(params.fileId);
  if (isNaN(parsedFileId)) {
    // could also redirect or throw error
    return <div>Invalid file ID</div>;
  }

  const { userId } = await auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const file = await QUERY.getFileById(parsedFileId);

  return <FileContents file={file} />;
}
