'use client';

import CreateFolderForm from '@/components/create-folder';
import { FileRow, FolderRow } from '@/components/file-row';
import type { file_table, folder_table } from '@/server/db/schema';
import { UploadButton } from '@/utils/uploadthing';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DriveContents(props: {
  files: Array<typeof file_table.$inferSelect>;
  folders: Array<typeof folder_table.$inferSelect>;
  parents: Array<typeof folder_table.$inferSelect>;
  currentFolderId: number;
}) {
  const navigate = useRouter();

  return (
    <div className='min-h-screen bg-gray-900 p-8 text-gray-100'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center'>
            <Link href={'/'} className='m-2 text-gray-300 hover:text-white'>
              My Drive
            </Link>
            {props.parents?.map((folder) => (
              <div key={folder.id} className='flex items-center'>
                <ChevronRight className='mx-2 text-gray-500' size={16} />
                <Link
                  href={`${folder.id}`}
                  className='text-gray-300 hover:text-white'
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className='rounded-lg bg-gray-800 shadow-xl'>
          <div className='border-b border-gray-700 px-6 py-4'>
            <div className='grid grid-cols-12 gap-4 text-sm font-medium text-gray-400'>
              <div className='col-span-6'>Name</div>
              <div className='col-span-2'>Type</div>
              <div className='col-span-3'>Size</div>
              <div className='col-span-1'>Delete</div>
            </div>
          </div>
          <ul>
            {props.folders?.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files?.map((file) => <FileRow key={file.id} file={file} />)}
          </ul>
        </div>
        <div className='grid grid-cols-3 items-center justify-center'>
          <CreateFolderForm currentFolderId={props.currentFolderId} />

          <UploadButton
            className='mt-2'
            endpoint='driveUploader'
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
            input={{ folderId: props.currentFolderId }}
          />
        </div>
      </div>
    </div>
  );
}
