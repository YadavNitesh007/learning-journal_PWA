import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, FolderOpen, ArrowRight, Code, Palette, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Weekly Reflections",
    description: "Document your learning journey with structured journal entries each week",
  },
  {
    icon: Code,
    title: "Project Showcase",
    description: "Display your technical projects with descriptions and live demos",
  },
  {
    icon: Palette,
    title: "PWA Experience",
    description: "Install the app on any device with offline support and native feel",
  },
  {
    icon: Zap,
    title: "Modern Stack",
    description: "Built with React, TypeScript, and progressive web technologies",
  },
];

export default function HomePage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <section className="flex-1 flex items-center justify-center py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <p 
            className="text-sm text-muted-foreground mb-4"
            data-testid="text-current-date"
          >
            {currentDate}
          </p>
          
          <h1 
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            Learning Journal
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            A progressive web application documenting my weekly reflections, projects, 
            and professional growth throughout the Mobile Application Development course.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/journal">
              <Button size="lg" className="gap-2 min-w-[160px]" data-testid="button-view-journal">
                <BookOpen className="w-5 h-5" />
                View Journal
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            
            <Link href="/projects">
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 min-w-[160px]"
                data-testid="button-see-projects"
              >
                <FolderOpen className="w-5 h-5" />
                See Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 
            className="font-serif text-2xl md:text-3xl font-semibold text-center mb-12"
            data-testid="text-features-title"
          >
            What This Journal Offers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="border-0 bg-card/50"
                  data-testid={`card-feature-${index}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">{feature.title}</h3>
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

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 
            className="font-serif text-2xl md:text-3xl font-semibold mb-6"
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
        </div>
      </section>
    </div>
  );
}
