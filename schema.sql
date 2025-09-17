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

CREATE TABLE telefones (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
    numero VARCHAR(50) NOT NULL,
    tipo VARCHAR(50)
);

CREATE TABLE enderecos (
    id SERIAL PRIMARY KEY,
    person_id INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(50),
    bairro VARCHAR(255),
    cidade VARCHAR(255) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    cep VARCHAR(10)
);