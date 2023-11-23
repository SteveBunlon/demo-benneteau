import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import populate, { generateTimestamps } from './utils';

const boatImageUrls = [
  'https://www.beneteau.com/sites/default/files/styles/hero_product/public/2022-09/hero-flyer8SPACEdeck.jpg.webp?itok=xm1kFH7F',
  'https://www.beneteau.com/sites/default/files/styles/hero_product/public/2022-10/GMR_First44_0521.jpg.webp?itok=qPA-sICh',
  'https://www.beneteau.com/sites/default/files/styles/hero_product/public/2023-08/intern_hero_desktop-oceanis37-1.jpg.webp?itok=2Puc8aUq',
  'https://www.beneteau.com/sites/default/files/styles/hero_product/public/2022-09/hero_flyer8sun.jpg.webp?itok=n74pN2gW',
  'https://www.beneteau.com/sites/default/files/styles/hero_product/public/2023-11/intern_hero_desktop-antares12-1920x640_1.jpg.webp?itok=IFdidcbg',
];

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
    table.date('created_at');
    table.date('updated_at');
    table.string('boat_image_path');
  });

  return populate(client, tableName, 500, () => ({
    designation: generateDesignation(),
    is_old: faker.datatype.boolean(),
    type: faker.helpers.arrayElement(types),
    as400_model: faker.number.int({ min: 60000, max: 65000 }),
    as400_variant: '004',
    brand_id: faker.helpers.arrayElement(brandIds),
    ...generateTimestamps(),
    boat_image_path: faker.helpers.arrayElement(boatImageUrls),
  }));
}
