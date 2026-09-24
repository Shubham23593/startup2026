import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'events',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'organizer', type: 'string' },
        { name: 'website_link', type: 'string' },
        { name: 'registration_link', type: 'string' },
        { name: 'meeting_link', type: 'string' },
        { name: 'venue', type: 'string' },
        { name: 'start_date', type: 'number' },
        { name: 'end_date', type: 'number' },
        { name: 'deadline', type: 'number' },
        { name: 'priority', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'is_pinned', type: 'boolean' },
        { name: 'is_favorite', type: 'boolean' },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'firestore_id', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'is_completed', type: 'boolean' },
        { name: 'priority', type: 'string' },
        { name: 'due_date', type: 'number', isOptional: true },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'event_id', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'notes',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'is_pinned', type: 'boolean' },
        { name: 'is_favorite', type: 'boolean' },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'documents',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'size', type: 'number' },
        { name: 'local_path', type: 'string', isOptional: true },
        { name: 'cloud_url', type: 'string', isOptional: true },
        { name: 'category', type: 'string' },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
  ],
});
