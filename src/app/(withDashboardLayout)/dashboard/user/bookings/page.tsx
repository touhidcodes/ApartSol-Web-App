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

export default function MyBookingsPage() {
  const { data: bookings, isLoading } = useGetUserBookingsQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Bookings</h2>
      </div>

      {bookings?.data?.length ? (
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
              {bookings?.data?.map((booking: TBooking) => (
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
