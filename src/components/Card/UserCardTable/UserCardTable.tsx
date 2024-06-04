import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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

import { FieldValues } from "react-hook-form";
import { TUser } from "@/types/User";
import UpdateUserModal from "@/components/Modal/UpdateUserModal/UpdateUserModal";

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

type TUserCardProps = {
  users: TUser[];
  handleUpdate: (user: FieldValues, userId: string) => void;
};

const UserCardTable = ({ users, handleUpdate }: TUserCardProps) => {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // edit button & set selected user data
  const handleEditClick = (user: TUser) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  // modal close
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedUser(null);
  };

  // pass values to the parent component
  const handleSaveUpdatedUser = (updatedUser: FieldValues, userId: string) => {
    handleUpdate(updatedUser, userId);
    setUpdateModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: TUser) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.username}
                </StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.role}</StyledTableCell>
                <StyledTableCell align="right">{user.status}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleEditClick(user)}>Update</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* update user modal */}
      <UpdateUserModal
        open={isUpdateModalOpen}
        user={selectedUser}
        onClose={handleCloseUpdateModal}
        onSave={handleSaveUpdatedUser}
      />
    </>
  );
};

export default UserCardTable;
