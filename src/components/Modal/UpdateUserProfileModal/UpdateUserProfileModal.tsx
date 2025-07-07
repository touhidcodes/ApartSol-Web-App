"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";
import FormTextarea from "@/components/Forms/FormTextarea";
import FormImageUploader from "@/components/Forms/FormImageUploader";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
import { TUserWithProfile } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface TUpdateUserProfileModalProps {
  open: boolean;
  userProfile: TUserWithProfile | null;
  onClose: () => void;
  onSave: (updatedUser: FieldValues) => void;
}

// Optional: you can use zod for validation
const updateProfileSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  name: z.string(),
  profession: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
});

const UpdateUserProfileModal = ({
  open,
  userProfile,
  onClose,
  onSave,
}: TUpdateUserProfileModalProps) => {
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const [updatedUser, setUpdatedUser] = useState<TUserWithProfile | null>(
    userProfile
  );

  useEffect(() => {
    setUpdatedUser(userProfile);
  }, [userProfile]);

  const handleUpdateUser = async (values: FieldValues) => {
    onSave(values);
    onClose();
    setProfileUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center">Update Profile</DialogTitle>
        </DialogHeader>

        <FormContainer
          onSubmit={handleUpdateUser}
          resolver={zodResolver(updateProfileSchema)}
          defaultValues={{
            username: updatedUser?.username || "",
            email: updatedUser?.email || "",
            name: updatedUser?.userProfile?.name || "",
            profession: updatedUser?.userProfile?.profession || "",
            company: updatedUser?.userProfile?.company || "",
            phone: updatedUser?.userProfile?.phone || "",
            street: updatedUser?.userProfile?.street || "",
            city: updatedUser?.userProfile?.city || "",
            country: updatedUser?.userProfile?.country || "",
            bio: updatedUser?.userProfile?.bio || "",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Username" name="username" required />
            <FormInput label="Email" name="email" type="email" required />
            <FormInput label="Full Name" name="name" />
            <FormInput label="Profession" name="profession" />
            <FormInput label="Company" name="company" />
            <FormInput label="Phone" name="phone" />
            <FormInput label="Street" name="street" />
            <FormInput label="City" name="city" />
            <FormInput label="Country" name="country" />
            <FormTextarea label="Bio" name="bio" />
            <FormImageUploader name="images" label="Upload Image" required />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="submit">Save Changes</Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserProfileModal;
