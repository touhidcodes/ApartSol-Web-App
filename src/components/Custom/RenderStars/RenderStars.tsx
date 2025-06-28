import { Star } from "lucide-react";

export const RenderStars = (ratingStr: string) => {
  const rating = Math.min(Math.max(parseInt(ratingStr), 0), 5);
  const maxStars = 5;

  const filledStars = Array.from({ length: rating }, (_, i) => (
    <Star
      key={`filled-${i}`}
      className="w-4 h-4 text-yellow-500 fill-yellow-500"
    />
  ));

  const emptyStars = Array.from({ length: maxStars - rating }, (_, i) => (
    <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
  ));

  return [...filledStars, ...emptyStars];
};
