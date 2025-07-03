// "use client";
// import { useState } from "react";
// import { Box, Button, Container, Stack, Typography } from "@mui/material";
// import PHForm from "@/components/Forms/PHForm";
// import PHInput from "@/components/Forms/PHInput";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
// import PHFileUploader from "@/components/Forms/PHFileUploader";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { FieldValues } from "react-hook-form";
// import { flatPostValidationSchema } from "@/constants/schema";
// import { useCreatePropertyMutation } from "@/redux/api/propertiesApi";

// const PostFlatPage = () => {
//   const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
//   const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
//   const [createFlat] = useCreatePropertyMutation();
//   const router = useRouter();

//   //  image upload
//   const handleImageUpload = async (files: File[]) => {
//     if (files.length > 0) {
//       setImageUploadLoading(true);
//       try {
//         const url = await uploadImageToImageBB(files[0]);
//         setThumbnailUrl(url);
//         toast.success("Image uploaded successfully!");
//       } catch (error) {
//         console.error("Error uploading thumbnail image:", error);
//         toast.error("Please upload image again");
//       } finally {
//         setImageUploadLoading(false);
//       }
//     }
//   };

//   //  create post
//   const handlePost = async (values: FieldValues) => {
//     try {
//       if (thumbnailUrl) {
//         const flatData = {
//           ...values,
//           squareFeet: Number(values.squareFeet),
//           totalBedrooms: Number(values.totalBedrooms),
//           totalRooms: Number(values.totalRooms),
//           rent: Number(values.rent),
//           advanceAmount: Number(values.advanceAmount),
//           image: thumbnailUrl,
//         };

//         const res = await createFlat(flatData);

//         if (res?.data?.id) {
//           toast.success("Flat posted successfully!");
//           setThumbnailUrl("");
//           router.push("/flats");
//         } else {
//           toast.error("Something went wrong!");
//         }
//       } else {
//         toast.error("Please upload image");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Box sx={{ p: 3, background: "#EBF0F4" }}>
//       <Container>
//         <Stack
//           sx={{
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Box
//             sx={{
//               maxWidth: 700,
//               width: "100%",
//               boxShadow: 1,
//               borderRadius: 2,
//               p: 8,
//               textAlign: "center",
//               background: "#fff",
//             }}
//           >
//             <Stack
//               sx={{
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//               spacing={2}
//             >
//               <Typography
//                 variant="h3"
//                 fontWeight={600}
//                 style={{ color: "#0B1134CC", marginTop: "20px" }}
//               >
//                 Share Your Flat
//               </Typography>
//               <Typography
//                 component="p"
//                 fontWeight={400}
//                 style={{ color: "#0B1134CC" }}
//               >
//                 Please provide your flat information
//               </Typography>
//             </Stack>

//             <Box m={5}>
//               <PHForm
//                 onSubmit={handlePost}
//                 resolver={zodResolver(flatPostValidationSchema)}
//                 defaultValues={{
//                   title: "",
//                   image: "",
//                   squareFeet: "",
//                   totalBedrooms: "",
//                   totalRooms: "",
//                   amenities: "",
//                   location: "",
//                   description: "",
//                   rent: "",
//                   advanceAmount: "",
//                 }}
//               >
//                 <Stack spacing={4} my={1} marginBottom={5}>
//                   <PHFileUploader
//                     accept="image/*"
//                     uploadType="single"
//                     onFileUpload={handleImageUpload}
//                   />
//                   {imageUploadLoading && (
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Typography sx={{ color: "#ff793f", fontWeight: "500" }}>
//                         Uploading image...
//                       </Typography>
//                     </Box>
//                   )}
//                   {thumbnailUrl && (
//                     <Typography sx={{ color: "#ff793f", fontWeight: "500" }}>
//                       Image uploaded successfully!
//                     </Typography>
//                   )}
//                   <PHInput
//                     name="title"
//                     label="Flat Title"
//                     type="text"
//                     fullWidth={true}
//                   />
//                   <PHInput
//                     name="squareFeet"
//                     label="Square Feet"
//                     type="number"
//                     fullWidth={true}
//                   />
//                   <PHInput
//                     name="totalBedrooms"
//                     label="Total Bedrooms"
//                     type="number"
//                     fullWidth={true}
//                   />
//                   <PHInput
//                     name="totalRooms"
//                     label="Total Rooms"
//                     type="number"
//                     fullWidth={true}
//                   />
//                   <PHInput
//                     name="amenities"
//                     label="Amenities"
//                     type="text"
//                     fullWidth={true}
//                   />
//                   <PHInput
//                     name="location"
//                     label="Location"
//                     type="text"
//                     fullWidth={true}
//                   />
//                   <PHInput
//                     name="description"
//                     label="Description"
//                     type="text"
//                     fullWidth={true}
//                   />
//                   <PHInput
//                     name="rent"
//                     label="Rent"
//                     type="number"
//                     fullWidth={true}
//                   />
//                   <PHInput
//                     name="advanceAmount"
//                     label="Advance Amount"
//                     type="number"
//                     fullWidth={true}
//                   />
//                 </Stack>

//                 <Button
//                   sx={{
//                     margin: "10px 0px",
//                   }}
//                   fullWidth={true}
//                   type="submit"
//                 >
//                   Submit
//                 </Button>
//               </PHForm>
//             </Box>
//           </Box>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default PostFlatPage;

"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
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
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { DEFAULT_AMENITIES } from "@/data/constants";

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
  rent: "",
  advanceAmount: "",
};

const PostFlatPage = () => {
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
        rent: Number(values.rent),
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
            <div>
              <Breadcrumb className="flex items-center justify-center space-x-2 text-sm lg:text-md text-white list-none">
                <BreadcrumbLink
                  href="/"
                  className="text-white hover:text-white focus:text-white active:text-white"
                >
                  Home
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  href="/properties"
                  aria-current="page"
                  className="text-white hover:text-white focus:text-white active:text-white"
                >
                  Properties
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  href="/properties/add"
                  aria-current="page"
                  className="text-white hover:text-white focus:text-white active:text-white"
                >
                  Add Listing
                </BreadcrumbLink>
              </Breadcrumb>
            </div>
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
                  label="Rent"
                  name="rent"
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

export default PostFlatPage;
