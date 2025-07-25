"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Search } from "lucide-react";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import {
  useDeletePropertyMutation,
  useGetUserPropertiesQuery,
  useUpdatePropertyMutation,
} from "@/redux/api/propertiesApi";
import DashboardPropertiesTable from "@/components/Table/DashboardPropertiesTable/DashboardPropertiesTable";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelect";
import DashboardSearchBarSkeleton from "@/components/Skeleton/DashboardSearchBarSkeleton/DashboardSearchBarSkeleton";

import { TProperty } from "@/types/Property";
import UpdatePropertyModal from "@/components/Modal/UpdatePropertyModal/UpdatePropertyModal";
import DeletePropertyModal from "@/components/Modal/DeletePropertyModal/DeletePropertyModal";

interface FilterFormValues {
  searchTerm: string;
  availability: string;
  sortBy: string;
}

const defaultValues: FilterFormValues = {
  searchTerm: "",
  availability: "all",
  sortBy: "newest",
};

const availabilityOptions = [
  { label: "All Status", value: "all" },
  { label: "Available", value: "true" },
  { label: "Not Available", value: "false" },
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Highest Rent", value: "rent-high" },
  { label: "Lowest Rent", value: "rent-low" },
  { label: "Title A-Z", value: "title-az" },
  { label: "Title Z-A", value: "title-za" },
];

const UserPropertyListingsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FieldValues>(defaultValues);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUpdateProperty, setSelectedUpdateProperty] =
    useState<TProperty | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteProperty, setSelectedDeleteProperty] =
    useState<TProperty | null>(null);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", itemsPerPage.toString());

    if (filters.searchTerm) params.set("searchTerm", filters.searchTerm);
    if (filters.availability !== "all")
      params.set("availability", filters.availability);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);

    return params.toString();
  }, [currentPage, itemsPerPage, filters]);

  const { data, isLoading } = useGetUserPropertiesQuery(queryParams);
  const [updateProperty] = useUpdatePropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();

  const properties = data?.data || [];
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

  const handleSubmitSearch = (values: FieldValues) => {
    setFilters(values);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setFilters(defaultValues);
    setItemsPerPage(10);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (value: number) => setItemsPerPage(value);

  const handleUpdate = async (
    updatedProperty: FieldValues,
    propertyId: string
  ) => {
    try {
      const propertyData = {
        ...updatedProperty,
        squareFeet: Number(updatedProperty.squareFeet),
        totalBedrooms: Number(updatedProperty.totalBedrooms),
        totalRooms: Number(updatedProperty.totalRooms),
        rent: Number(updatedProperty.rent),
        advanceAmount: Number(updatedProperty.advanceAmount),
      };

      const res = await updateProperty({ propertyId, propertyData });
      if (res?.data?.id) toast.success("Property updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (propertyId: string) => {
    try {
      const res = await deleteProperty(propertyId);
      if (res?.data?.id) toast.success("Property deleted successfully!");
    } catch (err) {
      console.error("Failed to delete property", err);
    }
  };

  const handleUpdateClick = (property: TProperty) => {
    setSelectedUpdateProperty(property);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUpdateProperty(null);
  };

  const handleDeleteClick = (property: TProperty) => {
    setSelectedDeleteProperty(property);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDeleteProperty(null);
  };

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Property Listings</h2>
        <div className="hidden md:block text-sm text-gray-600">
          Total Properties: {totalItems}
        </div>
      </div>

      {/* Filter & Search */}
      {isLoading ? (
        <DashboardSearchBarSkeleton />
      ) : (
        <div className="hidden md:block bg-white rounded-lg shadow-md border">
          <div className="flex items-center justify-between">
            <div className="bg-[#1C2D37] text-white px-4 py-5 text-sm font-semibold flex items-center rounded-l-lg">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter
            </div>
            <div className="w-full mr-10 overflow-hidden">
              <FormContainer
                onSubmit={handleSubmitSearch}
                defaultValues={filters}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center px-4 border-l border-gray-300">
                    <Search className="w-4 h-4 text-muted-foreground mr-2" />
                    <FormInput
                      name="searchTerm"
                      placeholder="Search properties..."
                      className="w-[200px] px-0 border-none focus:ring-0"
                    />
                  </div>
                  <div className="px-4 border-l border-gray-300">
                    <FormSelect
                      name="availability"
                      options={availabilityOptions}
                      placeholder="Status"
                      className="w-[140px] border-none"
                    />
                  </div>
                  <div className="px-4 border-l border-gray-300">
                    <FormSelect
                      name="sortBy"
                      options={sortOptions}
                      placeholder="Sort by"
                      className="w-[140px] border-none"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="px-4 border-l border-gray-300">
                      <Button
                        type="submit"
                        className="rounded-full px-6 bg-[#1C2D37] hover:bg-[#2a3f4a]"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClearSearch}
                      className="ml-2 rounded-full px-6 border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Clear Filter
                    </Button>
                  </div>
                </div>
              </FormContainer>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <DashboardPropertiesTable
        properties={properties}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
      />
      {/* Modals */}
      <UpdatePropertyModal
        open={isUpdateModalOpen}
        property={selectedUpdateProperty}
        onClose={handleCloseUpdateModal}
        onSave={handleUpdate}
      />
      <DeletePropertyModal
        open={isDeleteModalOpen}
        property={selectedDeleteProperty}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UserPropertyListingsPage;
