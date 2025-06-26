// "use client";
// import {
//   Box,
//   Button,
//   Stack,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import PHInput from "@/components/Forms/PHInput";
// import PHForm from "@/components/Forms/PHForm";
// import { FieldValues } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { setSearchParams } from "@/redux/features/flatSlice";
// import { useRouter } from "next/navigation";

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const onSubmit = (data: FieldValues) => {
//     const params = new URLSearchParams(data).toString();
//     console.log(params);

//     dispatch(setSearchParams({ params }));
//     router.push("/flats");
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "white",
//         padding: { xs: 2, md: 5 },
//         borderRadius: 5,
//         boxShadow: 3,
//         textAlign: "center",
//         width: "100%",
//         maxWidth: { xs: "100%", md: "90%" },
//         position: "relative",
//       }}
//     >
//       <PHForm
//         onSubmit={onSubmit}
//         defaultValues={{
//           searchTerm: "",
//           minPrice: "",
//           maxPrice: "",
//           totalBedrooms: "",
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: "bold",
//             mb: 2,
//             color: "#00026E",
//             fontSize: "30px",
//           }}
//         >
//           Search your desired flat
//         </Typography>
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={2}
//           alignItems="center"
//           justifyContent="center"
//           sx={{ position: "relative", zIndex: 1 }}
//         >
//           <PHInput name="searchTerm" label="Location" fullWidth />
//           <PHInput name="maxPrice" label="Max Price" type="number" fullWidth />
//           <PHInput name="minPrice" label="Min Price" type="number" fullWidth />
//           <PHInput
//             name="totalBedrooms"
//             label="Number of Bedrooms"
//             type="number"
//             fullWidth
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth={!isSmallScreen}
//             type="submit"
//             sx={{
//               position: "absolute",
//               bottom: "-65px",
//               left: "50%",
//               transform: "translateX(-50%)",
//               width: { xs: "100%", sm: "auto" },
//               zIndex: 2,
//               borderRadius: "50px",
//               height: "48px",
//               paddingX: "24px",
//               boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
//             }}
//           >
//             Search
//           </Button>
//         </Stack>
//       </PHForm>
//     </Box>
//   );
// };

// export default SearchBar;

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

const SearchBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      searchTerm: "",
      category: "",
      location: "",
    },
  });

  const onSubmit = (data: any) => {
    const params = new URLSearchParams(data).toString();
    dispatch(setSearchParams({ params }));
    router.push("/flats");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center max-w-6xl mx-auto rounded-lg overflow-hidden shadow-md bg-white"
    >
      {/* Property Search label (dark section) */}
      <div className="bg-[#1C2D37] text-white px-5 py-5 font-semibold text-sm whitespace-nowrap">
        Property Search
      </div>

      {/* Search input */}
      <div className="flex items-center px-4 border-l border-gray-300">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <Input
          {...register("searchTerm")}
          placeholder="What are you looking for?"
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-[200px] px-0"
        />
      </div>

      {/* Category select */}
      <div className="px-4 border-l border-gray-300">
        <Select onValueChange={(val) => setValue("category", val)}>
          <SelectTrigger className="w-[140px] border-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="house">House</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Location select */}
      <div className="px-4 border-l border-gray-300">
        <Select onValueChange={(val) => setValue("location", val)}>
          <SelectTrigger className="w-[140px] border-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dhaka">Dhaka</SelectItem>
            <SelectItem value="chattogram">Chattogram</SelectItem>
            <SelectItem value="khulna">Khulna</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Button */}
      <div className="px-4 border-l border-gray-300">
        <Button type="submit" className="rounded-full px-5 bg-[#1C2D37]">
          <Search className="w-4 h-4 mr-2" />
          Search Property
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
