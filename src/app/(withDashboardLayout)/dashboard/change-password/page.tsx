"use client";

import React, { useState } from "react";
import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import * as z from "zod";
import PHInput from "@/components/Forms/PHInput";
import PHForm from "@/components/Forms/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";

// Validation schema using Zod
const validationSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ChangePasswordPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();

  //  change password
  const handleChange = async (values: FieldValues) => {
    const passwordData = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    console.log(values, passwordData);
    try {
      const res = await changePassword(passwordData);

      if (res?.data?.status === 200) {
        toast.success("Password changed successfully!");
        logoutUser(router);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ paddingBottom: "50px" }}>
      <Stack alignItems="center" justifyContent="center">
        <Typography variant="h4" component="h1" gutterBottom my={3}>
          Change Password
        </Typography>
        <PHForm
          onSubmit={handleChange}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
        >
          <Stack spacing={3} my={1}>
            <PHInput
              name="oldPassword"
              label="Old Password"
              type="password"
              fullWidth={true}
            />

            <PHInput
              name="newPassword"
              label="New Password"
              type="password"
              fullWidth={true}
            />
            <PHInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth={true}
            />
            <Button
              sx={{
                margin: "10px 0px",
              }}
              type="submit"
            >
              Change Password
            </Button>
          </Stack>
        </PHForm>
      </Stack>
    </Container>
  );
};

export default ChangePasswordPage;
