import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type EventCategory = "music" | "sports" | "education" | "technology" | "arts" | "food" | "community" | "other";

export interface EventRow {
  id: string;
  title: string;
  date: string;
  location: string;
  category: EventCategory;
  description: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type EventInsert = Omit<EventRow, "id" | "created_at" | "updated_at">;
export type EventUpdate = Partial<EventInsert>;

const CATEGORIES: EventCategory[] = ["music", "sports", "education", "technology", "arts", "food", "community", "other"];

// Fetch all events
export function useEvents(category?: EventCategory | "all", search?: string) {
  return useQuery({
    queryKey: ["events", category, search],
    queryFn: async () => {
      let query = supabase.from("events").select("*").order("date", { ascending: true });

      if (category && category !== "all") {
        query = query.eq("category", category);
      }
      if (search?.trim()) {
        query = query.ilike("title", `%${search.trim()}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as EventRow[];
    },
  });
}

// Fetch single event
export function useEvent(id: string) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
      if (error) throw error;
      return data as EventRow;
    },
    enabled: !!id,
  });
}

// Create event
export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (event: EventInsert) => {
      const { data, error } = await supabase.from("events").insert(event).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

// Update event
export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: EventUpdate & { id: string }) => {
      const { data, error } = await supabase.from("events").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

// Delete event
export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export { CATEGORIES };
