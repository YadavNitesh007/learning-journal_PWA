import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FolderOpen, 
  ArrowRight, 
  Code, 
  Sparkles, 
  Zap, 
  Layers,
  CheckCircle2,
  Globe,
  Database,
  Smartphone,
  Palette,
  Server,
  Wifi
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Reflection } from "@shared/schema";

const features = [
  {
    icon: BookOpen,
    title: "Weekly Reflections",
    description: "Document your learning journey with structured journal entries",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
  {
    icon: Code,
    title: "Project Showcase",
    description: "Display technical projects with descriptions and demos",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Sparkles,
    title: "PWA Experience",
    description: "Install on any device with offline support",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Layers,
    title: "Modern Stack",
    description: "Built with React, TypeScript, and web technologies",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
];

const labRequirements = [
  {
    lab: "Lab 2",
    title: "Frontend Fundamentals",
    description: "HTML5, CSS3, responsive mobile-first design",
    icon: Palette,
    features: ["Semantic HTML", "Flexbox/Grid layouts", "Mobile responsive"],
    status: "complete"
  },
  {
    lab: "Lab 3",
    title: "JavaScript & DOM",
    description: "Interactive features and event handling",
    icon: Code,
    features: ["DOM manipulation", "Event listeners", "Dynamic content"],
    status: "complete"
  },
  {
    lab: "Lab 4",
    title: "Web APIs",
    description: "Browser APIs and data persistence",
    icon: Database,
    features: ["LocalStorage API", "Fetch API", "Third-party APIs"],
    status: "complete"
  },
  {
    lab: "Lab 5",
    title: "Data & JSON",
    description: "Structured data handling and storage",
    icon: Server,
    features: ["JSON data format", "Data persistence", "CRUD operations"],
    status: "complete"
  },
  {
    lab: "Lab 6",
    title: "Backend Integration",
    description: "Server-side API and database",
    icon: Globe,
    features: ["Express.js server", "RESTful API", "Backend storage"],
    status: "complete"
  },
  {
    lab: "Lab 7",
    title: "PWA Technologies",
    description: "Progressive web app features",
    icon: Smartphone,
    features: ["Service Worker", "Offline support", "App installable"],
    status: "complete"
  },
];

export default function HomePage() {
  const { data: reflections } = useQuery<Reflection[]>({
    queryKey: ["/api/reflections"],
  });

  const latestReflection = reflections?.[0];
  const reflectionCount = reflections?.length || 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <section className="flex-1 flex items-center py-12 md:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
                data-testid="badge-course"
              >
                <Zap className="w-3.5 h-3.5" />
                FGCT6021 Mobile App Development
              </div>
              
              <h1 
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[1.1] tracking-tight"
                data-testid="text-hero-title"
              >
                Learning
                <span className="block bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">Journal</span>
              </h1>

              <p 
                className="text-sm font-semibold text-primary mb-5 flex items-center gap-2"
                data-testid="text-student-info"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Nitesh Kumar Yadav • Student ID: 2313244
              </p>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed"
                data-testid="text-hero-subtitle"
              >
                A comprehensive progressive web application documenting weekly reflections, 
                projects, and professional growth — demonstrating all Labs 2-7 requirements.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/journal">
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" data-testid="button-view-journal">
                    <BookOpen className="w-5 h-5" />
                    View Journal
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                
                <Link href="/projects">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2"
                    data-testid="button-see-projects"
                  >
                    <FolderOpen className="w-5 h-5" />
                    See Projects
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border/50">
                <div className="text-center" data-testid="stat-entries">
                  <p className="text-2xl font-bold text-primary">{reflectionCount}</p>
                  <p className="text-xs text-muted-foreground">Journal Entries</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center" data-testid="stat-labs">
                  <p className="text-2xl font-bold text-primary">6</p>
                  <p className="text-xs text-muted-foreground">Labs Completed</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="flex items-center gap-2" data-testid="stat-pwa">
                  <Wifi className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold">PWA Ready</p>
                    <p className="text-xs text-muted-foreground">Offline Support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              {latestReflection ? (
                <Card className="relative overflow-visible shadow-xl shadow-black/5" data-testid="card-latest-reflection">
                  <div className="absolute -top-3 left-6 px-4 py-1.5 bg-gradient-to-r from-primary to-violet-500 text-primary-foreground text-xs font-semibold rounded-full shadow-lg" data-testid="badge-latest-entry">
                    Latest Entry
                  </div>
                  <CardContent className="p-6 pt-8">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="font-semibold text-lg">{latestReflection.name}</span>
                      {latestReflection.week && (
                        <Badge variant="secondary" className="rounded-full">
                          Week {latestReflection.week}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed line-clamp-4 mb-5">
                      {latestReflection.reflection}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
                      <span>{latestReflection.date}</span>
                      <span className="font-medium text-primary">{reflectionCount} total entries</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Start Your Journey</h3>
                    <p className="text-muted-foreground text-sm">
                      Add your first reflection to begin documenting your learning
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30" data-testid="section-labs">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" />
              All Requirements Met
            </Badge>
            <h2 
              className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
              data-testid="text-labs-title"
            >
              Labs 2-7 Compliance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This application demonstrates comprehensive coverage of all course requirements, 
              from frontend fundamentals to advanced PWA technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="container-labs">
            {labRequirements.map((lab, index) => {
              const Icon = lab.icon;
              return (
                <Card 
                  key={lab.lab} 
                  className="relative overflow-hidden hover-elevate group"
                  data-testid={`card-lab-${index + 2}`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-violet-500" />
                  <CardContent className="p-5 pl-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                            {lab.lab}
                          </span>
                          <h3 className="font-semibold">{lab.title}</h3>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {lab.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {lab.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs font-normal">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 
              className="font-serif text-2xl md:text-3xl font-semibold mb-3"
              data-testid="text-features-title"
            >
              Application Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete solution for documenting your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" data-testid="container-features">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="border-0 bg-card/60 hover-elevate"
                  data-testid={`card-feature-${index}`}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid={`text-feature-title-${index}`}>{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-b from-transparent to-muted/30">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <Card className="border-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 shadow-xl shadow-primary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <Badge variant="outline" className="mb-6">About This Project</Badge>
              <h2 
                className="font-serif text-2xl md:text-3xl font-bold mb-5"
                data-testid="text-about-section-title"
              >
                Built for FGCT6021
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Learning Journal PWA was created as part of the Mobile Application 
                Development course at University for the Creative Arts. It combines 
                knowledge from Labs 2-7, featuring HTML/CSS fundamentals, JavaScript 
                DOM manipulation, Storage APIs, Backend integration, and PWA technologies.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The application demonstrates responsive design, offline capabilities, 
                dynamic data handling, and modern web development practices.
              </p>
              <Link href="/about">
                <Button variant="outline" className="gap-2">
                  Learn More About Me
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
