import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const posters = pgTable("posters", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  elements: jsonb("elements").notNull(),
  background: jsonb("background").notNull(),
  performanceInfo: jsonb("performance_info").notNull().default({}),
});

export const insertPosterSchema = createInsertSchema(posters).pick({
  title: true,
  elements: true,
  background: true,
  performanceInfo: true,
});

export type InsertPoster = z.infer<typeof insertPosterSchema>;
export type Poster = typeof posters.$inferSelect;

export interface PerformanceInfo {
  date?: string;
  time?: string;
  venue?: string;
  cast?: string;
  crew?: string;
  production?: string;
}

export interface ElementStyle {
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  textShadow?: string;
  direction?: 'horizontal' | 'vertical';
  rotation?: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface PosterElement {
  id: string;
  type: 'text' | 'emoji' | 'image';
  content: string;
  position: Position;
  style: ElementStyle;
  zIndex: number;
}

export interface SolidBackground {
  type: 'solid';
  colors: [string] | [string, string];
  gradientDirection?: string;
}

export interface ImageBackground {
  type: 'image';
  url: string;
  opacity?: number;
}

export type Background = SolidBackground | ImageBackground;