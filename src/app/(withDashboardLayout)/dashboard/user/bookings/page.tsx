"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Loader2 } from "lucide-react";
import { useGetUserBookingsQuery } from "@/redux/api/bookingApi";
import { TBooking } from "@/types/Bookings";
import { useMemo, useState } from "react";
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

export default function MyBookingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", itemsPerPage.toString());
    return params.toString();
  }, [currentPage, itemsPerPage]);

  const { data, isLoading } = useGetUserBookingsQuery(queryParams);

  const bookings = data?.data || [];
  const totalItems = data?.meta?.total ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (value: number) => setItemsPerPage(value);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Bookings</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => handleItemsPerPageChange(Number(value))}
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

      {bookings.length ? (
        <div className="grid w-full [&>div]:h-full [&>div]:border [&>div]:rounded">
          <Table>
            <TableHeader>
              <TableRow className="[&>*]:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0 z-10">
                <TableHead className="pl-6">Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((booking: TBooking) => (
                <TableRow
                  key={booking.id}
                  className="odd:bg-muted/50 [&>*]:whitespace-nowrap"
                >
                  <TableCell className="font-medium pl-6">
                    {booking?.property?.title}
                  </TableCell>
                  <TableCell>
                    {booking?.property?.city}, {booking?.property?.state},
                    {booking?.property?.country}
                  </TableCell>
                  <TableCell>{booking?.totalAmount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "PENDING" ? "destructive" : "default"
                      }
                      className={
                        booking.status === "PENDING"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.status === "PENDING" ? (
                      <Button asChild>
                        <Link href={`/checkout/${booking.id}`}>Pay</Link>
                      </Button>
                    ) : (
                      <Button disabled variant="outline">
                        Paid
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={`transition-all duration-200 ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50 cursor-not-allowed"
                          : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                      }`}
                    />
                  </PaginationItem>

                  <PaginationItem className="px-4 flex items-center text-sm text-gray-700">
                    Page
                    <span className="mx-1 font-semibold">{currentPage}</span>
                    of <span className="ml-1 font-semibold">{totalPages}</span>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (currentPage < totalPages)
                          handlePageChange(currentPage + 1);
                      }}
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
      ) : (
        <div className="text-center py-10 bg-slate-100 rounded-lg shadow-sm">
          <div className="flex justify-center mb-2">
            <CalendarCheck className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-muted-foreground">
            No Bookings Yet
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            You haven&apos;t booked any property yet.
          </p>
        </div>
      )}
    </div>
  );
}
