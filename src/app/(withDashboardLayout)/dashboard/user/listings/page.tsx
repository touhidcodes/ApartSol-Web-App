"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Loader2, Pencil, Trash, Home } from "lucide-react";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  useDeletePropertyMutation,
  useGetMyPropertiesQuery,
  useUpdatePropertyMutation,
} from "@/redux/api/propertiesApi";

const MyPostsPage = () => {
  const { data: properties, isLoading } = useGetMyPropertiesQuery({});
  const [updateFlat] = useUpdatePropertyMutation();
  const [deleteFlat] = useDeletePropertyMutation();
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleUpdate = async (
    updatedProperty: FieldValues,
    propertyId: string
  ) => {
    try {
      const propertyData = {
        ...updatedProperty,
        squareFeet: Number(updatedProperty?.squareFeet),
        totalBedrooms: Number(updatedProperty?.totalBedrooms),
        totalRooms: Number(updatedProperty?.totalRooms),
        rent: Number(updatedProperty?.rent),
        advanceAmount: Number(updatedProperty?.advanceAmount),
      };

      const res = await updateFlat({ propertyId, propertyData });
      if (res?.data?.id) {
        toast.success("Flat updated successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (propertyId: string) => {
    try {
      const res = await deleteFlat(propertyId);
      if (res?.data?.id) {
        toast.success("Flat deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete property", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-2">
      <div className="flex justify-between items-center px-6">
        <h2 className="text-xl font-semibold">My Listings</h2>
      </div>

      <div className="grid w-full [&>div]:h-full [&>div]:border [&>div]:rounded">
        {properties?.data?.length ? (
          <Table>
            <TableHeader>
              <TableRow className="[&>*]:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0 z-10">
                <TableHead className="pl-6">Title</TableHead>
                <TableHead className="text-center">Location</TableHead>
                <TableHead className="text-center">Rent</TableHead>
                <TableHead className="text-center">Availability</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {properties?.data?.map((property: any) => (
                <TableRow
                  key={property.id}
                  className="odd:bg-muted/50 [&>*]:whitespace-nowrap"
                >
                  <TableCell className="font-medium pl-6">
                    {property.title}
                  </TableCell>
                  <TableCell className="text-center">
                    <div>
                      <span>{property?.city || "N/A"},</span>
                      <span> {property?.state || "N/A"},</span>
                      <span> {property?.country || "N/A"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    $ {property.rent}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        property.availability ? "default" : "destructive"
                      }
                      className={
                        property.availability
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : ""
                      }
                    >
                      {property.availability ? "Yes" : "No"}
                    </Badge>
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
                          onClick={() => handleUpdate(property, property.id)}
                          className="hover:bg-indigo-600 hover:text-white transition-colors px-3 py-2 cursor-pointer text-sm flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" />
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(property.id)}
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
              No Listings Found
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You haven&apos;t posted any listings yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostsPage;
