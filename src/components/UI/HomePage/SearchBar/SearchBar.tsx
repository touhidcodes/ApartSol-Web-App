"use client";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
        padding: { xs: 2, md: 5 },
        borderRadius: 5,
        boxShadow: 3,
        textAlign: "center",
        width: "100%",
        maxWidth: { xs: "100%", md: "90%" },
        position: "relative",
      }}
    >
      <PHForm
        onSubmit={onSubmit}
        defaultValues={{
          searchTerm: "",
          minPrice: "",
          maxPrice: "",
          totalBedrooms: "",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#00026E",
            fontSize: "30px",
          }}
        >
          Search your desired flat
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <PHInput name="searchTerm" label="Location" fullWidth />
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
            sx={{
              position: "absolute",
              bottom: "-65px",
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: "100%", sm: "auto" },
              zIndex: 2,
              borderRadius: "50px",
              height: "48px",
              paddingX: "24px",
              boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
            }}
          >
            Search
          </Button>
        </Stack>
      </PHForm>
    </Box>
  );
};

export default SearchBar;
