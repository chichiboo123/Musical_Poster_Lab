import { posters, type Poster, type InsertPoster } from "@shared/schema";

export interface IStorage {
  getPoster(id: number): Promise<Poster | undefined>;
  createPoster(poster: InsertPoster): Promise<Poster>;
  updatePoster(id: number, poster: Partial<InsertPoster>): Promise<Poster | undefined>;
  deletePoster(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private posters: Map<number, Poster>;
  private currentId: number;

  constructor() {
    this.posters = new Map();
    this.currentId = 1;
  }

  async getPoster(id: number): Promise<Poster | undefined> {
    return this.posters.get(id);
  }

  async createPoster(insertPoster: InsertPoster): Promise<Poster> {
    const id = this.currentId++;
    const poster: Poster = { 
      ...insertPoster, 
      id,
      performanceInfo: insertPoster.performanceInfo || {}
    };
    this.posters.set(id, poster);
    return poster;
  }

  async updatePoster(id: number, updateData: Partial<InsertPoster>): Promise<Poster | undefined> {
    const existing = this.posters.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.posters.set(id, updated);
    return updated;
  }

  async deletePoster(id: number): Promise<boolean> {
    return this.posters.delete(id);
  }
}

export const storage = new MemStorage();
