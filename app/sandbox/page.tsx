import { mockFiles, mockFolders } from '@/lib/mock-data';
import { db } from '@/server/db/index';
import { files, folders } from '@/server/db/schema';
interface SandboxPageProps {}
const SandboxPage = ({}: SandboxPageProps) => {
  return (
    <div className='flex flex-col gap-4'>
      Seed Function
      <form
        action={async () => {
          'use server';
          const folderInsert = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              name: folder.name,
              parent: index !== 0 ? index : null,
            }))
          );
          console.log(folderInsert);
          const fileInsert = await db.insert(files).values(
            mockFiles.map((file, index) => ({
              name: file.name,
              size: file.size,
              url: file.url,
              parent: (index % 3) + 1,
            }))
          );
          console.log(fileInsert);
        }}
      >
        <button type='submit'>Seed</button>
      </form>
    </div>
  );
};
export default SandboxPage;
