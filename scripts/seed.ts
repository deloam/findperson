import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Replicate __dirname functionality in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { db } from '@vercel/postgres';
import { clientData } from '../lib/data.ts';

async function seedPeople() {
  try {
    // Create the "people" table if it doesn't exist
    const createTable = await db.sql`
      CREATE TABLE IF NOT EXISTS people (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        cpf VARCHAR(20) NOT NULL UNIQUE,
        parentesco VARCHAR(100),
        mae VARCHAR(255),
        nascimento VARCHAR(20),
        profissao VARCHAR(255),
        "isPrincipal" BOOLEAN NOT NULL DEFAULT false,
        downloaded BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log(`Created "people" table`);

    // Insert data into the "people" table
    const insertedPeople = await Promise.all(
      clientData.map(async (person) => {
        return db.sql`
          INSERT INTO people (nome, cpf, parentesco, mae, nascimento, profissao, "isPrincipal", downloaded)
          VALUES (${person.nome}, ${person.cpf}, ${person.parentesco}, ${person.mae}, ${person.nascimento}, ${person.profissao}, ${person.isPrincipal}, ${person.downloaded})
          ON CONFLICT (cpf) DO NOTHING; -- Do not insert if CPF already exists
        `;
      }),
    );

    console.log(`Seeded ${insertedPeople.length} people`);

    return {
      createTable,
      seededPeople: insertedPeople,
    };
  } catch (error) {
    console.error('Error seeding people:', error);
    throw error;
  }
}

(async () => {
  await seedPeople();
  // The script will exit automatically
})();
