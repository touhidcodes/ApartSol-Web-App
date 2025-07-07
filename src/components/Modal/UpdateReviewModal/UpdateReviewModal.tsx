"use client";

import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";
import FormTextarea from "@/components/Forms/FormTextarea";
import { TReview } from "@/types/Review";
import FormSelect from "@/components/Forms/FormSelect";

interface TUpdateReviewModalProps {
  open: boolean;
  review: TReview | null;
  onClose: () => void;
  onSave: (updatedReview: FieldValues, reviewId: string) => void;
}

const UpdateReviewModal = ({
  open,
  review,
  onClose,
  onSave,
}: TUpdateReviewModalProps) => {
  const [loading, setLoading] = useState(false);
  const [updatedReview, setUpdatedReview] = useState<TReview | null>(review);

  useEffect(() => {
    setUpdatedReview(review);
  }, [review]);

  const handleUpdateReview = async (values: FieldValues) => {
    if (!review) return;
    try {
      setLoading(true);
      onSave(values, review.id);
      toast.success("Review updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Update Review</DialogTitle>
        </DialogHeader>

        <div className="p-1 overflow-y-auto max-h-[75vh] pr-2">
          <FormContainer
            onSubmit={handleUpdateReview}
            defaultValues={{
              name: updatedReview?.name || "",
              email: updatedReview?.email || "",
              comment: updatedReview?.comment || "",
              rating: updatedReview?.rating?.toString() || "",
            }}
          >
            <div className="grid grid-cols-1 gap-6">
              <FormInput
                label="Reviewer Name"
                name="name"
                placeholder="John Doe"
                required
              />
              <FormInput
                label="Reviewer Email"
                name="email"
                placeholder="someone@example.com"
                required
              />
              <FormSelect
                label="Property Type"
                name="propertyType"
                placeholder="Select type"
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                ]}
                required
              />
              <FormTextarea
                label="Comment"
                name="comment"
                placeholder="Share your experience..."
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-[#1C2D37] text-white hover:bg-[#2a3f4a]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Update Review"
                )}
              </Button>
            </div>
          </FormContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReviewModal;
