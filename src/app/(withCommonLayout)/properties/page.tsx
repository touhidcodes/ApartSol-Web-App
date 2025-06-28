// "use client";

// import PropertyCard from "@/components/Card/PropertyCard/PropertyCard";
// import Loading from "@/components/Custom/Loading/Loading";
// import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
// import { RootState } from "@/redux/store";
// import { TProperty } from "@/types/Property";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const PropertiesPage = () => {
//   const searchParams = useSelector((state: RootState) => state.flat.params);
//   const [properties, setProperties] = useState<TProperty[]>([]);
//   const { data, isLoading } = useGetAllFlatsQuery(searchParams);

//   useEffect(() => {
//     if (data) {
//       setProperties(data);
//     }
//   }, [data]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="bg-[#EBF0F4] py-20 mt-10 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {properties.map((property: TProperty) => (
//             <PropertyCard key={property.id} property={property} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertiesPage;

//  <div className="mb-8">
//    <div className="bg-white rounded-lg shadow-md overflow-hidden">
//      <div className="flex items-center">
//        {/* Filter label */}
//        <div className="bg-[#1C2D37] text-white px-5 py-4 font-semibold text-sm whitespace-nowrap flex items-center">
//          <SlidersHorizontal className="w-4 h-4 mr-2" />
//          Filter Properties
//        </div>

//        <FormContainer
//          onSubmit={handleSubmitSearch}
//          defaultValues={{
//            searchTerm: "",
//            location: "",
//            totalBedrooms: "",
//            priceRange: "",
//          }}
//        >
//          <div className="flex items-center justify-between flex-1">
//            {/* Search input */}
//            <div className="flex items-center px-4 border-l border-gray-300">
//              <Search className="w-4 h-4 text-muted-foreground mr-2" />
//              <FormInput
//                name="searchTerm"
//                placeholder="Search properties..."
//                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-[200px] px-0"
//              />
//            </div>

//            {/* Location select */}
//            <div className="px-4 border-l border-gray-300">
//              <FormSelect
//                name="location"
//                options={locationOptions}
//                placeholder="Location"
//                className="w-[140px] border-none focus:ring-0 focus:ring-offset-0"
//              />
//            </div>

//            {/* Bedrooms select */}
//            <div className="px-4 border-l border-gray-300">
//              <FormSelect
//                name="totalBedrooms"
//                options={bedroomOptions}
//                placeholder="Bedrooms"
//                className="w-[140px] border-none focus:ring-0 focus:ring-offset-0"
//              />
//            </div>

//            {/* Price Range select */}
//            <div className="px-4 border-l border-gray-300">
//              <FormSelect
//                name="priceRange"
//                options={priceRanges}
//                placeholder="Price Range"
//                className="w-[160px] border-none focus:ring-0 focus:ring-offset-0"
//              />
//            </div>

//            {/* Search Button */}
//            <div className="px-4 border-l border-gray-300">
//              <Button
//                type="submit"
//                className="rounded-full px-6 bg-[#1C2D37] hover:bg-[#2a3f4a]"
//              >
//                <Search className="w-4 h-4 mr-2" />
//                Search
//              </Button>
//            </div>
//          </div>
//        </FormContainer>
//      </div>
//    </div>
//  </div>;s

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PropertyCard from "@/components/Card/PropertyCard/PropertyCard";
import Loading from "@/components/Custom/Loading/Loading";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelect";
import { Button } from "@/components/ui/button";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { TProperty } from "@/types/Property";
import { Search, SlidersHorizontal } from "lucide-react";
import { FieldValues, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParams } from "@/redux/features/flatSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";

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

const PropertiesPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const reduxSearchParams = useSelector(
    (state: RootState) => state.flat.params
  );
  const [params, setParams] = useState({
    searchTerm: searchParams.get("searchTerm") || "",
    location: searchParams.get("location") || "",
    totalBedrooms: searchParams.get("totalBedrooms") || "",
  });
  const apiQuery = reduxSearchParams || "";
  const { data: properties, isLoading, error } = useGetAllFlatsQuery(apiQuery);
  const totalItems = properties?.meta?.total || 0;

  const handleSubmitSearch = (formData: FieldValues) => {
    const params: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        params[key] = String(value);
      }
    });

    const newSearch = new URLSearchParams(params).toString();
    dispatch(setSearchParams({ params: newSearch }));
  };
  const handleClearSearch = () => {
    setParams({
      searchTerm: "",
      location: "",
      totalBedrooms: "",
    });
    dispatch(setSearchParams({ params: "" }));
  };

  return (
    <div className="bg-[#EBF0F4] py-10 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-[#1C2D37] text-white px-5 py-4 text-sm font-semibold flex items-center">
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
          <p className="text-gray-600">Showing {totalItems} properties</p>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-lg shadow-md p-10">
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                Error Loading Properties
              </h3>
              <p className="text-gray-600">Try again later.</p>
            </div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {properties.map((property: TProperty) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-lg shadow-md p-10">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria to find more properties.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
