import DriveContents from '@/app/drive-context';
import {
  getAllParentsForFolder,
  getFiles,
  getFolders,
} from '@/server/db/queries';
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    // could also redirect or throw error
    return <div>Invalid folder ID</div>;
  }

  const filesPromise = getFiles(parsedFolderId);

  const foldersPromise = getFolders(parsedFolderId);

  const parentsPromise = getAllParentsForFolder(parsedFolderId);

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
