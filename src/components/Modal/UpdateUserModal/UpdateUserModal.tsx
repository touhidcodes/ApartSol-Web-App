"use client";

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TUser } from "@/types/User";
import FormContainer from "@/components/Forms/FormContainer";
import FormSelect from "@/components/Forms/FormSelect";

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

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleUpdateUser = async (values: FieldValues) => {
    if (user) {
      onSave(values, user.id);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Update User Role & Status</DialogTitle>
        </DialogHeader>

        <FormContainer
          onSubmit={handleUpdateUser}
          defaultValues={{
            role: updatedUser?.role || "",
            status: updatedUser?.status || "",
          }}
        >
          <div className="space-y-4 py-4">
            <FormSelect
              label="Role"
              name="role"
              placeholder="Select Role"
              options={[
                { label: "User", value: "USER" },
                { label: "Admin", value: "ADMIN" },
              ]}
              required
            />

            <FormSelect
              label="Status"
              name="status"
              placeholder="Select Status"
              options={[
                { label: "Active", value: "ACTIVE" },
                { label: "Blocked", value: "BLOCKED" },
              ]}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
