import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, Send, RotateCcw, Calendar, User, Trash2, Search, FileText, TrendingUp, PenLine, BookOpen } from "lucide-react";
import type { Reflection } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const reflectionFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  reflection: z.string().min(50, "Reflection must be at least 50 characters (about 10 words)"),
  week: z.number().min(1).max(14).optional(),
});

type ReflectionFormValues = z.infer<typeof reflectionFormSchema>;

function JournalEntrySkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-1.5 bg-muted shrink-0" />
        <CardContent className="p-5 flex-1">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </div>
    </Card>
  );
}

function StatsCard({ icon: Icon, label, value, color, testId }: { icon: typeof FileText; label: string; value: string | number; color: string; testId: string }) {
  return (
    <Card className="overflow-hidden" data-testid={testId}>
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-3xl font-bold leading-none mb-1" data-testid={`${testId}-value`}>{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function JournalPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterWeek, setFilterWeek] = useState<string>("all");

  const form = useForm<ReflectionFormValues>({
    resolver: zodResolver(reflectionFormSchema),
    defaultValues: {
      name: "Nitesh Kumar Yadav",
      reflection: "",
      week: undefined,
    },
  });

  const { data: reflections, isLoading } = useQuery<Reflection[]>({
    queryKey: ["/api/reflections"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: ReflectionFormValues) => {
      const response = await apiRequest("POST", "/api/reflections", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reflections"] });
      form.reset({ name: "Nitesh Kumar Yadav", reflection: "", week: undefined });
      toast({
        title: "Reflection submitted",
        description: "Your journal entry has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save your reflection. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/reflections/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reflections"] });
      toast({
        title: "Reflection deleted",
        description: "Your journal entry has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the reflection.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReflectionFormValues) => {
    createMutation.mutate(data);
  };

  const filteredReflections = reflections?.filter((r) => {
    const matchesSearch = 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reflection.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWeek = filterWeek === "all" || r.week?.toString() === filterWeek;
    return matchesSearch && matchesWeek;
  }) || [];

  const reflectionCount = reflections?.length || 0;
  const uniqueWeeks = new Set(reflections?.map(r => r.week).filter(Boolean)).size;
  const avgWordsPerEntry = reflectionCount > 0 
    ? Math.round((reflections?.reduce((acc, r) => acc + r.reflection.split(/\s+/).length, 0) || 0) / reflectionCount)
    : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <Badge variant="outline" className="mb-4">
            <BookOpen className="w-3.5 h-3.5 mr-2" />
            Lab 3 & 4: DOM Manipulation & Web APIs
          </Badge>
          <h1 
            className="font-serif text-3xl md:text-4xl font-bold mb-3"
            data-testid="text-journal-title"
          >
            Weekly Journal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Document your learning journey, track progress, and reflect on your growth throughout the course.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10" data-testid="container-stats">
          <StatsCard 
            icon={FileText} 
            label="Total Entries" 
            value={reflectionCount} 
            color="bg-gradient-to-br from-primary to-violet-600"
            testId="stat-total-entries" 
          />
          <StatsCard 
            icon={Calendar} 
            label="Weeks Covered" 
            value={uniqueWeeks} 
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
            testId="stat-weeks-covered" 
          />
          <StatsCard 
            icon={TrendingUp} 
            label="Avg. Words" 
            value={avgWordsPerEntry} 
            color="bg-gradient-to-br from-emerald-500 to-teal-500"
            testId="stat-avg-words" 
          />
        </div>

        <Card className="mb-10 shadow-lg shadow-primary/5 border-primary/10" data-testid="card-reflection-form">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <PenLine className="w-5 h-5 text-primary" />
              </div>
              New Reflection
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your name" 
                            {...field} 
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="week"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Week Number</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-week">
                              <SelectValue placeholder="Select week" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 14 }, (_, i) => i + 1).map((week) => (
                              <SelectItem key={week} value={week.toString()}>
                                Week {week}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="reflection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Reflection</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What did you learn this week? What challenges did you face? What would you do differently? How has this contributed to your professional growth?"
                          rows={6}
                          className="resize-none"
                          {...field}
                          data-testid="textarea-reflection"
                        />
                      </FormControl>
                      <FormDescription>
                        Write at least 50 characters (about 10 words) reflecting on your learning experience.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending}
                    className="gap-2 shadow-lg shadow-primary/25"
                    data-testid="button-submit-reflection"
                  >
                    {createMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Submit Reflection
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset({ name: "Nitesh Kumar Yadav", reflection: "", week: undefined })}
                    className="gap-2"
                    data-testid="button-reset-form"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Form
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <h2 className="font-serif text-2xl font-semibold">
              Previous Reflections
            </h2>
            <Badge variant="secondary" data-testid="text-reflection-count">
              {filteredReflections.length} of {reflectionCount} entries
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reflections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            <Select value={filterWeek} onValueChange={setFilterWeek}>
              <SelectTrigger className="w-full sm:w-[160px]" data-testid="select-filter-week">
                <SelectValue placeholder="Filter by week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Weeks</SelectItem>
                {Array.from({ length: 14 }, (_, i) => i + 1).map((week) => (
                  <SelectItem key={week} value={week.toString()}>
                    Week {week}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4" data-testid="container-reflections">
          {isLoading ? (
            <>
              <JournalEntrySkeleton />
              <JournalEntrySkeleton />
              <JournalEntrySkeleton />
            </>
          ) : filteredReflections.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Reflections Yet</h3>
                <p className="text-muted-foreground max-w-sm mx-auto" data-testid="text-no-reflections">
                  {searchQuery || filterWeek !== "all" 
                    ? "No reflections match your search criteria. Try adjusting your filters."
                    : "Start documenting your learning journey by submitting your first reflection above."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredReflections.map((reflection) => (
              <Card 
                key={reflection.id} 
                className="overflow-hidden group hover-elevate"
                data-testid={`card-reflection-${reflection.id}`}
              >
                <div className="flex">
                  <div className="w-1.5 bg-gradient-to-b from-primary to-violet-500 shrink-0" />
                  <CardContent className="p-5 flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <User className="w-4 h-4 text-primary" />
                          <span className="font-semibold" data-testid={`text-name-${reflection.id}`}>
                            {reflection.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span data-testid={`text-date-${reflection.id}`}>{reflection.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {reflection.week && (
                          <Badge 
                            variant="secondary"
                            className="rounded-full"
                            data-testid={`badge-week-${reflection.id}`}
                          >
                            Week {reflection.week}
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMutation.mutate(reflection.id)}
                          disabled={deleteMutation.isPending}
                          className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                          data-testid={`button-delete-${reflection.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p 
                      className="text-foreground/90 leading-relaxed whitespace-pre-wrap"
                      data-testid={`text-reflection-${reflection.id}`}
                    >
                      {reflection.reflection}
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
