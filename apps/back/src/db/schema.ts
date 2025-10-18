import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";

export const restaurants = sqliteTable("restaurants", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  cuisineType: text("cuisine_type").notNull(),
  priceRange: text("price_range").notNull(),
  rating: real("rating").notNull(),
  deliveryFee: real("delivery_fee").notNull(),
  deliveryTime: integer("delivery_time").notNull(), // in minutes
  imageUrl: text("image_url").notNull(),
  phoneNumber: text("phone_number").notNull(),
  website: text("website").notNull(),
  distance: real("distance").notNull(), // in km
});

export type Restaurant = typeof restaurants.$inferSelect;
export type NewRestaurant = typeof restaurants.$inferInsert;


