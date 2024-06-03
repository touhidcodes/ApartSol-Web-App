// components/FlatCardTable.tsx

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TFlat } from "@/types/Flats";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import UpdateFlatModal from "@/components/Modal/UpdateFlatModal/updateFlatModal";
import { FieldValues } from "react-hook-form";

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

type TFlatCardProps = {
  flats: TFlat[];
  handleUpdate: (flat: FieldValues, flatId: string) => void;
  handleDelete: (flatId: string) => void;
};

const FlatCardTable = ({
  flats,
  handleUpdate,
  handleDelete,
}: TFlatCardProps) => {
  const [selectedFlat, setSelectedFlat] = useState<TFlat | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flatIdToDelete, setFlatIdToDelete] = useState<string | null>(null);

  // edit button & set selected flat data
  const handleEditClick = (flat: TFlat) => {
    setSelectedFlat(flat);
    setUpdateModalOpen(true);
  };

  //  modal close
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedFlat(null);
  };

  //  pass values to the parent component
  const handleSaveUpdatedFlat = (updatedFlat: FieldValues, flatId: string) => {
    handleUpdate(updatedFlat, flatId);
    setUpdateModalOpen(false);
    setSelectedFlat(null);
  };

  // open delete confirmation dialog
  const handleDeleteClick = (flatId: string) => {
    setFlatIdToDelete(flatId);
    setDeleteDialogOpen(true);
  };

  // close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setFlatIdToDelete(null);
  };

  // handle delete action
  const handleConfirmDelete = () => {
    if (flatIdToDelete) {
      handleDelete(flatIdToDelete);
      setDeleteDialogOpen(false);
      setFlatIdToDelete(null);
    }
  };
  return (
    <>
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
            {flats.map((flat: TFlat) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* update flat modal */}
      <UpdateFlatModal
        open={isUpdateModalOpen}
        flat={selectedFlat}
        onClose={handleCloseUpdateModal}
        onSave={handleSaveUpdatedFlat}
      />
      {/* delete flat modal */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this flat? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FlatCardTable;
