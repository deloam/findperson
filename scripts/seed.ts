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
    await db.sql`
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

    // Create the "telefones" table if it doesn't exist
    await db.sql`
      CREATE TABLE IF NOT EXISTS telefones (
          id SERIAL PRIMARY KEY,
          person_id INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
          numero VARCHAR(50) NOT NULL,
          tipo VARCHAR(50)
      );
    `;
    console.log(`Created "telefones" table`);

    // Create the "enderecos" table if it doesn't exist
    await db.sql`
      CREATE TABLE IF NOT EXISTS enderecos (
          id SERIAL PRIMARY KEY,
          person_id INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
          logradouro VARCHAR(255) NOT NULL,
          numero VARCHAR(50),
          bairro VARCHAR(255),
          cidade VARCHAR(255) NOT NULL,
          uf VARCHAR(2) NOT NULL,
          cep VARCHAR(10)
      );
    `;
    console.log(`Created "enderecos" table`);

    // Insert data into the "people" table and related tables
    for (const person of clientData) {
      const { rows: [insertedPerson] } = await db.sql`
        INSERT INTO people (nome, cpf, parentesco, mae, nascimento, profissao, "isPrincipal", downloaded)
        VALUES (${person.nome}, ${person.cpf}, ${person.parentesco}, ${person.mae}, ${person.nascimento}, ${person.profissao}, ${person.isPrincipal}, ${person.downloaded})
        ON CONFLICT (cpf) DO UPDATE SET
          nome = EXCLUDED.nome,
          parentesco = EXCLUDED.parentesco,
          mae = EXCLUDED.mae,
          nascimento = EXCLUDED.nascimento,
          profissao = EXCLUDED.profissao,
          "isPrincipal" = EXCLUDED."isPrincipal",
          downloaded = EXCLUDED.downloaded
        RETURNING id;
      `;
      const personId = insertedPerson.id;

      if (person.telefones && person.telefones.length > 0) {
        for (const telefone of person.telefones) {
          await db.sql`
            INSERT INTO telefones (person_id, numero, tipo)
            VALUES (${personId}, ${telefone.numero}, ${telefone.tipo});
          `;
        }
      }

      if (person.enderecos && person.enderecos.length > 0) {
        for (const endereco of person.enderecos) {
          await db.sql`
            INSERT INTO enderecos (person_id, logradouro, numero, bairro, cidade, uf, cep)
            VALUES (${personId}, ${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.uf}, ${endereco.cep});
          `;
        }
      }
    }

    console.log(`Seeded ${clientData.length} people and their related data.`);

    return {
      seededPeople: clientData.length,
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