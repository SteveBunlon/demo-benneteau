/* eslint-disable no-console */
import 'dotenv/config';

import Knex from 'knex';
import createBoats from './boats';
import createDocuments from './documents';
import createActus from './actus';

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

(async () => {
  const boats = await createBoats(knex);
  const documents = await createDocuments(knex, boats);
  const actus = await createActus(knex);
  console.log('Tables created!');
  await knex.destroy();
})();
