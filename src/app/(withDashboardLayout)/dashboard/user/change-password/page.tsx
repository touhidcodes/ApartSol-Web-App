"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/api/userApi";
import { logoutUser } from "@/services/actions/logoutUser";
import { changePasswordValidationSchema } from "@/constants/schema";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";

const ChangePasswordPage = () => {
  const [changePassword] = useChangePasswordMutation();

  const handleChange = async (values: FieldValues) => {
    const passwordData = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    try {
      const res = await changePassword(passwordData);

      if (res?.data?.status === 200) {
        toast.success("Password changed successfully!");
        logoutUser();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormContainer
            onSubmit={handleChange}
            resolver={zodResolver(changePasswordValidationSchema)}
            defaultValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
          >
            <div className="space-y-4">
              <FormInput
                name="oldPassword"
                label="Old Password"
                type="password"
                placeholder="Enter old password"
                required
              />
              <FormInput
                name="newPassword"
                label="New Password"
                type="password"
                placeholder="Enter new password"
                required
              />
              <FormInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm new password"
                required
              />
              <Button type="submit" className="w-full mt-2">
                Change Password
              </Button>
            </div>
          </FormContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
