if (process.env.NEXT_RUNTIME) {
  require('server-only');
}

import {
  bigint,
  index,
  int,
  singlestoreTableCreator,
  text,
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
    name: text('name').notNull(),
    url: text('url').notNull(),
    parent: bigint('parent', { mode: 'number', unsigned: true }).notNull(),
    size: int('size').notNull(),
  },
  (t) => {
    return [index('parent_index').on(t.parent)];
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
    parent: bigint('parent', { mode: 'number', unsigned: true }),
  },
  (t) => {
    return [index('parent_index').on(t.parent)];
  }
);

export type DB_FolderType = typeof folder_table.$inferSelect;
