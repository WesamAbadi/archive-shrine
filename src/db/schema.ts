import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    profileImage: text("profile_image"),
    bio: text("bio"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const arifacts = pgTable("arifacts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    url: text("url").notNull(),
    userId: integer("user_id").references(() => users.id),
    type: text("type").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    views: integer("views").notNull().default(0),
    likes: integer("likes").notNull().default(0),
    originalUrl: text("original_url"),
    originalDate: timestamp("original_date"),
    originalTitle: text("original_title"),
    originalAuthor: text("original_author"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// export const comments = pgTable("comments", {
//     id: serial("id").primaryKey(),
//     content: text("content").notNull(),
//     userId: integer("user_id").references(() => users.id),
//     arifactId: integer("arifact_id").references(() => arifacts.id),
//     createdAt: timestamp("created_at").notNull().defaultNow(),
//     updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });
