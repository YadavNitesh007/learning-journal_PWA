import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, GraduationCap, Calendar, BookOpen, Code, Cpu, Database, Globe, Smartphone, User, Award, Target } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const skillCategories = [
  {
    name: "Frontend Development",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
  },
  {
    name: "Backend & APIs",
    skills: ["Node.js", "Express", "REST APIs", "JSON", "Python", "Flask"],
  },
  {
    name: "Tools & Technologies",
    skills: ["Git", "PWA", "Responsive Design", "Vite", "npm"],
  },
];

const timeline = [
  {
    week: "Week 2",
    topic: "Frontend Fundamentals",
    description: "HTML5 semantic structure, CSS3 styling, mobile-first responsive design with Flexbox and Grid",
    icon: Globe,
    color: "from-violet-500 to-purple-600",
  },
  {
    week: "Week 3",
    topic: "JavaScript & DOM",
    description: "DOM manipulation, event handling, interactive UI components and dynamic content updates",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    week: "Week 4",
    topic: "Web APIs",
    description: "LocalStorage API, Fetch API, browser APIs integration, and third-party service connections",
    icon: Cpu,
    color: "from-emerald-500 to-teal-500",
  },
  {
    week: "Week 5",
    topic: "Data & JSON",
    description: "JSON data structures, data persistence patterns, and structured data management",
    icon: Database,
    color: "from-amber-500 to-orange-500",
  },
  {
    week: "Week 6",
    topic: "Backend Integration",
    description: "Express.js server setup, RESTful API routes, and full-stack data flow architecture",
    icon: BookOpen,
    color: "from-rose-500 to-pink-500",
  },
  {
    week: "Week 7",
    topic: "PWA Technologies",
    description: "Service workers, caching strategies, offline support, and app installability features",
    icon: Smartphone,
    color: "from-indigo-500 to-violet-500",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-14">
          <Badge variant="outline" className="mb-4">
            <User className="w-3.5 h-3.5 mr-2" />
            Student Profile
          </Badge>
          <h1 
            className="font-serif text-3xl md:text-4xl font-bold mb-3"
            data-testid="text-about-title"
          >
            About Me
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Learn more about my background, skills, and journey through the Mobile Application Development course.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-4">
            <Card className="sticky top-24 shadow-xl shadow-primary/5" data-testid="card-profile">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-28 h-28 ring-4 ring-primary/20 shadow-xl">
                      <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary via-violet-500 to-purple-600 text-white">
                        NK
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center ring-4 ring-background">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h2 
                    className="font-serif text-2xl font-bold mb-1"
                    data-testid="text-profile-name"
                  >
                    Nitesh Kumar Yadav
                  </h2>
                  
                  <p 
                    className="text-primary font-semibold mb-1"
                    data-testid="text-student-number"
                  >
                    Student ID: 2313244
                  </p>
                  
                  <p 
                    className="text-muted-foreground"
                    data-testid="text-profile-role"
                  >
                    BSc Computer Science
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">School of Games and Creative Technology</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">University for the Creative Arts</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">FGCT6021 - Mobile App Development</span>
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
            <Card className="shadow-lg shadow-black/5" data-testid="card-bio">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">About This Project</h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    This Learning Journal PWA is my comprehensive documentation of the FGCT6021 Mobile 
                    Application Development course. It serves as both a technical showcase and a 
                    reflective journal, demonstrating the cumulative knowledge acquired from Labs 2-7.
                  </p>
                  <p>
                    The application combines frontend fundamentals with backend integration and progressive 
                    web app technologies. It features responsive design that works seamlessly across all 
                    devices, offline capabilities through service workers, and dynamic data management 
                    with a Node.js/Express backend.
                  </p>
                  <p>
                    Through weekly journal entries, I document my learning experiences, challenges faced, 
                    and professional growth as a developer. The projects section showcases practical 
                    applications of the skills developed throughout the course.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg shadow-black/5" data-testid="card-skills">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Technologies & Skills</h3>
                </div>
                <div className="space-y-5">
                  {skillCategories.map((category) => (
                    <div key={category.name}>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2.5">
                        {category.name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="secondary"
                            className="font-medium"
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

        <Card className="shadow-xl shadow-primary/5" data-testid="card-timeline">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Learning Timeline</h3>
                <p className="text-sm text-muted-foreground">Labs 2-7 Progression</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.week}
                    className="p-5 rounded-xl bg-muted/40 hover-elevate group"
                    data-testid={`timeline-item-${index}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-primary uppercase tracking-wide">
                          {item.week}
                        </span>
                        <h4 className="font-semibold mt-0.5 mb-1.5">{item.topic}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
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
