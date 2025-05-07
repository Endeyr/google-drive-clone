import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

interface Props {
  currentFolderId: number;
}
const CreateFolderForm = ({ currentFolderId }: Props) => {
  const [name, setName] = useState('');
  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      return alert('Enter name');
    }

    const res = await fetch('/api/createFolder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        parent: currentFolderId,
      }),
    });
    if (!res.ok) {
      console.error('Failed to create folder');
      return;
    }

    const response = await res.json();

    console.log(response);

    if (response.success) {
      return navigate.refresh();
    }
  };
  return (
    <form
      className='col-span-2 flex items-center justify-center gap-2'
      onSubmit={handleSubmit}
    >
      <label htmlFor='name'>Folder Name:</label>
      <input
        className='rounded border border-gray-500'
        name='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant={'outline'} type='submit'>
        Create New Folder
      </Button>
    </form>
  );
};
export default CreateFolderForm;
