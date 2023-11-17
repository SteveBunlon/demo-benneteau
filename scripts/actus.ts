import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate, { generateTimestamps } from './utils';

export default async function populateBoats(client: Knex, brandIds: number[]): Promise<number[]> {
  const tableName = 'actus';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('title');
    table.string('short_text');
    table.string('article');
    table.integer('brand_id').references('brands.id');
    table.date('created_at');
    table.date('updated_at');
  });

  return populate(client, tableName, 10, () => ({
    title: faker.lorem.words(),
    short_text: faker.lorem.sentence(),
    article: faker.lorem.paragraph(),
    brand_id: faker.helpers.arrayElement(brandIds),
    ...generateTimestamps(),
  }));
}
