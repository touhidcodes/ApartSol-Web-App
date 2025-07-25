"use client";

import {
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/redux/api/reviewApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import DashboardReviewCardTable from "@/components/Table/DashboardReviewCardTable/DashboardReviewCardTable";
import { useMemo, useState } from "react";
import { TReview, TReviewWithUser } from "@/types/Review";
import UpdateReviewModal from "@/components/Modal/UpdateReviewModal/UpdateReviewModal";
import DeleteReviewModal from "@/components/Modal/DeleteDeviewModal/DeleteReviewModal";

const AdminReviewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUpdateReview, setSelectedUpdateReview] =
    useState<TReview | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteReview, setSelectedDeleteReview] =
    useState<TReviewWithUser | null>(null);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", itemsPerPage.toString());

    return params.toString();
  }, [currentPage, itemsPerPage]);

  const { data, isLoading } = useGetAllReviewsQuery(queryParams);
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const reviews = data?.data || [];
  const totalItems = data?.meta?.total ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const paginationData = {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    start,
    end,
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (value: number) => setItemsPerPage(value);

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

  const handleUpdateClick = (review: TReview) => {
    setSelectedUpdateReview(review);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUpdateReview(null);
  };

  const handleDeleteClick = (review: TReviewWithUser) => {
    setSelectedDeleteReview(review);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDeleteReview(null);
  };

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Reviews</h2>
        <div className="hidden md:block text-sm text-gray-600">
          Total Reviews: {totalItems}
        </div>
      </div>
      <DashboardReviewCardTable
        reviews={reviews}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
      />
      <UpdateReviewModal
        open={isUpdateModalOpen}
        review={selectedUpdateReview}
        onClose={handleCloseUpdateModal}
        onSave={handleUpdate}
      />
      <DeleteReviewModal
        open={isDeleteModalOpen}
        review={selectedDeleteReview}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminReviewsPage;
