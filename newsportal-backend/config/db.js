
const { PrismaClient } = require('@prisma/client');

// Initialize a single Prisma instance to share across the app
const prisma = new PrismaClient();

module.exports = prisma;