import 'server-only';

import { db } from '@/server/db/index';
import {
  file_table as filesSchema,
  folder_table as foldersSchema,
} from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const getAllParentsForFolder = async (folderId: number) => {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]) {
      throw new Error('Parent folder not found');
    }

    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }
  return parents;
};

export const getFiles = async (folderId: number) => {
  return db.select().from(filesSchema).where(eq(filesSchema.parent, folderId));
};

export const getFolders = async (folderId: number) => {
  return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, folderId));
};
