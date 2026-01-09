import { type Reflection, type InsertReflection, type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getReflections(): Promise<Reflection[]>;
  getReflection(id: string): Promise<Reflection | undefined>;
  createReflection(reflection: InsertReflection): Promise<Reflection>;
  deleteReflection(id: string): Promise<boolean>;
  
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  deleteProject(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private reflections: Map<string, Reflection>;
  private projects: Map<string, Project>;

  constructor() {
    this.reflections = new Map();
    this.projects = new Map();
    
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    const sampleReflections: InsertReflection[] = [
      {
        name: "Student Developer",
        date: "Sat Jan 04 2025",
        reflection: "This week I learned about Progressive Web App technologies including service workers, caching strategies, and the manifest file. The most challenging part was understanding the lifecycle of a service worker and how to properly cache dynamic API responses. I solved this by implementing a network-first strategy for API calls with a fallback to cached data when offline.",
        week: 7,
      },
      {
        name: "Student Developer", 
        date: "Sat Dec 28 2024",
        reflection: "In Week 6, I focused on integrating Flask as a backend framework. I learned how to create API endpoints that serve JSON data and handle POST requests for new journal entries. The frontend-backend connection was challenging at first, but using fetch API with proper error handling made it manageable.",
        week: 6,
      },
      {
        name: "Student Developer",
        date: "Sat Dec 21 2024", 
        reflection: "Week 5 introduced me to Python for backend data management. I created scripts to read and write JSON files for storing reflections. Understanding the difference between file-based storage and browser storage was enlightening - file storage persists across all users and sessions.",
        week: 5,
      },
    ];

    sampleReflections.forEach((r) => {
      const id = randomUUID();
      this.reflections.set(id, { ...r, id });
    });
  }

  async getReflections(): Promise<Reflection[]> {
    return Array.from(this.reflections.values()).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  async getReflection(id: string): Promise<Reflection | undefined> {
    return this.reflections.get(id);
  }

  async createReflection(insertReflection: InsertReflection): Promise<Reflection> {
    const id = randomUUID();
    const date = new Date().toDateString();
    const reflection: Reflection = { 
      ...insertReflection, 
      id,
      date,
    };
    this.reflections.set(id, reflection);
    return reflection;
  }

  async deleteReflection(id: string): Promise<boolean> {
    return this.reflections.delete(id);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }
}

export const storage = new MemStorage();
