import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate, { generateTimestamps } from './utils';

function generateDocumentTitle() {
  return `Document ${faker.lorem.words(3)}`;
}

function generateDocumentType() {
  const types = ['Report', 'Invoice', 'Contract', 'Manual'];
  return faker.helpers.arrayElement(types);
}

export default async function populateDocuments(
  client: Knex,
  boatIds: number[],
): Promise<number[]> {
  const tableName = 'documents';

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('title');
    table.enum('type', ['Report', 'Invoice', 'Contract', 'Manual']);
    table.date('creation_date');
    table.boolean('is_confidential');
    table.string('reference_code');
    table.string('file_url');
    table.integer('boat_id').references('boats.id');
    table.date('created_at');
    table.date('updated_at');
  });

  return populate(client, tableName, 2000, () => ({
    title: generateDocumentTitle(),
    type: generateDocumentType(),
    creation_date: faker.date.past({ years: 10, refDate: '2021-01-01' }),
    is_confidential: faker.datatype.boolean(),
    reference_code: `DOC-${faker.string.alphanumeric(10).toUpperCase()}`,
    file_url: 'https://picsum.photos/200/300.jpg',
    boat_id: faker.helpers.arrayElement(boatIds),
    ...generateTimestamps(),
  }));
}
