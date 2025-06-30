"use client";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useGetMyBookingsQuery } from "@/redux/api/bookingApi";
import { TBookings } from "@/types/Bookings";
import Loading from "@/components/Custom/Loading/Loading";
import Link from "next/link";

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

const MyBookingsPage = () => {
  const { data: bookings, isLoading } = useGetMyBookingsQuery({});
  console.log(bookings);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container sx={{ paddingBottom: "50px" }}>
        <Typography variant="h4" component="h1" gutterBottom my={3}>
          My Bookings
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Title</StyledTableCell>
                <StyledTableCell align="right">Location</StyledTableCell>
                <StyledTableCell align="right">Rent</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings?.data?.map((booking: TBookings) => (
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
                  <StyledTableCell align="right">
                    {booking?.status === "PENDING" ? (
                      <Link href={`/checkout/${booking.id}`} passHref>
                        <Button variant="contained">Pay</Button>
                      </Link>
                    ) : (
                      <Button variant="contained" disabled>
                        Paid
                      </Button>
                    )}
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

export default MyBookingsPage;
