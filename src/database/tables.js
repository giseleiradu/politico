import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new pg.Pool({connectionString: process.env.DATABASE_URL});
pool.on('connect', () => {
  console.log('Database connection successful');
});

const create = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
                  users(
                    id SERIAL PRIMARY KEY,
                    "firstName" VARCHAR(100) UNIQUE NOT NULL,
                    "lastName" VARCHAR(100),
                    "otherName" VARCHAR(100),
                    email VARCHAR(100) UNIQUE NOT NULL,
                    "phoneNumber" VARCHAR(100) UNIQUE NOT NULL,
                    "passportUrl" VARCHAR(100) UNIQUE,
                    password TEXT NOT NULL,
                    "isAdmin" BOOLEAN DEFAULT false
                  )`;
  const partiesTable = `CREATE TABLE IF NOT EXISTS
                  parties(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL UNIQUE,
                    "hdAddress" VARCHAR(100) NOT NULL,
                    "logoUrl" VARCHAR(100) NOT NULL
                  )`;

  const officesTable = `CREATE TABLE IF NOT EXISTS
                  offices(
                    id SERIAL PRIMARY KEY,
                    type VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL
                  )`;
  const candidatesTable = `CREATE TABLE IF NOT EXISTS
                  candidates(
                    id SERIAL PRIMARY KEY,
                    "officeid" INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    "partyid" INT NOT NULL REFERENCES parties(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    "candidateid" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
                  )`;
  const votesTable = `CREATE TABLE IF NOT EXISTS
                  vote(
                    id SERIAL PRIMARY KEY,
                    "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "createdBy" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    "officeId" INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    "candidateId" INT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE ON UPDATE CASCADE
                  )`;
  const petitionsTable = `CREATE TABLE IF NOT EXISTS
                petition(
                  id SERIAL PRIMARY KEY,
                  "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                  "createdBy" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                  "officeId" INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE ON UPDATE CASCADE,
                  body TEXT NOT NULL
                )`;
  pool
    .query(`${usersTable}; ${partiesTable}; ${officesTable}; ${candidatesTable}; ${votesTable}; ${petitionsTable}`)
    .then((res) => {
      console.log("then ",res);
      pool.end();
    })
    .catch((err) => {
      console.log("catch ",err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('Removed');
    process.exit(0);
  });
};
export { create, pool };
require('make-runnable');
