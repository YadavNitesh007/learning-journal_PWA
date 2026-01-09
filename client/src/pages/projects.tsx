import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FolderOpen } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-16 w-full mb-4" />
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Learning Journal PWA",
    description: "A progressive web application for documenting weekly learning reflections. Features include offline support, installability, dynamic data fetching, and responsive design.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "PWA", "Node.js"],
    githubUrl: "https://github.com",
    liveUrl: "/",
    imageUrl: null,
  },
  {
    id: "2",
    title: "Mobile-First Portfolio",
    description: "A responsive portfolio website built with mobile-first design principles. Showcases projects and professional experience with smooth animations.",
    technologies: ["HTML", "CSS", "JavaScript", "Flexbox", "Grid"],
    githubUrl: "https://github.com",
    liveUrl: null,
    imageUrl: null,
  },
  {
    id: "3",
    title: "API Integration Demo",
    description: "Demonstrates integration with multiple APIs including Storage API, Geolocation API, and third-party services. Features local storage persistence and dynamic content.",
    technologies: ["JavaScript", "LocalStorage", "Fetch API", "DOM"],
    githubUrl: "https://github.com",
    liveUrl: null,
    imageUrl: null,
  },
  {
    id: "4",
    title: "Flask Backend Service",
    description: "A Python Flask backend that handles JSON data persistence, API routing, and serves as the data layer for the Learning Journal PWA.",
    technologies: ["Python", "Flask", "JSON", "REST API"],
    githubUrl: "https://github.com",
    liveUrl: null,
    imageUrl: null,
  },
];

export default function ProjectsPage() {
  const { data: apiProjects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const projects = apiProjects && apiProjects.length > 0 ? apiProjects : defaultProjects;

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-8 md:mb-12">
          <h1 
            className="font-serif text-3xl md:text-4xl font-bold mb-3"
            data-testid="text-projects-title"
          >
            Projects
          </h1>
          <p 
            className="text-muted-foreground max-w-2xl leading-relaxed"
            data-testid="text-projects-description"
          >
            A collection of projects developed throughout the Mobile Application Development 
            course. Each project demonstrates different technologies and concepts learned during 
            the term.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="container-projects"
        >
          {isLoading ? (
            <>
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </>
          ) : (
            projects.map((project) => (
              <Card 
                key={project.id} 
                className="flex flex-col"
                data-testid={`card-project-${project.id}`}
              >
                {project.imageUrl && (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!project.imageUrl && (
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <FolderOpen className="w-12 h-12 text-primary/40" />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="text-lg"
                    data-testid={`text-project-title-${project.id}`}
                  >
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p 
                    className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1"
                    data-testid={`text-project-description-${project.id}`}
                  >
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          data-testid={`button-github-${project.id}`}
                        >
                          <SiGithub className="w-4 h-4" />
                          Code
                        </Button>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          data-testid={`button-live-${project.id}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
