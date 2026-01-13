import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { BookOpen, FolderOpen, ArrowRight, Code, Sparkles, Zap, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

export default function HomePage() {
  const { data: reflections } = useQuery<Reflection[]>({
    queryKey: ["/api/reflections"],
  });

  const latestReflection = reflections?.[0];
  const reflectionCount = reflections?.length || 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <section className="flex-1 flex items-center py-16 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
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
                <span className="block text-primary">Journal</span>
              </h1>

              <p 
                className="text-sm font-medium text-primary/80 mb-4"
                data-testid="text-student-info"
              >
                By Nitesh Kumar Yadav • Student ID: 2313244
              </p>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed"
                data-testid="text-hero-subtitle"
              >
                A progressive web application documenting weekly reflections, projects, 
                and professional growth throughout the course.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/journal">
                  <Button size="lg" className="gap-2" data-testid="button-view-journal">
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
            </div>

            <div className="hidden lg:block">
              {latestReflection ? (
                <Card className="relative overflow-visible" data-testid="card-latest-reflection">
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full" data-testid="badge-latest-entry">
                    Latest Entry
                  </div>
                  <CardContent className="p-6 pt-8">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="font-semibold">{latestReflection.name}</span>
                      {latestReflection.week && (
                        <span className="text-xs bg-secondary px-2 py-1 rounded-md">
                          Week {latestReflection.week}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4 mb-4">
                      {latestReflection.reflection}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{latestReflection.date}</span>
                      <span>{reflectionCount} total entries</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-12 h-12 text-primary/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Start your journey by adding your first reflection
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 
              className="font-serif text-2xl md:text-3xl font-semibold mb-3"
              data-testid="text-features-title"
            >
              What This Journal Offers
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
                    <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-5 h-5 text-foreground" />
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

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <Card className="border-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
            <CardContent className="p-8 md:p-10 text-center">
              <h2 
                className="font-serif text-2xl md:text-3xl font-semibold mb-4"
                data-testid="text-about-section-title"
              >
                About This Project
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Learning Journal PWA was created as part of the FGCT6021 Mobile Application 
                Development course. It combines knowledge from Labs 2-7, featuring HTML/CSS 
                fundamentals, JavaScript DOM manipulation, Storage APIs, Flask backend integration, 
                and PWA technologies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The application demonstrates responsive design, offline capabilities, 
                dynamic data handling, and modern web development practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
