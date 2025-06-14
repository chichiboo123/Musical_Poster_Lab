import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const posters = pgTable("posters", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  elements: jsonb("elements").notNull(),
  background: jsonb("background").notNull(),
  performanceInfo: jsonb("performance_info"),
});

export const insertPosterSchema = createInsertSchema(posters).pick({
  title: true,
  elements: true,
  background: true,
  performanceInfo: true,
});

export type InsertPoster = z.infer<typeof insertPosterSchema>;
export type Poster = typeof posters.$inferSelect;

// Element types for the poster
export const PosterElementSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'emoji']),
  content: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  style: z.object({
    fontSize: z.number().optional(),
    color: z.string().optional(),
    rotation: z.number().optional(),
    direction: z.enum(['horizontal', 'vertical']).optional(),
    fontFamily: z.string().optional(),
  }),
  zIndex: z.number(),
});

export const BackgroundSchema = z.object({
  type: z.enum(['solid', 'gradient']),
  colors: z.array(z.string()),
  gradientDirection: z.enum(['to-r', 'to-l', 'to-t', 'to-b', 'to-tr', 'to-tl', 'to-br', 'to-bl']).optional(),
});

export const PerformanceInfoSchema = z.object({
  date: z.string().optional(),
  venue: z.string().optional(),
  cast: z.string().optional(),
  crew: z.string().optional(),
  production: z.string().optional(),
});

export type PosterElement = z.infer<typeof PosterElementSchema>;
export type Background = z.infer<typeof BackgroundSchema>;
export type PerformanceInfo = z.infer<typeof PerformanceInfoSchema>;
