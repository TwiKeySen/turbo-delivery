import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { join } from "path";

const sqlite = new Database(join(process.cwd(), "local.db"));
export const db = drizzle(sqlite, { schema });


