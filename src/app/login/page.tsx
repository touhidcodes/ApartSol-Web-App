"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
  const [error, setError] = useState("");

  const handleLogin = async (values: FieldValues) => {
    console.log(values);
    try {
      const res = await userLogin(values);
      console.log(res);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        // router.push("/dashboard");
      } else {
        setError(res.message);
        // console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
            spacing={2}
          >
            <Typography
              variant="h3"
              fontWeight={600}
              style={{ color: "#0B1134CC", marginTop: "20px" }}
            >
              Welcome Back!
            </Typography>
            <Typography
              component="p"
              fontWeight={400}
              style={{ color: "#0B1134CC" }}
            >
              Still don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#ff793f] underline">
                Create an account
              </Link>
            </Typography>
          </Stack>

          {error && (
            <Box>
              <Typography
                sx={{
                  borderRadius: "2px",
                  color: "#ff793f",
                  marginTop: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          <Box m={6}>
            <PHForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Stack spacing={3} my={1}>
                <PHInput
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth={true}
                />
                <PHInput
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth={true}
                />
              </Stack>

              <Link href={"/forgot-password"}>
                <Typography
                  mb={1}
                  textAlign="end"
                  component="p"
                  fontWeight={300}
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  Forgot Password?
                </Typography>
              </Link>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
