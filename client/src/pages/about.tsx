import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, GraduationCap, Calendar, BookOpen, Code, Cpu, Database, Globe, Smartphone } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const skillCategories = [
  {
    name: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Python", "Flask", "REST APIs"],
  },
  {
    name: "Tools",
    skills: ["Git", "PWA", "Responsive Design"],
  },
];

const timeline = [
  {
    week: "Week 2",
    topic: "Frontend Fundamentals",
    description: "HTML & CSS structure, mobile-first design, responsive layouts",
    icon: Globe,
  },
  {
    week: "Week 3",
    topic: "JavaScript & DOM",
    description: "DOM manipulation, event handling, interactive features",
    icon: Code,
  },
  {
    week: "Week 4",
    topic: "Web APIs",
    description: "Storage API, Browser APIs, Third-party API integration",
    icon: Cpu,
  },
  {
    week: "Week 5",
    topic: "Python & JSON",
    description: "JSON data storage, Python scripting, data persistence",
    icon: Database,
  },
  {
    week: "Week 6",
    topic: "Frontend & Backend",
    description: "Flask backend, API routes, dynamic data fetching",
    icon: BookOpen,
  },
  {
    week: "Week 7",
    topic: "PWA Technologies",
    description: "Service workers, caching, offline support, installability",
    icon: Smartphone,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-14">
          <h1 
            className="font-serif text-3xl md:text-4xl font-bold mb-3"
            data-testid="text-about-title"
          >
            About Me
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Learn more about my background, skills, and journey through mobile application development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-4">
            <Card className="sticky top-24" data-testid="card-profile">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-primary/10">
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                      ST
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 
                    className="font-serif text-xl font-semibold mb-1"
                    data-testid="text-profile-name"
                  >
                    Student Developer
                  </h2>
                  
                  <p 
                    className="text-muted-foreground text-sm"
                    data-testid="text-profile-role"
                  >
                    BSc Computer Science
                  </p>
                </div>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                    <GraduationCap className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">School of Games and Creative Technology</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">University for the Creative Arts</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                    <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">FGCT6021 - Mobile App Development</span>
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline" 
                      size="icon"
                      data-testid="button-github-profile"
                    >
                      <SiGithub className="w-4 h-4" />
                    </Button>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline" 
                      size="icon"
                      data-testid="button-linkedin-profile"
                    >
                      <SiLinkedin className="w-4 h-4" />
                    </Button>
                  </a>
                  <a href="mailto:student@uca.ac.uk">
                    <Button 
                      variant="outline" 
                      size="icon"
                      data-testid="button-email"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <Card data-testid="card-bio">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">About This Project</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    This Learning Journal PWA is my personal documentation of the FGCT6021 Mobile 
                    Application Development course. It serves as both a technical showcase and a 
                    reflective journal tracking my progress throughout the term.
                  </p>
                  <p>
                    The application demonstrates the cumulative knowledge from Labs 2-7, combining 
                    frontend fundamentals with backend integration and progressive web app technologies. 
                    It features responsive design, offline capabilities, and dynamic data management.
                  </p>
                  <p>
                    Through weekly journal entries, I document what I've learned, challenges I've faced, 
                    and how I've grown as a developer. The projects section showcases practical 
                    applications of these skills.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-skills">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Technologies & Skills</h3>
                <div className="space-y-4">
                  {skillCategories.map((category) => (
                    <div key={category.name}>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        {category.name}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {category.skills.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="secondary"
                            className="font-normal"
                            data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card data-testid="card-timeline">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-6">Learning Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.week}
                    className="p-4 rounded-lg bg-muted/40 hover-elevate"
                    data-testid={`timeline-item-${index}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-primary">
                          {item.week}
                        </span>
                        <h4 className="font-medium text-sm mt-0.5 mb-1">{item.topic}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
