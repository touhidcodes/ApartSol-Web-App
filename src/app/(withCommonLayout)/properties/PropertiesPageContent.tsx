"use client";

import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/Card/PropertyCard/PropertyCard";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelect";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllPropertiesQuery } from "@/redux/api/propertiesApi";
import { TProperty } from "@/types/Property";
import { AlertTriangle, Search, SlidersHorizontal } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParams } from "@/redux/features/flatSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import PropertiesPageSkeleton from "@/components/Skeleton/PropertiesPageSkeleton/PropertiesPageSkeleton";

const locationOptions = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chattogram", label: "Chattogram" },
  { value: "khulna", label: "Khulna" },
  { value: "sylhet", label: "Sylhet" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "barisal", label: "Barisal" },
];

const bedroomOptions = [
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4+ Bedrooms" },
];

const purposeOptions = [
  { value: "RENT", label: "Rent" },
  { value: "SALE", label: "Buy" },
];

const PropertiesPageContent = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const reduxSearchParams = useSelector(
    (state: RootState) => state.flat.params
  );

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [params, setParams] = useState({
    searchTerm: searchParams.get("searchTerm") || "",
    location: searchParams.get("location") || "",
    totalBedrooms: searchParams.get("totalBedrooms") || "",
    purpose: searchParams.get("purpose") || "",
  });

  const apiQuery = reduxSearchParams
    ? `${reduxSearchParams}&page=${currentPage}&limit=6`
    : `page=${currentPage}&limit=6`;

  const { data, isLoading, error } = useGetAllPropertiesQuery(apiQuery);
  const properties = data?.data;
  const totalItems = data?.meta?.total || 0;

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const start = totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const handleSubmitSearch = (formData: FieldValues) => {
    const filterParams: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        filterParams[key] = String(value);
      }
    });

    const newSearch = new URLSearchParams({
      ...filterParams,
      page: "1",
    }).toString();
    dispatch(setSearchParams({ params: newSearch }));
    setCurrentPage(1);
    setParams(
      filterParams as {
        searchTerm: string;
        location: string;
        totalBedrooms: string;
        purpose: string;
      }
    );
  };

  const handleClearSearch = () => {
    const cleared = {
      searchTerm: "",
      location: "",
      totalBedrooms: "",
      purpose: "",
    };

    setParams(cleared);
    setCurrentPage(1);
    dispatch(setSearchParams({ params: "" }));
  };

  if (isLoading) {
    return <PropertiesPageSkeleton />;
  }

  return (
    <div className="bg-[#EBF0F4] py-10 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-[#1C2D37] text-white px-5 py-4 text-sm font-semibold flex items-center rounded-s-lg">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter Properties
            </div>

            <FormContainer onSubmit={handleSubmitSearch} defaultValues={params}>
              <div className="flex items-center justify-between flex-1">
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
                    name="location"
                    options={locationOptions}
                    placeholder="Location"
                    className="w-[140px] border-none"
                  />
                </div>
                <div className="px-4 border-l border-gray-300">
                  <FormSelect
                    name="totalBedrooms"
                    options={bedroomOptions}
                    placeholder="Bedrooms"
                    className="w-[140px] border-none"
                  />
                </div>
                <div className="px-4 border-l border-gray-300">
                  <FormSelect
                    name="purpose"
                    options={purposeOptions}
                    placeholder="Rent or Buy"
                    className="w-[140px] border-none"
                  />
                </div>
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
            </FormContainer>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Available Properties
          </h2>
          <p className="text-gray-600">
            Showing {start} to {end} of {totalItems} properties
          </p>{" "}
        </div>

        {properties?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-10">
              {properties.map((property: TProperty) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
                      }}
                      className={`transition-all duration-200 ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50 cursor-not-allowed"
                          : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                      }`}
                    />
                  </PaginationItem>

                  {/* Page Indicator */}
                  <PaginationItem className="px-4 flex items-center text-sm text-gray-700">
                    Page
                    <span className="mx-1 font-semibold"> {currentPage}</span>
                    of <span className="ml-1 font-semibold"> {totalPages}</span>
                  </PaginationItem>

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (currentPage < totalPages)
                          setCurrentPage((prev) => prev + 1);
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-xl shadow-md p-10 text-center max-w-md">
              <AlertTriangle className="w-12 h-12 text-slate-800 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Something went wrong!
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn’t load the properties. Please try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-full hover:bg-slate-700 transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPageContent;
