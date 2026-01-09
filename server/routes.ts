import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReflectionSchema, insertProjectSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/reflections", async (req, res) => {
    try {
      const reflections = await storage.getReflections();
      res.json(reflections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reflections" });
    }
  });

  app.get("/api/reflections/:id", async (req, res) => {
    try {
      const reflection = await storage.getReflection(req.params.id);
      if (!reflection) {
        return res.status(404).json({ error: "Reflection not found" });
      }
      res.json(reflection);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reflection" });
    }
  });

  app.post("/api/reflections", async (req, res) => {
    try {
      const parseResult = insertReflectionSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ 
          error: "Invalid reflection data", 
          details: parseResult.error.issues 
        });
      }
      
      const reflection = await storage.createReflection(parseResult.data);
      res.status(201).json(reflection);
    } catch (error) {
      res.status(500).json({ error: "Failed to create reflection" });
    }
  });

  app.delete("/api/reflections/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteReflection(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Reflection not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete reflection" });
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const parseResult = insertProjectSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ 
          error: "Invalid project data", 
          details: parseResult.error.issues 
        });
      }
      
      const project = await storage.createProject(parseResult.data);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  return httpServer;
}
