import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateBoats(client: Knex): Promise<number[]> {
  const tableName = 'actus';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('title');
    table.string('shortText');
    table.string('article');
  });

  return populate(client, tableName, 10, () => ({
    title: faker.lorem.words(),
    shortText: faker.lorem.sentence(),
    article: faker.lorem.paragraph(),
  }));
}
