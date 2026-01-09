import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, GraduationCap, Calendar } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const skills = [
  "HTML5", "CSS3", "JavaScript", "TypeScript",
  "React", "Node.js", "Python", "Flask",
  "REST APIs", "PWA", "Git", "Responsive Design"
];

const timeline = [
  {
    week: "Week 2",
    topic: "Frontend Fundamentals",
    description: "HTML & CSS structure, mobile-first design, responsive layouts",
  },
  {
    week: "Week 3",
    topic: "JavaScript & DOM",
    description: "DOM manipulation, event handling, interactive features",
  },
  {
    week: "Week 4",
    topic: "Web APIs",
    description: "Storage API, Browser APIs, Third-party API integration",
  },
  {
    week: "Week 5",
    topic: "Python & JSON",
    description: "JSON data storage, Python scripting, data persistence",
  },
  {
    week: "Week 6",
    topic: "Frontend & Backend",
    description: "Flask backend, API routes, dynamic data fetching",
  },
  {
    week: "Week 7",
    topic: "PWA Technologies",
    description: "Service workers, caching, offline support, installability",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-8 md:mb-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-1" data-testid="card-profile">
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
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
                className="text-muted-foreground mb-4"
                data-testid="text-profile-role"
              >
                BSc Computer Science
              </p>

              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center justify-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>School of Games and Creative Technology</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>University for the Creative Arts</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>FGCT6021 - Mobile App Development</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
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
                    <SiGithub className="w-5 h-5" />
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
                    <SiLinkedin className="w-5 h-5" />
                  </Button>
                </a>
                <a href="mailto:student@uca.ac.uk">
                  <Button 
                    variant="outline" 
                    size="icon"
                    data-testid="button-email"
                  >
                    <Mail className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card data-testid="card-bio">
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-semibold mb-4">About This Project</h3>
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
                <h3 className="font-serif text-lg font-semibold mb-4">Technologies & Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card data-testid="card-timeline">
          <CardContent className="p-6">
            <h3 className="font-serif text-xl font-semibold mb-6">Learning Timeline</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div 
                    key={item.week} 
                    className="relative pl-10"
                    data-testid={`timeline-item-${index}`}
                  >
                    <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                    <div>
                      <span className="text-xs font-medium text-primary uppercase tracking-wide">
                        {item.week}
                      </span>
                      <h4 className="font-medium mt-1">{item.topic}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
