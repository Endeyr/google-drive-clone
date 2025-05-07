import 'server-only';

import { db } from '@/server/db/index';
import {
  file_table as filesSchema,
  folder_table as foldersSchema,
} from '@/server/db/schema';
import { and, eq, isNull } from 'drizzle-orm';

export const QUERY = {
  getFolders: (folderId: number, userId: string) => {
    return db
      .select()
      .from(foldersSchema)
      .where(
        and(
          eq(foldersSchema.ownerId, userId),
          eq(foldersSchema.parent, folderId)
        )
      )
      .orderBy(foldersSchema.id);
  },
  getFiles: (folderId: number, userId: string) => {
    return db
      .select()
      .from(filesSchema)
      .where(
        and(eq(filesSchema.ownerId, userId), eq(filesSchema.parent, folderId))
      )
      .orderBy(filesSchema.id);
  },
  getAllParentsForFolder: async (folderId: number, userId: string) => {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(
          and(
            eq(foldersSchema.ownerId, userId),
            eq(foldersSchema.id, currentId)
          )
        );

      if (!folder[0]) {
        throw new Error('Parent folder not found');
      }

      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
  },
  getFolderById: async (folderId: number) => {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, folderId));
    return folder[0];
  },
  getFileById: async (fileId: number) => {
    const file = await db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.id, fileId));
    return file[0];
  },
  getRootFolderForUser: async (userId: string) => {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(
        and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent))
      );
    return folder[0];
  },
};

export const MUTATION = {
  createFolder: async (input: {
    folder: {
      name: string;
      parent: number;
    };
    userId: string;
  }) => {
    return await db.insert(foldersSchema).values({
      ...input.folder,
      ownerId: input.userId,
    });
  },
  createFile: async (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) => {
    return await db.insert(filesSchema).values({
      ...input.file,
      ownerId: input.userId,
    });
  },
  onboardUser: async (userId: string) => {
    const rootFolder = await db
      .insert(foldersSchema)
      .values({
        name: 'Root',
        parent: null,
        ownerId: userId,
      })
      .$returningId();

    const rootFolderId = rootFolder[0]!.id;

    await db.insert(foldersSchema).values([
      {
        name: 'Trash',
        parent: rootFolderId,
        ownerId: userId,
      },
      {
        name: 'Shared',
        parent: rootFolderId,
        ownerId: userId,
      },
      {
        name: 'Documents',
        parent: rootFolderId,
        ownerId: userId,
      },
    ]);

    return rootFolderId;
  },
};
