import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

const adapter = new SQLiteAdapter({
  schema: {
    version: 1,
    tables: [
      { name: 'events', columns: [{ name: 'title', type: 'string' }, { name: 'deadline', type: 'number' }, { name: 'category', type: 'string' }] },
      { name: 'tasks', columns: [{ name: 'title', type: 'string' }, { name: 'is_completed', type: 'boolean' }] },
    ]
  } as any
});

export const database = new Database({
  adapter,
  modelClasses: [],
  actionsEnabled: true,
});

export async function initDatabase() {
  console.log('WatermelonDB initialized - Offline support ready');
}
