import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "./db/client";
import { restaurants } from "./db/schema";
import { eq, like, sql } from "drizzle-orm";

const app = new Hono();

// Enable CORS for frontend
app.use("/*", cors());

app.get("/", (c) => {
  return c.json({ message: "Restaurant Delivery API", version: "1.0.0" });
});

app.get("/api/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get all restaurants
app.get("/api/restaurants", async (c) => {
  try {
    const cuisineType = c.req.query("cuisineType");
    const search = c.req.query("search");

    let query = db.select().from(restaurants);

    // Filter by cuisine type if provided
    if (cuisineType && cuisineType !== "All") {
      const allRestaurants = await db
        .select()
        .from(restaurants)
        .where(eq(restaurants.cuisineType, cuisineType));
      return c.json(allRestaurants);
    }

    // Search by name if provided
    if (search) {
      const allRestaurants = await db
        .select()
        .from(restaurants)
        .where(like(restaurants.name, `%${search}%`));
      return c.json(allRestaurants);
    }

    const allRestaurants = await db.select().from(restaurants);
    return c.json(allRestaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return c.json({ error: "Failed to fetch restaurants" }, 500);
  }
});

// Get a single restaurant by ID
app.get("/api/restaurants/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const restaurant = await db
      .select()
      .from(restaurants)
      .where(eq(restaurants.id, id))
      .limit(1);

    if (restaurant.length === 0) {
      return c.json({ error: "Restaurant not found" }, 404);
    }

    return c.json(restaurant[0]);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return c.json({ error: "Failed to fetch restaurant" }, 500);
  }
});

// Get unique cuisine types
app.get("/api/cuisine-types", async (c) => {
  try {
    const cuisineTypes = await db
      .selectDistinct({ cuisineType: restaurants.cuisineType })
      .from(restaurants);
    return c.json(cuisineTypes.map((ct) => ct.cuisineType));
  } catch (error) {
    console.error("Error fetching cuisine types:", error);
    return c.json({ error: "Failed to fetch cuisine types" }, 500);
  }
});

const port = process.env.PORT || 3001;
console.log(`Server is running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
