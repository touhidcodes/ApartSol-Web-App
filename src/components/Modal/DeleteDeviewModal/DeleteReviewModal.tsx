"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { TReviewWithUser } from "@/types/Review";

interface DeleteReviewModalProps {
  open: boolean;
  review: TReviewWithUser | null;
  onClose: () => void;
  onConfirm: (reviewId: string) => void;
}

const DeleteReviewModal = ({
  open,
  review,
  onClose,
  onConfirm,
}: DeleteReviewModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    try {
      setLoading(true);
      if (review?.id) {
        onConfirm(review.id);
        onClose();
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to delete review.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Delete Review
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[300px] space-y-2 text-sm text-gray-700">
          <p>Are you sure you want to delete this review?</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              <strong>Property:</strong> {review?.property?.title}
            </li>
            <li>
              <strong>Rating:</strong> {review?.rating} stars
            </li>
            <li>
              <strong>Comment:</strong> {review?.comment}
            </li>
          </ul>
          <p className="text-red-500 font-medium">
            This action cannot be undone.
          </p>
        </div>

        <DialogFooter className="pt-4 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Yes, Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReviewModal;
