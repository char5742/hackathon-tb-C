// const sqlite3 = require("sqlite3");
// const db = new sqlite3.Database("./db/mydb.db");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
module.exports = prisma;
