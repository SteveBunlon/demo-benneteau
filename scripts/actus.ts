import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate, { generateTimestamps } from './utils';

export default async function populateBoats(client: Knex, boatsId: number[]): Promise<number[]> {
  const tableName = 'actus';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('title');
    table.string('short_text');
    table.string('article');
    table.integer('boat_id').references('boats.id');
    table.boolean('is_published');
    table.integer('order');
    table.date('created_at');
    table.date('updated_at');
  });

  let i = 0;

  return populate(client, tableName, 50, () => {
    i += 1;
    return {
      title: faker.lorem.words(),
      short_text: faker.lorem.sentence(),
      article: faker.lorem.paragraph(),
      boat_id: faker.helpers.arrayElement(boatsId),
      is_published: faker.datatype.boolean(),
      order: i,
      ...generateTimestamps(),
    };
  });
}
