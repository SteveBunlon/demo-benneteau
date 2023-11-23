import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateUserNotifications(
  client: Knex,
  userIds: number[],
  notificationIds: number[],
): Promise<number[]> {
  const tableName = 'user-notifications';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.integer('user_id').references('users.id');
    table.integer('notification_id').references('notifications.id');
    table.boolean('is_read');
  });

  return populate(client, tableName, 100, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    notification_id: faker.helpers.arrayElement(notificationIds),
    is_read: faker.datatype.boolean(),
  }));
}
