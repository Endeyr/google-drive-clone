import DriveContents from '@/app/f/[folderId]/drive-context';
import { QUERY } from '@/server/db/queries';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    // could also redirect or throw error
    return <div>Invalid folder ID</div>;
  }

  const { userId } = await auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const [files, folders, parents] = await Promise.all([
    QUERY.getFiles(parsedFolderId, userId),
    QUERY.getFolders(parsedFolderId, userId),
    QUERY.getAllParentsForFolder(parsedFolderId, userId),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
    />
  );
}
