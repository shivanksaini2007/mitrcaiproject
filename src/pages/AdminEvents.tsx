import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent, CATEGORIES, type EventRow, type EventCategory } from "@/hooks/useEvents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Event form state type
interface EventFormState {
  title: string;
  date: string;
  location: string;
  category: EventCategory;
  description: string;
}

const emptyForm: EventFormState = {
  title: "",
  date: "",
  location: "",
  category: "other",
  description: "",
};

const AdminEvents = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: events, isLoading } = useEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventFormState>(emptyForm);

  // Filter to user's own events
  const myEvents = events?.filter((e) => e.created_by === user?.id) || [];

  if (authLoading) {
    return <div className="container py-20 text-center text-muted-foreground">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="container py-20 text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">Sign in required</h2>
        <p className="text-muted-foreground mb-6">You need to be logged in to manage events.</p>
        <Link to="/auth">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (event: EventRow) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      date: new Date(event.date).toISOString().slice(0, 16),
      location: event.location,
      category: event.category,
      description: event.description,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingId) {
        await updateEvent.mutateAsync({
          id: editingId,
          title: form.title,
          date: new Date(form.date).toISOString(),
          location: form.location,
          category: form.category,
          description: form.description,
        });
        toast.success("Event updated!");
      } else {
        await createEvent.mutateAsync({
          title: form.title,
          date: new Date(form.date).toISOString(),
          location: form.location,
          category: form.category,
          description: form.description,
          created_by: user.id,
        });
        toast.success("Event created!");
      }
      setDialogOpen(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    try {
      await deleteEvent.mutateAsync(id);
      toast.success("Event deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const setField = (field: keyof EventFormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground">My Events</h1>
            <p className="text-muted-foreground text-sm mt-1">Create and manage your community events</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate} className="gap-1.5">
                <Plus className="w-4 h-4" /> New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  {editingId ? "Edit Event" : "Create Event"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Title *</label>
                  <Input value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="Event title" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Date & Time *</label>
                  <Input type="datetime-local" value={form.date} onChange={(e) => setField("date", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Location *</label>
                  <Input value={form.location} onChange={(e) => setField("location", e.target.value)} placeholder="Event location" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setField("category", e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="capitalize">{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder="Tell people about this event..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit" disabled={createEvent.isPending || updateEvent.isPending} className="flex-1">
                    {createEvent.isPending || updateEvent.isPending ? "Saving..." : editingId ? "Save Changes" : "Create Event"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        )}

        {/* Events list */}
        {!isLoading && myEvents.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground mb-4">You haven't created any events yet.</p>
            <Button onClick={openCreate} variant="outline" className="gap-1.5">
              <Plus className="w-4 h-4" /> Create Your First Event
            </Button>
          </div>
        )}

        {!isLoading && myEvents.length > 0 && (
          <div className="space-y-3">
            {myEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[10px] capitalize">{event.category}</Badge>
                  </div>
                  <h3 className="font-medium text-foreground truncate">{event.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {format(new Date(event.date), "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(event)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminEvents;
