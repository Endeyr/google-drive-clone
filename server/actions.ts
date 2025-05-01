'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { UTApi } from 'uploadthing/server';
import { db } from './db';
import { file_table } from './db/schema';

const utApi = new UTApi();

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

  const utApiResult = await utApi.deleteFiles([
    file.url.replace('https://mb8s2jfcos.ufs.sh/f/', ''),
  ]);

  console.log(utApiResult);

  const dbResult = await db.delete(file_table).where(eq(file_table.id, fileId));

  console.log(dbResult);

  // force next.js to revalidate data
  const c = await cookies();
  c.set('force-refresh', JSON.stringify(Math.random()));

  return { success: true };
};
