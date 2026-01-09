import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reflections = pgTable("reflections", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  date: text("date").notNull(),
  reflection: text("reflection").notNull(),
  week: integer("week"),
});

export const insertReflectionSchema = createInsertSchema(reflections).omit({
  id: true,
  date: true,
});

export type InsertReflection = z.infer<typeof insertReflectionSchema>;
export type Reflection = typeof reflections.$inferSelect;

export const projects = pgTable("projects", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array().notNull(),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  imageUrl: text("image_url"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
