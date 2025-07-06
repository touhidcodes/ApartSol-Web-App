"use client";

import { Box, Container, Typography } from "@mui/material";
import ReviewCardTable from "@/components/Card/ReviewCardTable/ReviewCardTable";
import {
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/redux/api/reviewApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Loading from "@/components/Custom/Loading/Loading";

const AllReviewsPage = () => {
  const { data: reviews, isLoading } = useGetAllReviewsQuery({});
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const handleUpdate = async (updatedReview: FieldValues, reviewId: string) => {
    try {
      const reviewData = {
        reviewId,
        data: updatedReview,
      };

      const res = await updateReview(reviewData);

      if (res?.data?.id) {
        toast.success("Review updated successfully!");
      }
    } catch (err) {
      console.error("Failed to update review", err);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      const res = await deleteReview(reviewId);
      if (res?.data?.id) {
        toast.success("Review deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{ paddingBottom: "50px" }}>
      <Typography variant="h4" component="h1" gutterBottom my={3}>
        All Reviews
      </Typography>
      <ReviewCardTable
        reviews={reviews?.data}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default AllReviewsPage;
