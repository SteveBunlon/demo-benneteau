import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export default async function populate(
  client: Knex,
  tableName: string,
  numberOfElements: number,
  elementBuilder: (i: number) => unknown,
): Promise<number[]> {
  const elements = [];

  for (let i = 0; i < numberOfElements; i += 1) {
    const element = elementBuilder(i);
    elements.push(element);
  }

  const results = await client.insert(elements).into(tableName).returning('id');

  return results.map(row => row.id.toString());
}

export function generateTimestamps() {
  const createdAt = faker.date.past({ years: 2, refDate: '2023-01-01' });
  let updatedAt = new Date(createdAt.getTime() + faker.number.int({ min: 0, max: 100000000 })); // Adds a random number of milliseconds to 'createdAt' to get 'updatedAt'.

  // Adjust 'updatedAt' to ensure it's not in the future.
  if (updatedAt > new Date()) {
    updatedAt = new Date();
  }

  return { created_at: createdAt, updated_at: updatedAt };
}
