// "use client";
// import { Box, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
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
//         borderRadius: 2,
//         boxShadow: 3,
//         textAlign: "center",
//         width: "100%",
//         maxWidth: { xs: "100%", md: "800px" },
//       }}
//     >
//       <PHForm
//         onSubmit={onSubmit}
//         defaultValues={{
//           location: "",
//           minPrice: "",
//           maxPrice: "",
//           totalBedrooms: "",
//         }}
//       >
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={2}
//           sx={{ mb: 2 }}
//           alignItems="center"
//           justifyContent="center"
//         >
//           <PHInput name="location" label="Location" fullWidth />
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
import { Box, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import PHInput from "@/components/Forms/PHInput";
import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setSearchParams } from "@/redux/features/flatSlice";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = (data: FieldValues) => {
    const params = new URLSearchParams(data).toString();
    console.log(params);

    dispatch(setSearchParams({ params }));
    router.push("/flats");
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: { xs: 2, md: 3 },
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
        width: "100%",
        maxWidth: { xs: "100%", md: "90%" },
      }}
    >
      <PHForm
        onSubmit={onSubmit}
        defaultValues={{
          location: "",
          minPrice: "",
          maxPrice: "",
          totalBedrooms: "",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <PHInput name="location" label="Location" fullWidth />
          <PHInput name="maxPrice" label="Max Price" type="number" fullWidth />
          <PHInput name="minPrice" label="Min Price" type="number" fullWidth />
          <PHInput
            name="totalBedrooms"
            label="Number of Bedrooms"
            type="number"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth={!isSmallScreen}
            type="submit"
          >
            Search
          </Button>
        </Stack>
      </PHForm>
    </Box>
  );
};

export default SearchBar;
