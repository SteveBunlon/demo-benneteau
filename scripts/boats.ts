// import { faker } from '@faker-js/faker';
// import { Knex } from 'knex';

// import populate from './utils';

// export default async function populateAddresses(
//   client: Knex,
//   userIds: number[],
// ): Promise<number[]> {
//   const tableName = 'addresses';

//   await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

//   await client.schema.createTable(tableName, table => {
//     table.increments('id').primary();
//     table.integer('user_id').references('users.id');
//     table.string('country');
//     table.string('city');
//     table.string('street');
//     table.string('number');
//   });

//   return populate(client, tableName, 100, () => ({
//     user_id: faker.helpers.arrayElement(userIds),
//     street: faker.location.streetAddress(),
//     number: faker.number.int({ min: 1, max: 100 }),
//     city: faker.location.city(),
//     country: faker.location.country(),
//   }));
// }
