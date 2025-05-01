import { deleteFile } from '@/server/actions';
import type { file_table, folder_table } from '@/server/db/schema';
import { FileIcon, Folder as FolderIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface FileProps {
  file: typeof file_table.$inferSelect;
}
export const FileRow = ({ file }: FileProps) => {
  return (
    <li
      key={file.id}
      className='hover:bg-gray-750 border-b border-gray-700 px-6 py-4'
    >
      <div className='grid grid-cols-12 items-center gap-4'>
        <div className='col-span-6 flex items-center'>
          <Link
            href={file.url}
            className='flex items-center text-gray-100 hover:text-blue-400'
            target='_blank'
          >
            <FileIcon className='mr-3' size={20} />
            {file.name}
          </Link>
        </div>
        <div className='col-span-2 text-gray-400'>{'File'}</div>
        <div className='col-span-3 text-gray-400'>{file.size}</div>
        <div className='col-span-1 text-gray-400'>
          <Button
            variant={'ghost'}
            onClick={() => deleteFile(file.id)}
            aria-label='delete file'
          >
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
};

interface FolderProps {
  folder: typeof folder_table.$inferSelect;
}

export const FolderRow = ({ folder }: FolderProps) => {
  return (
    <li
      key={folder.id}
      className='hover:bg-gray-750 border-b border-gray-700 px-6 py-4'
    >
      <div className='grid grid-cols-12 items-center gap-4'>
        <div className='col-span-6 flex items-center'>
          <Link
            href={`/f/${folder.id}`}
            className='flex items-center text-gray-100 hover:text-blue-400'
          >
            <FolderIcon className='mr-3' size={20} />
            {folder.name}
          </Link>
        </div>
        <div className='col-span-3 text-gray-400'></div>
        <div className='col-span-3 text-gray-400'></div>
      </div>
    </li>
  );
};
