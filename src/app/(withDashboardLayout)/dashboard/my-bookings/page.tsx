"use client";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container, Typography } from "@mui/material";
import { useGetMyBookingsQuery } from "@/redux/api/bookingApi";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1F2544",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MyBookingPage = () => {
  const { data, isLoading } = useGetMyBookingsQuery({});
  console.log(data);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </Box>
    );
  }
  return (
    <>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom my={3}>
          My Bookings
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Square Feet</StyledTableCell>
                <StyledTableCell align="right">Bedrooms</StyledTableCell>
                <StyledTableCell align="right">Rooms</StyledTableCell>
                <StyledTableCell align="right">Edit</StyledTableCell>
                <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {flats.map((flat: TFlat) => (
              <StyledTableRow key={flat.id}>
                <StyledTableCell component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    <Image
                      src={flat?.image}
                      alt="flat image"
                      width={100}
                      height={50}
                    />
                    <Stack spacing={1}>
                      <Typography>{flat?.title}</Typography>
                      <Typography>{flat?.location}</Typography>
                      <Typography sx={{ fontWeight: "600" }}>
                        $ {flat?.rent}
                      </Typography>
                    </Stack>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {flat.squareFeet}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {flat.totalBedrooms}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {flat.totalRooms}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleEditClick(flat)}>Edit</Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleDeleteClick(flat?.id)}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default MyBookingPage;
