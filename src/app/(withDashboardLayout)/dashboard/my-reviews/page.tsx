"use client";

import { Container, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Loading from "@/components/UI/Loading/Loading";
import {
  useDeleteReviewMutation,
  useGetUsersReviewsQuery,
  useUpdateReviewMutation,
} from "@/redux/api/reviewApi";
import ReviewCardTable from "@/components/Card/ReviewCardTable/ReviewCardTable";

const MyReviewsPage = () => {
  const { data: reviews, isLoading } = useGetUsersReviewsQuery({});
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
      console.log(err);
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
        My Posts
      </Typography>
      <ReviewCardTable
        reviews={reviews}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default MyReviewsPage;
