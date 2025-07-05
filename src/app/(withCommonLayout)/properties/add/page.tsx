"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { useCreatePropertyMutation } from "@/redux/api/propertiesApi";
import FormContainer from "@/components/Forms/FormContainer";
import { createPropertySchema } from "@/schema/propertiesSchema";
import FormInput from "@/components/Forms/FormInput";
import FormTextarea from "@/components/Forms/FormTextarea";
import FormSelect from "@/components/Forms/FormSelect";
import { Loader2 } from "lucide-react";
import FormImageUploader from "@/components/Forms/FormImageUploader";
import { Button } from "@/components/ui/button";
import FormTagsSelector from "@/components/Forms/FormTagsSelector";
import Image from "next/image";
import { DEFAULT_AMENITIES } from "@/data/constants";
import DynamicBreadcrumb from "@/components/Shared/Breadcrumb/DynamicBreadcrumb";

const defaultValues = {
  title: "",
  images: [],
  squareFeet: "",
  totalRooms: "",
  totalBedrooms: "",
  totalBathrooms: "",
  propertyType: "",
  purpose: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  description: "",
  amenities: [],
  price: "",
  advanceAmount: "",
};

const AddPropertyPage = () => {
  const [loading, setLoading] = useState(false);
  const [createProperty] = useCreatePropertyMutation();
  const router = useRouter();

  //  create post
  const handlePost = async (values: FieldValues) => {
    try {
      setLoading(true);
      const propertyData = {
        ...values,
        squareFeet: Number(values.squareFeet),
        totalBedrooms: Number(values.totalBedrooms),
        totalBathrooms: Number(values.totalBathrooms),
        totalRooms: Number(values.totalRooms),
        price: Number(values.price),
        advanceAmount: Number(values.advanceAmount),
      };
      console.log(propertyData);

      const res = await createProperty(propertyData);

      if (res?.data?.id) {
        toast.success("Property Listed successfully!");
        setLoading(false);
        router.push("/properties");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-60 md:h-[300px] w-full">
        {/* Background image */}
        <Image
          src="/assets/images/detailsPage.jpg"
          alt="add-listing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/50 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
          <div className="text-center max-w-5xl w-full space-y-2 mx-auto">
            <h1 className="text-white text-2xl md:text-5xl leading-tight font-semibold">
              Add New Property Listing
            </h1>
            <DynamicBreadcrumb />s
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-10">
        <div className="w-full container px-4">
          <FormContainer
            onSubmit={handlePost}
            resolver={zodResolver(createPropertySchema)}
            defaultValues={defaultValues}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Column 1 */}
              <div className="space-y-4">
                <FormInput
                  label="Property Title"
                  name="title"
                  placeholder="Luxury Apartment"
                  required
                />
                <FormTextarea
                  name="description"
                  label="Description"
                  placeholder="Detailed description..."
                  required
                />
                <FormInput
                  label="Square Feet"
                  name="squareFeet"
                  placeholder="1200"
                  required
                />

                <FormInput
                  label="Price"
                  name="price"
                  placeholder="20000"
                  required
                />
                <FormInput
                  label="Advance Amount"
                  name="advanceAmount"
                  placeholder="50000"
                  required
                />
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <FormInput
                  label="Total Rooms"
                  name="totalRooms"
                  placeholder="5"
                  required
                />
                <FormInput
                  label="Total Bedrooms"
                  name="totalBedrooms"
                  placeholder="3"
                  required
                />
                <FormInput
                  label="Total Bathrooms"
                  name="totalBathrooms"
                  placeholder="2"
                  required
                />
                <FormSelect
                  label="Property Type"
                  name="propertyType"
                  placeholder="Select type"
                  options={[
                    { label: "Residential", value: "RESIDENTIAL" },
                    { label: "Commercial", value: "COMMERCIAL" },
                  ]}
                  required
                />
                <FormSelect
                  label="Purpose"
                  name="purpose"
                  placeholder="Select purpose"
                  options={[
                    { label: "Rent", value: "RENT" },
                    { label: "Sale", value: "SALE" },
                  ]}
                  required
                />
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <FormInput
                  label="Street"
                  name="street"
                  placeholder="123 Main St"
                />
                <FormInput
                  label="City"
                  name="city"
                  placeholder="Dhaka"
                  required
                />
                <FormInput
                  label="State"
                  name="state"
                  placeholder="Dhaka"
                  required
                />
                <FormInput
                  label="Zip Code"
                  name="zipCode"
                  placeholder="1000"
                  required
                />
                <FormInput
                  label="Country"
                  name="country"
                  placeholder="Bangladesh"
                  required
                />
              </div>
            </div>

            {/* Bottom Inputs (Full Width) */}
            <div className="grid grid-cols-1 gap-6 mt-8">
              <FormTagsSelector
                name="amenities"
                tags={DEFAULT_AMENITIES}
                label="Property Amenities"
                required
                onSelectionChange={(tags) => console.log(tags)}
              />
              <FormImageUploader
                name="images"
                label="Upload Property Images"
                required
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                disabled={loading}
                type="submit"
                className="hover:text-primary hover:border-white px-6 py-2 font-medium transition-all duration-200 group  bg-[#1C2D37] hover:bg-slate-700 hover:text-white"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Create Property"
                )}
              </Button>
            </div>
          </FormContainer>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
