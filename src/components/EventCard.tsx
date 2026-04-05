import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { EventRow } from "@/hooks/useEvents";
import { format } from "date-fns";

const categoryColors: Record<string, string> = {
  music: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  sports: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  education: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  technology: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  arts: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  food: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  community: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  other: "bg-secondary text-secondary-foreground",
};

const categoryEmoji: Record<string, string> = {
  music: "🎵",
  sports: "⚽",
  education: "📚",
  technology: "💻",
  arts: "🎨",
  food: "🍕",
  community: "🤝",
  other: "📌",
};

interface EventCardProps {
  event: EventRow;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link
        to={`/events/${event.id}`}
        className={`group block bg-card rounded-xl border border-border p-5 hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 ${isPast ? "opacity-60" : ""}`}
      >
        {/* Category & date header */}
        <div className="flex items-center justify-between mb-3">
          <Badge className={`text-[10px] font-semibold ${categoryColors[event.category] || categoryColors.other} border-0`}>
            {categoryEmoji[event.category]} {event.category}
          </Badge>
          {isPast && (
            <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Past</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {event.title}
        </h3>

        {/* Description preview */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            {format(eventDate, "MMM d, yyyy · h:mm a")}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {event.location}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
