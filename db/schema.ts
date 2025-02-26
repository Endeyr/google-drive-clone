import {
  index,
  int,
  singlestoreTable,
  text,
} from 'drizzle-orm/singlestore-core';
export const users = singlestoreTable('users_table', {
  id: int('id').primaryKey().autoincrement(),
  name: text('name'),
  age: int('age'),
});

export const files = singlestoreTable(
  'files_table',
  {
    id: int('id').primaryKey().autoincrement(),
    name: text('name'),
    url: text('url'),
    parent: int('parent'),
    size: int('size'),
  },
  (t) => {
    return [index('parent_index').on(t.parent)];
  }
);

export const folders = singlestoreTable(
  'folders_table',
  {
    id: int('id').primaryKey().autoincrement(),
    name: text('name'),
    parent: int('parent'),
  },
  (t) => {
    return [index('parent_index').on(t.parent)];
  }
);
