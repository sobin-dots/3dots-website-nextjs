// const { PrismaClient } = require("./generated-client");
// const { PrismaPg } = require("@prisma/adapter-pg");
// const { Pool } = require("pg");
// require("dotenv").config(); // Load .env file

// const connectionString = process.env.DATABASE_URL;

// if (!connectionString) {
//   console.error("Error: DATABASE_URL is not defined in .env file");
//   process.exit(1);
// }

// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);
// const prisma = new PrismaClient({ adapter });

// async function main() {
//   const adminEmail = "admin@3dots.co";
//   const adminPassword = "admin123";

//   console.log("Seeding database...");

//   const user = await prisma.user.upsert({
//     where: { email: adminEmail },
//     update: {},
//     create: {
//       email: adminEmail,
//       password: adminPassword, // Note: In production, always hash passwords!
//       name: "Super Admin",
//       role: "Admin",
//     },
//   });

//   console.log(`Successfully created/verified admin user: ${user.email}`);
//   console.log(`Email: ${adminEmail}`);
//   console.log(`Password: ${adminPassword}`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await pool.end();
//     await prisma.$disconnect();
//   });
