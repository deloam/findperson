-- This script creates the table for storing people's data.
-- You should run this query in your Vercel Postgres database dashboard.

CREATE TABLE people (
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
