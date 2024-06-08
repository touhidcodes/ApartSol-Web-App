"use client";

import { Container, Typography, Stack, Button } from "@mui/material";
import PHInput from "@/components/Forms/PHInput";
import PHForm from "@/components/Forms/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/api/userApi";
import { toast } from "sonner";

import { logoutUser } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";
import { changePasswordValidationSchema } from "@/constants/schema";

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
          resolver={zodResolver(changePasswordValidationSchema)}
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
