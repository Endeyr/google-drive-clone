'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { UTApi } from 'uploadthing/server';
import { db } from './db';
import { DB_FolderType, file_table, folder_table } from './db/schema';

const utApi = new UTApi();

const deleteSubFolders = async (folders: DB_FolderType[]) => {
  for (const folder of folders) {
    // Recursively delete subfolders
    const children = await db
      .select()
      .from(folder_table)
      .where(eq(folder_table.parent, folder.id));

    if (children.length > 0) {
      await deleteSubFolders(children);
    }

    // Delete files
    const files = await db
      .select()
      .from(file_table)
      .where(eq(file_table.parent, folder.id));

    await Promise.all(files.map((file) => deleteFile(file.id)));

    // Delete folder
    await db.delete(folder_table).where(eq(folder_table.id, folder.id));
  }
};

export const deleteFolder = async (folderId: number) => {
  // Check if user is authenticated
  const session = await auth();
  if (!session.userId) {
    return { error: 'Unauthorized' };
  }

  // Get folder from database
  const folders = await db
    .select()
    .from(folder_table)
    .where(
      and(
        eq(folder_table.id, folderId),
        eq(folder_table.ownerId, session.userId)
      )
    );

  // Return error if folder not found
  if (folders.length === 0) {
    return { error: 'Folder not found' };
  }

  await deleteSubFolders(folders);

  // Force nextjs to revalidate data
  const c = await cookies();
  c.set('force-refresh', JSON.stringify(Math.random()));

  return { success: true };
};

export const deleteFile = async (fileId: number) => {
  const session = await auth();
  if (!session.userId) {
    return { error: 'Unauthorized' };
  }
  const [file] = await db
    .select()
    .from(file_table)
    .where(
      and(eq(file_table.id, fileId), eq(file_table.ownerId, session.userId))
    );

  if (!file) {
    return { error: 'File not found' };
  }

  await utApi.deleteFiles([
    file.url.replace('https://mb8s2jfcos.ufs.sh/f/', ''),
  ]);

  await db.delete(file_table).where(eq(file_table.id, fileId));

  // force next.js to revalidate data
  const c = await cookies();
  c.set('force-refresh', JSON.stringify(Math.random()));

  return { success: true };
};
