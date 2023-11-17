/* eslint-disable no-console */
import 'dotenv/config';

import Knex from 'knex';
import createBoats from './boats';

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

(async () => {
  const boats = await createBoats(knex);
  console.log('Tables created!');
  await knex.destroy();
})();
