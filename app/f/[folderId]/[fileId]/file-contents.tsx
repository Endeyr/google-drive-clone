import { file_table } from '@/server/db/schema';
import { FileIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FileContents({
  file,
}: {
  file: typeof file_table.$inferSelect;
}) {
  const extension = file.name.split('.').pop()?.toLowerCase();

  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(
    extension ?? ''
  );
  const isPDF = extension === 'pdf';

  return (
    <div className='min-h-screen bg-gray-900 p-8 text-gray-100'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href={`/f/${file.parent}`}
              className='m-2 text-gray-300 hover:text-white'
            >
              Back to Drive
            </Link>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2 text-gray-100'>
          <h2>{file.name}</h2>
          {isImage && (
            <Image src={file.url} alt={file.name} width={1000} height={1000} />
          )}
          {isPDF && (
            <iframe
              src={file.url}
              title={file.name}
              className='h-[75dvh] w-full rounded border'
            />
          )}
          {!isImage && !isPDF && (
            <Link
              className='flex items-center text-gray-100 hover:text-blue-400'
              href={file.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FileIcon className='mr-3' size={20} />
              {file.name}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
