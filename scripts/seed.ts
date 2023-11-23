/* eslint-disable no-console */
import 'dotenv/config';

import Knex from 'knex';
import createBoats from './boats';
import createDocuments from './documents';
import createActus from './actus';
import createBrands from './brands';
import createUsers from './users';
import createNotifications from './notifications';
import createUserNotifications from './user-notifications';

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

(async () => {
  const brands = await createBrands(knex);
  const boats = await createBoats(knex, brands);
  const documents = await createDocuments(knex, boats);
  const actus = await createActus(knex, boats);
  const users = await createUsers(knex, brands);
  const notifications = await createNotifications(knex, brands);
  const userNotifications = await createUserNotifications(knex, users, notifications);
  console.log('Tables created!');
  await knex.destroy();
})();
