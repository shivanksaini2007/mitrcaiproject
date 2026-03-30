import { Star } from "lucide-react";

const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < full
                ? "fill-star text-star"
                : i === full && hasHalf
                ? "fill-star/50 text-star"
                : "text-border fill-transparent"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating} ({reviews.toLocaleString()})
      </span>
    </div>
  );
};

export default StarRating;
