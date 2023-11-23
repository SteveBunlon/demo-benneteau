import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate, { generateTimestamps } from './utils';

export default async function populateNotifications(
  client: Knex,
  brandIds: number[],
): Promise<number[]> {
  const tableName = 'notifications';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.integer('brand_id').references('brands.id');
    table.boolean('is_live');
    table.string('type');
    table.date('created_at');
    table.date('updated_at');
  });

  return populate(client, tableName, 100, () => ({
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    brand_id: faker.helpers.arrayElement(brandIds),
    is_live: faker.datatype.boolean(),
    type: faker.helpers.arrayElement(['📅', '📨', '📍', '✨', '🕰️']),
    ...generateTimestamps(),
  }));
}
