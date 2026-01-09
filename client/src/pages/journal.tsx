import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Loader2, Send, RotateCcw, Calendar, User, Trash2, Search } from "lucide-react";
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
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  );
}

export default function JournalPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterWeek, setFilterWeek] = useState<string>("all");

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const form = useForm<ReflectionFormValues>({
    resolver: zodResolver(reflectionFormSchema),
    defaultValues: {
      name: "",
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
      form.reset();
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

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 
            className="font-serif text-3xl md:text-4xl font-bold mb-2"
            data-testid="text-journal-title"
          >
            Weekly Journal
          </h1>
          <p 
            className="text-muted-foreground"
            data-testid="text-current-date"
          >
            {currentDate}
          </p>
        </div>

        <Card className="mb-8" data-testid="card-reflection-form">
          <CardHeader>
            <CardTitle className="text-xl">New Reflection</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
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
                        <FormLabel>Week (Optional)</FormLabel>
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
                      <FormLabel>Reflection</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What did you learn this week? What did you find challenging? What would you do differently?"
                          rows={6}
                          className="resize-none"
                          {...field}
                          data-testid="textarea-reflection"
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum 50 characters (about 10 words)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap gap-3">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending}
                    className="gap-2"
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
                    onClick={() => form.reset()}
                    className="gap-2"
                    data-testid="button-reset-form"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h2 className="font-serif text-2xl font-semibold">
              Previous Reflections
              <span 
                className="text-muted-foreground text-lg font-normal ml-2"
                data-testid="text-reflection-count"
              >
                ({reflectionCount})
              </span>
            </h2>
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
              <SelectTrigger className="w-full sm:w-[140px]" data-testid="select-filter-week">
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
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground" data-testid="text-no-reflections">
                  {searchQuery || filterWeek !== "all" 
                    ? "No reflections match your search criteria."
                    : "No reflections yet. Submit your first entry above!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredReflections.map((reflection) => (
              <Card key={reflection.id} data-testid={`card-reflection-${reflection.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold" data-testid={`text-name-${reflection.id}`}>
                          {reflection.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span data-testid={`text-date-${reflection.id}`}>{reflection.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {reflection.week && (
                        <span 
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium"
                          data-testid={`badge-week-${reflection.id}`}
                        >
                          Week {reflection.week}
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(reflection.id)}
                        disabled={deleteMutation.isPending}
                        className="text-muted-foreground hover:text-destructive"
                        data-testid={`button-delete-${reflection.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p 
                    className="text-foreground leading-relaxed whitespace-pre-wrap"
                    data-testid={`text-reflection-${reflection.id}`}
                  >
                    {reflection.reflection}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
