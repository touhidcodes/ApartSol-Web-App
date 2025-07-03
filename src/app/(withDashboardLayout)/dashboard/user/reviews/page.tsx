"use client";

import { Container, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Loading from "@/components/Custom/Loading/Loading";
import {
  useDeleteReviewMutation,
  useGetUsersReviewsQuery,
  useUpdateReviewMutation,
} from "@/redux/api/reviewApi";
import ReviewCardTable from "@/components/Card/ReviewCardTable/ReviewCardTable";
import { Star } from "lucide-react";

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
      <div>
        <div className="text-center py-10 bg-slate-100 rounded-lg shadow-sm">
          <div className="flex justify-center mb-2">
            <Star className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-muted-foreground">
            No Bookings Yet
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            You haven’t booked any property yet.
          </p>
        </div>
      </div>
      <Typography variant="h4" component="h1" gutterBottom my={3}>
        My Posts
      </Typography>
      <ReviewCardTable
        reviews={reviews?.data}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default MyReviewsPage;
