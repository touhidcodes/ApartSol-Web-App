"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Star, MoreHorizontal, Home } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TReview, TReviewWithUser } from "@/types/Review";
import { TPaginationData } from "@/types";
import DashboardTableSkeleton from "@/components/Skeleton/DashboardTableSkeleton/DashboardTableSkeleton";
import { truncateText } from "@/lib/utils";

interface ReviewCardTableProps {
  reviews: TReviewWithUser[];
  isLoading: boolean;
  onUpdateClick: (review: TReview) => void;
  onDeleteClick: (review: TReviewWithUser) => void;
  paginationData: TPaginationData;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const DashboardReviewCardTable = ({
  reviews,
  isLoading,
  paginationData,
  onPageChange,
  onItemsPerPageChange,
  onUpdateClick,
  onDeleteClick,
}: ReviewCardTableProps) => {
  const { currentPage, totalPages, totalItems, itemsPerPage, start, end } =
    paginationData;

  if (isLoading) {
    return <DashboardTableSkeleton />;
  }
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {start} to {end} of {totalItems} reviews
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
      </div>

      {/* Table */}
      <div className="grid w-full [&>div]:h-full [&>div]:border [&>div]:rounded">
        {reviews.length ? (
          <Table>
            <TableHeader>
              <TableRow className="[&>*]:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0 z-10">
                <TableHead className="pl-6">Property Name</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-center">Comment</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow
                  key={review.id}
                  className="odd:bg-muted/50 [&>*]:whitespace-nowrap"
                >
                  <TableCell className="pl-6">
                    {review?.property?.title || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">{review.rating}</TableCell>
                  <TableCell className="text-center max-w-[250px] truncate">
                    {truncateText(review.comment, 50)}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-accent/40 transition"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-44 bg-background border border-border rounded-md shadow-xl animate-in fade-in-0 zoom-in-95"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => onUpdateClick(review)}
                          className="hover:bg-indigo-600 hover:text-white transition-colors px-3 py-2 cursor-pointer text-sm flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" />
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteClick(review)}
                          className="hover:bg-red-600 hover:text-white transition-colors px-3 py-2 cursor-pointer text-sm flex items-center gap-2"
                        >
                          <Trash className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 bg-slate-100 rounded-lg shadow-sm">
            <div className="flex justify-center mb-2">
              <Home className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">
              No Reviews Found
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You haven't reviewed any listings yet.
            </p>
          </div>
        )}
      </div>

      {/* Update Modal
      <UpdateReviewModal
        open={isUpdateModalOpen}
        review={selectedReview}
        onClose={() => setUpdateModalOpen(false)}
        onSave={handleSaveUpdatedReview}
      />

      {/* Delete Dialog */}
      {/* <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && onPageChange(currentPage - 1)
                  }
                  className={`transition-all duration-200 ${
                    currentPage === 1
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                  }`}
                />
              </PaginationItem>
              <PaginationItem className="px-4 flex items-center text-sm text-gray-700">
                Page <span className="mx-1 font-semibold">{currentPage}</span>{" "}
                of <span className="ml-1 font-semibold">{totalPages}</span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                  }
                  className={`transition-all duration-200 ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DashboardReviewCardTable;
