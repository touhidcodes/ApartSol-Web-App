import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Stack, MenuItem } from "@mui/material";
import PHInput from "@/components/Forms/PHInput";
import PHForm from "@/components/Forms/PHForm";
import { FieldValues } from "react-hook-form";
import { TUser } from "@/types/User";

interface TUpdateUserModalProps {
  open: boolean;
  user: TUser | null;
  onClose: () => void;
  onSave: (updatedUser: FieldValues, userId: string) => void;
}

const UpdateUserModal = ({
  open,
  user,
  onClose,
  onSave,
}: TUpdateUserModalProps) => {
  const [updatedUser, setUpdatedUser] = useState<TUser | null>(user);

  // Set user data to be updated
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  // Pass the updated data to parent component for update
  const handleUpdateUser = async (values: FieldValues) => {
    if (user) {
      onSave(values, user?.id);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        <Box
          m={5}
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 5,
            textAlign: "center",
            background: "#EBF0F4",
            overflowY: "auto",
          }}
        >
          <PHForm
            onSubmit={handleUpdateUser}
            defaultValues={{
              role: updatedUser?.role || "",
              status: updatedUser?.status || "",
            }}
          >
            <Stack spacing={4} my={1} marginBottom={5}>
              <PHInput
                name="role"
                label="Role"
                type="text"
                fullWidth={true}
                select
              >
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </PHInput>
              <PHInput
                name="status"
                label="Status"
                type="text"
                select
                fullWidth={true}
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="BLOCKED">Blocked</MenuItem>
              </PHInput>
            </Stack>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
              spacing={5}
            >
              <Button fullWidth={true} type="submit">
                Submit
              </Button>
              <Button fullWidth={true} onClick={() => onClose()}>
                Cancel
              </Button>
            </Stack>
          </PHForm>
        </Box>
      </Stack>
    </Modal>
  );
};

export default UpdateUserModal;
