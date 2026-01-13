import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FolderOpen, Code2, Layers, Globe, Server, Rocket, CheckCircle2 } from "lucide-react";
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
  { from: "from-violet-500", to: "to-purple-600", icon: Code2, light: "from-violet-500/20 to-purple-600/10" },
  { from: "from-blue-500", to: "to-cyan-500", icon: Globe, light: "from-blue-500/20 to-cyan-500/10" },
  { from: "from-emerald-500", to: "to-teal-500", icon: Layers, light: "from-emerald-500/20 to-teal-500/10" },
  { from: "from-amber-500", to: "to-orange-500", icon: Server, light: "from-amber-500/20 to-orange-500/10" },
];

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Learning Journal PWA",
    description: "A comprehensive progressive web application for documenting weekly learning reflections. Features offline support, app installability, dynamic data fetching with backend API, and responsive mobile-first design.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "PWA", "Node.js", "Express"],
    githubUrl: "https://github.com",
    liveUrl: "/",
    imageUrl: null,
  },
  {
    id: "2",
    title: "Mobile-First Portfolio",
    description: "A responsive portfolio website built with mobile-first design principles. Showcases projects and professional experience with smooth CSS animations and modern layout techniques.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Flexbox", "CSS Grid", "Responsive"],
    githubUrl: "https://github.com",
    liveUrl: null,
    imageUrl: null,
  },
  {
    id: "3",
    title: "Web APIs Demo Application",
    description: "Demonstrates integration with multiple browser APIs including LocalStorage, Fetch API, and Geolocation. Features persistent data storage and dynamic content loading from external sources.",
    technologies: ["JavaScript", "LocalStorage", "Fetch API", "DOM", "JSON"],
    githubUrl: "https://github.com",
    liveUrl: null,
    imageUrl: null,
  },
  {
    id: "4",
    title: "Express Backend Service",
    description: "A Node.js/Express backend that provides RESTful API endpoints for the Learning Journal. Handles JSON data persistence, CRUD operations, and serves as the data layer for the PWA.",
    technologies: ["Node.js", "Express", "REST API", "JSON", "TypeScript"],
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
        <div className="mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">
            <Rocket className="w-3.5 h-3.5 mr-2" />
            Lab 5 & 6: Data Handling & Backend Integration
          </Badge>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 
                className="font-serif text-3xl md:text-4xl font-bold mb-3"
                data-testid="text-projects-title"
              >
                Project Portfolio
              </h1>
              <p 
                className="text-lg text-muted-foreground max-w-2xl"
                data-testid="text-projects-description"
              >
                A collection of projects developed throughout the Mobile Application Development 
                course, demonstrating progressive mastery of web technologies.
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">{projects.length} Projects</span>
            </div>
          </div>
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
                  className="flex flex-col overflow-hidden group hover-elevate shadow-lg shadow-black/5"
                  data-testid={`card-project-${project.id}`}
                >
                  {project.imageUrl ? (
                    <div className="aspect-[16/10] bg-muted overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className={`aspect-[16/10] bg-gradient-to-br ${gradient.light} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.3),transparent_50%)]" />
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center shadow-xl`}>
                        <GradientIcon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  )}
                  <CardContent className="flex-1 flex flex-col p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2 
                        className="font-semibold text-xl"
                        data-testid={`text-project-title-${project.id}`}
                      >
                        {project.title}
                      </h2>
                      {index === 0 && (
                        <Badge className="shrink-0 bg-primary/10 text-primary border-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p 
                      className="text-muted-foreground mb-5 leading-relaxed flex-1"
                      data-testid={`text-project-description-${project.id}`}
                    >
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-5">
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

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
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
                            View Code
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
              );
            })
          )}
        </div>

        <Card className="mt-12 border-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5">
          <CardContent className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FolderOpen className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">More Projects Coming Soon</h3>
                <p className="text-muted-foreground">
                  As the course progresses, additional projects will be added to showcase 
                  continued learning and skill development in mobile and web technologies.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
