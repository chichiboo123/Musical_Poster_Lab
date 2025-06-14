import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPosterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get poster by ID
  app.get("/api/posters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const poster = await storage.getPoster(id);
      
      if (!poster) {
        return res.status(404).json({ message: "Poster not found" });
      }
      
      res.json(poster);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create new poster
  app.post("/api/posters", async (req, res) => {
    try {
      const validatedData = insertPosterSchema.parse(req.body);
      const poster = await storage.createPoster(validatedData);
      res.status(201).json(poster);
    } catch (error) {
      res.status(400).json({ message: "Invalid poster data" });
    }
  });

  // Update poster
  app.patch("/api/posters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = insertPosterSchema.partial().parse(req.body);
      const poster = await storage.updatePoster(id, updateData);
      
      if (!poster) {
        return res.status(404).json({ message: "Poster not found" });
      }
      
      res.json(poster);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  // Delete poster
  app.delete("/api/posters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePoster(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Poster not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
