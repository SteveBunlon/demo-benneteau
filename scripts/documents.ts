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
    file_url: faker.helpers.arrayElement([
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      'https://www.africau.edu/images/default/sample.pdf',
      'https://pdfobject.com/pdf/sample.pdf',
      'https://css4.pub/2015/icelandic/dictionary.pdf',
      'https://www.princexml.com/samples/invoice/invoicesample.pdf',
      'https://www.princexml.com/howcome/2016/samples/invoice/index.pdf',
      'https://css4.pub/2017/newsletter/drylab.pdf',
      'https://css4.pub/2015/usenix/example.pdf',
      'https://www.princexml.com/howcome/2016/samples/magic8/index.pdf',
      'https://www.princexml.com/samples/catalog/PrinceCatalogue.pdf',
      'https://www.princexml.com/samples/flyer/flyer.pdf',
      'https://www.princexml.com/howcome/2016/samples/magic6/magic.pdf',
    ]),
    boat_id: faker.helpers.arrayElement(boatIds),
    ...generateTimestamps(),
  }));
}
