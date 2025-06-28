"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSearchParams } from "@/redux/features/flatSlice";
import { useForm } from "react-hook-form";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelect";

const categoryOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "studio", label: "Studio" },
  { value: "house", label: "House" },
];

const locationOptions = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chattogram", label: "Chattogram" },
  { value: "khulna", label: "Khulna" },
];

const SearchBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmitSearch = (data: any) => {
    console.log(data);
    // const params = new URLSearchParams(data).toString();
    // dispatch(setSearchParams({ params }));
    // router.push("/flats");
  };

  return (
    <div className="container flex items-center mx-auto rounded-lg overflow-hidden shadow-md bg-white">
      {/* Property Search label (dark section) */}
      <div className="bg-[#1C2D37] text-white px-5 py-5 font-semibold text-sm whitespace-nowrap">
        Property Search
      </div>
      <FormContainer
        onSubmit={handleSubmitSearch}
        defaultValues={{
          searchTerm: "",
          category: "",
          location: "",
        }}
      >
        <div className="flex items-center justify-center">
          {/* Search input */}
          <div className="flex items-center px-4 border-l border-gray-300">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <FormInput
              name="searchTerm"
              placeholder="Search for properties..."
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-[200px] px-0"
            />
          </div>
          {/* Category select */}
          <div className="px-4 border-l border-gray-300">
            <FormSelect
              name="category"
              options={categoryOptions}
              className="w-[140px] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {/* Location select */}
          <div className="px-4 border-l border-gray-300">
            <FormSelect
              name="location"
              options={locationOptions}
              className="w-[140px] border-none focus:ring-0 focus:ring-offset-0"
            />
          </div>
          {/* Search Button */}
          <div className="px-4 border-l justify-end border-gray-300 item">
            <Button type="submit" className="rounded-full px-5 bg-[#1C2D37]">
              <Search className="w-4 h-4 mr-2" />
              Search Property
            </Button>
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default SearchBar;
