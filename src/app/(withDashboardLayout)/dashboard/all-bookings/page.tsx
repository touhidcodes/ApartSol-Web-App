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
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import { TBookings } from "@/types/Bookings";
import Loading from "@/components/UI/Loading/Loading";

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

const AllBookingsPage = () => {
  const { data: bookings, isLoading } = useGetAllBookingsQuery({});

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container sx={{ paddingBottom: "50px" }}>
        <Typography variant="h4" component="h1" gutterBottom my={3}>
          All Bookings
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Title</StyledTableCell>
                <StyledTableCell align="right">Location</StyledTableCell>
                <StyledTableCell align="right">Rent</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking: TBookings) => (
                <StyledTableRow key={booking.id}>
                  <StyledTableCell align="right">
                    {booking?.flat?.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking?.flat?.location}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking?.flat?.rent}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {booking?.status}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default AllBookingsPage;
