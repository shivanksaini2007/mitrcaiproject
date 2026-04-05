import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvent } from "@/hooks/useEvents";
import { format } from "date-fns";
import { motion } from "framer-motion";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: event, isLoading, error } = useEvent(id || "");

  if (isLoading) {
    return (
      <div className="container py-10 max-w-3xl">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-6 w-48 mb-8" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container py-20 text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">Event not found</h2>
        <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
        <Link to="/events" className="text-primary hover:underline text-sm font-medium">
          ← Back to Events
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();

  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Category badge */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="capitalize text-xs">
            <Tag className="w-3 h-3 mr-1" /> {event.category}
          </Badge>
          {isPast && (
            <Badge variant="outline" className="text-xs text-muted-foreground">Past Event</Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
          {event.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-8 border-b border-border pb-6">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            {format(eventDate, "EEEE, MMMM d, yyyy · h:mm a")}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            {event.location}
          </span>
        </div>

        {/* Description */}
        <div className="prose prose-sm max-w-none text-foreground/80">
          <h3 className="font-display text-lg text-foreground mb-3">About this event</h3>
          <p className="whitespace-pre-wrap leading-relaxed">{event.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetail;
