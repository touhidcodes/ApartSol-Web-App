// components/ReviewCardTable.tsx

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import UpdateReviewModal from "@/components/Modal/UpdateReviewModal/UpdateReviewModal";
import { TReview } from "@/types/Review";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1F2544",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type TReviewCardProps = {
  reviews: TReview[];
  handleUpdate: (review: FieldValues, reviewId: string) => void;
  handleDelete: (reviewId: string) => void;
};

const ReviewCardTable = ({
  reviews,
  handleUpdate,
  handleDelete,
}: TReviewCardProps) => {
  const [selectedReview, setSelectedReview] = useState<TReview | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<string | null>(null);

  // Edit button & set selected review data
  const handleEditClick = (review: TReview) => {
    setSelectedReview(review);
    setUpdateModalOpen(true);
  };

  // Close update modal
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedReview(null);
  };

  // Pass updated values to the parent component
  const handleSaveUpdatedReview = (
    updatedReview: FieldValues,
    reviewId: string
  ) => {
    handleUpdate(updatedReview, reviewId);
    setUpdateModalOpen(false);
    setSelectedReview(null);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (reviewId: string) => {
    setReviewIdToDelete(reviewId);
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setReviewIdToDelete(null);
  };

  // Handle delete action
  const handleConfirmDelete = () => {
    if (reviewIdToDelete) {
      handleDelete(reviewIdToDelete);
      setDeleteDialogOpen(false);
      setReviewIdToDelete(null);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Flat Name</StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Rating</StyledTableCell>
              <StyledTableCell align="right">Comment</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review: TReview) => (
              <StyledTableRow key={review.id}>
                <StyledTableCell component="th" scope="row">
                  <Typography>{review?.flat?.title}</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {review?.flat?.location}
                </StyledTableCell>
                <StyledTableCell align="right">{review.rating}</StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(review.comment).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleEditClick(review)}>Edit</Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleDeleteClick(review?.id)}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Update review modal */}
      <UpdateReviewModal
        open={isUpdateModalOpen}
        review={selectedReview}
        onClose={handleCloseUpdateModal}
        onSave={handleSaveUpdatedReview}
      />
      {/* Delete review confirmation dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this review? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewCardTable;
