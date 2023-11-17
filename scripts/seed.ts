/* eslint-disable no-console */
import 'dotenv/config';

import Knex from 'knex';

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

(async () => {
  console.log('Tables created!');
  await knex.destroy();
})();
