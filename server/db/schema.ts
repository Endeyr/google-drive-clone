if (process.env.NEXT_RUNTIME) {
  require('server-only');
}

import {
  bigint,
  index,
  int,
  singlestoreTableCreator,
  text,
  timestamp,
} from 'drizzle-orm/singlestore-core';

export const createTable = singlestoreTableCreator(
  (name) => `drive-tutorial_${name}`
);

export const file_table = createTable(
  'files_table',
  {
    id: bigint('id', { mode: 'number', unsigned: true })
      .primaryKey()
      .autoincrement(),
    ownerId: text('owner_id').notNull(),
    name: text('name').notNull(),
    size: int('size').notNull(),
    url: text('url').notNull(),
    // fileKey: text('file_key').notNull(),
    parent: bigint('parent', { mode: 'number', unsigned: true }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => {
    return [
      index('parent_index').on(t.parent),
      index('owner_id_index').on(t.ownerId),
    ];
  }
);

export type DB_FileType = typeof file_table.$inferSelect;

export const folder_table = createTable(
  'folders_table',
  {
    id: bigint('id', { mode: 'number', unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text('name').notNull(),
    ownerId: text('owner_id').notNull(),
    parent: bigint('parent', { mode: 'number', unsigned: true }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => {
    return [
      index('parent_index').on(t.parent),
      index('owner_id_index').on(t.ownerId),
    ];
  }
);

export type DB_FolderType = typeof folder_table.$inferSelect;
