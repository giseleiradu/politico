import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};

const pool = new pg.Pool(config);
pool.on("connect", () => {
  console.log("Database connection successful");
});

const create = () => {
  const partiesTable = `CREATE TABLE IF NOT EXISTS
                  parties(
                    id SERIAL PRIMARY KEY,
                    pName VARCHAR(100) NOT NULL UNIQUE,
                    hdAddress VARCHAR(100) NOT NULL,
                    logoUrl VARCHAR(100) NOT NULL,
                    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updatedDate TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
                  )`;

  const officesTable = `CREATE TABLE IF NOT EXISTS
                  offices(
                    id SERIAL PRIMARY KEY,
                    oName NOT NULL,
                    type VARCHAR(100) UNIQUE NOT NULL,
                    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                  )`;
  const usersTable = `CREATE TABLE IF NOT EXISTS
                  users(
                    id SERIAL PRIMARY KEY,
                    firstName VARCHAR(100) UNIQUE NOT NULL,
                    lastName VARCHAR(100),
                    otherName VARCHAR(100),
                    email VARCHAR(100) UNIQUE NOT NULL,
                    phoneNumber VARCHAR(100) UNIQUE NOT NULL,
                    passportUrl VARCHAR(100) UNIQUE,
                    isAdmin BOOLEAN DEFULT false,
                    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                  )`;
  const candidatesTable = `CREATE TABLE IF NOT EXISTS
                  candidates(
                    id SERIAL PRIMARY KEY,
                    office VARCHAR(100) NOT NULL,
                    party VARCHAR(100) NOT NULL,
                    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                  )`;
  const votesTable = `CREATE TABLE IF NOT EXISTS
                  vote(
                    id SERIAL PRIMARY KEY,
                    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    createdBy VARCHAR(100) NOT NULL,
                    office VARCHAR(100) NOT NULL,
                    candidate INT NOT NULL
                  )`;
const petitionsTable = `CREATE TABLE IF NOT EXISTS
                petition(
                  id SERIAL PRIMARY KEY,
                  createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                  createdBy VARCHAR(100) NOT NULL,
                  office VARCHAR(100) NOT NULL,
                  candidate INT NOT NULL
                )`;
  pool
    .query(`${partiesTable}; ${petitionsTable}; ${votesTable}; ${candidatesTable}; ${usersTable}; `)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
  pool.on("remove", () => {
    console.log("Removed");
    process.exit(0);
  });
};
export { create, pool };
require("make-runnable");
