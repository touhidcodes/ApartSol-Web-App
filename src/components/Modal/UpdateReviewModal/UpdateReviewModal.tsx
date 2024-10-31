import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import PHInput from "@/components/Forms/PHInput";
import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TReview } from "@/types/Review";

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
  const [updatedReview, setUpdatedReview] = useState<TReview | null>(review);

  // Set review data when the modal opens
  useEffect(() => {
    setUpdatedReview(review);
  }, [review]);

  // Handle form submission to pass the updated review to the parent component
  const handleUpdateReview = async (values: FieldValues) => {
    if (review) {
      onSave(values, review.id);
      toast.success("Review updated successfully!");
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        <Box
          m={5}
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 5,
            textAlign: "center",
            background: "#EBF0F4",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" mb={3}>
            Update Review
          </Typography>
          <PHForm
            onSubmit={handleUpdateReview}
            defaultValues={{
              rating: updatedReview?.rating || "",
              comment: updatedReview?.comment || "",
            }}
          >
            <Stack spacing={4} my={1} marginBottom={5}>
              <PHInput name="rating" type="text" fullWidth={true} />
              <PHInput name="comment" type="text" fullWidth={true} />
            </Stack>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
              spacing={5}
            >
              <Button fullWidth={true} type="submit">
                Submit
              </Button>
              <Button fullWidth={true} onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </PHForm>
        </Box>
      </Stack>
    </Modal>
  );
};

export default UpdateReviewModal;
