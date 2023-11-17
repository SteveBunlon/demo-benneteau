import { Knex } from 'knex';

import populate from './utils';

export default async function populateBrands(client: Knex): Promise<number[]> {
  const tableName = 'brands';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  const brandNames = ['beneteau', 'lagoon'];

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('name');
  });

  return populate(client, tableName, brandNames.length, index => ({
    name: brandNames[index],
  }));
}
