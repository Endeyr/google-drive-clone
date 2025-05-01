import DriveContents from '@/app/drive-context';
import { QUERY } from '@/server/db/queries';
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    // could also redirect or throw error
    return <div>Invalid folder ID</div>;
  }

  const [files, folders, parents] = await Promise.all([
    QUERY.getFiles(parsedFolderId),
    QUERY.getFolders(parsedFolderId),
    QUERY.getAllParentsForFolder(parsedFolderId),
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
