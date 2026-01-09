import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FolderOpen, Code2, Layers, Globe, Server } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/10] bg-muted" />
      <CardContent className="p-5">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-14 w-full mb-4" />
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

const projectGradients = [
  { from: "from-violet-500/20", to: "to-purple-600/10", icon: Code2 },
  { from: "from-blue-500/20", to: "to-cyan-500/10", icon: Globe },
  { from: "from-emerald-500/20", to: "to-teal-500/10", icon: Layers },
  { from: "from-amber-500/20", to: "to-orange-500/10", icon: Server },
];

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
        <div className="mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <FolderOpen className="w-3.5 h-3.5" />
            {projects.length} Projects
          </div>
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
            course. Each project demonstrates different technologies and concepts.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
            projects.map((project, index) => {
              const gradient = projectGradients[index % projectGradients.length];
              const GradientIcon = gradient.icon;
              
              return (
                <Card 
                  key={project.id} 
                  className="flex flex-col overflow-hidden group hover-elevate"
                  data-testid={`card-project-${project.id}`}
                >
                  {project.imageUrl ? (
                    <div className="aspect-[16/10] bg-muted overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className={`aspect-[16/10] bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.2),transparent_50%)]" />
                      <GradientIcon className="w-16 h-16 text-foreground/20" />
                    </div>
                  )}
                  <CardContent className="flex-1 flex flex-col p-5">
                    <h2 
                      className="font-semibold text-lg mb-2"
                      data-testid={`text-project-title-${project.id}`}
                    >
                      {project.title}
                    </h2>
                    <p 
                      className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1"
                      data-testid={`text-project-description-${project.id}`}
                    >
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-border">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button 
                            variant="ghost" 
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
                            variant="ghost" 
                            size="sm" 
                            className="gap-2"
                            data-testid={`button-live-${project.id}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
