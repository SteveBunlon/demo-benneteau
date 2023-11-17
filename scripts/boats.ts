import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate from './utils';

function generateDesignation() {
  return `ANTARES ${faker.number.int({ min: 5, max: 12 })} ${faker.datatype.boolean() ? 'HB' : ''}`;
}

export default async function populateBoats(client: Knex, brandIds: number[]): Promise<number[]> {
  const tableName = 'boats';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  const types = ['Hors-board', 'Inboard', 'Jet', 'Voile'];

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('designation');
    table.boolean('is_old');
    table.enum('type', types);
    table.string('as400_model');
    table.string('as400_variant');
    table.integer('brand_id').references('brands.id');
  });

  return populate(client, tableName, 500, () => ({
    designation: generateDesignation(),
    is_old: faker.datatype.boolean(),
    type: faker.helpers.arrayElement(types),
    as400_model: faker.number.int({ min: 60000, max: 65000 }),
    as400_variant: '004',
    brand_id: faker.helpers.arrayElement(brandIds),
  }));
}
