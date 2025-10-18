import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import { join } from "path";

const sqlite = new Database(join(process.cwd(), "local.db"));
const db = drizzle(sqlite);

async function main() {
  console.log("Running migrations...");
  migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migrations completed!");
  sqlite.close();
}

main().catch((err) => {
  console.error("Migration failed!", err);
  process.exit(1);
});


