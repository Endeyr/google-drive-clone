import type { File as FileT, Folder as FolderT } from '@/lib/mock-data';
import { FileIcon, Folder as FolderIcon } from 'lucide-react';
import Link from 'next/link';

interface FileProps {
  file: FileT;
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
        <div className='col-span-3 text-gray-400'>{'File'}</div>
        <div className='col-span-3 text-gray-400'>{file.size}</div>
      </div>
    </li>
  );
};

interface FolderProps {
  folder: FolderT;
  handleFolderClick: () => void;
}

export const FolderRow = ({ folder, handleFolderClick }: FolderProps) => {
  return (
    <li
      key={folder.id}
      className='hover:bg-gray-750 border-b border-gray-700 px-6 py-4'
    >
      <div className='grid grid-cols-12 items-center gap-4'>
        <div className='col-span-6 flex items-center'>
          <button
            onClick={() => handleFolderClick()}
            className='flex items-center text-gray-100 hover:text-blue-400'
          >
            <FolderIcon className='mr-3' size={20} />
            {folder.name}
          </button>
        </div>
        <div className='col-span-3 text-gray-400'></div>
        <div className='col-span-3 text-gray-400'></div>
      </div>
    </li>
  );
};
