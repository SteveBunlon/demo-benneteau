import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

export default async function populateUsers(client: Knex, brandIds: number[]): Promise<number[]> {
  const tableName = 'users';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('name');
    table.date('birth_date');
    table.boolean('is_blocked');
    table.integer('brand_id').references('brands.id');
  });

  return populate(client, tableName, 20, () => ({
    name: faker.person.fullName(),
    birth_date: faker.date.past(),
    is_blocked: faker.datatype.boolean(),
    brand_id: faker.helpers.arrayElement(brandIds),
  }));
}
