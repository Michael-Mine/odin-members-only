#! /usr/bin/env node

const { argv } = require("node:process");
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ) NOT NULL,
  last_name VARCHAR ( 255 ) NOT NULL,
  username VARCHAR ( 255 ) NOT NULL UNIQUE,
  password VARCHAR ( 255 ) NOT NULL,
  member BOOLEAN DEFAULT false,
  admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS user_posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ) NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMP WITH TIME ZONE,
  user INTEGER REFERENCES users
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
