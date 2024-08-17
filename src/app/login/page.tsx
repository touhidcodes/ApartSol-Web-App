"use client";

import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginValidationSchema } from "@/constants/schema";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);

      if (res?.data?.token) {
        toast.success(res?.message);
        router.push("/"), router.refresh();
      } else {
        setError(res.message);
        console.log(res.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleTestLogin = async (role: "admin" | "user") => {
    const credentials =
      role === "admin"
        ? {
            identifier: `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`,
            password: `${process.env.NEXT_PUBLIC_ADMIN_PASSWORD}`,
          }
        : {
            identifier: `${process.env.NEXT_PUBLIC_USER_EMAIL}`,
            password: `${process.env.NEXT_PUBLIC_USER_PASSWORD}`,
          };

    handleLogin(credentials);
    setOpenModal(false);
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
            background: "#EBF0F4",
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
              <Link
                href="/register"
                style={{
                  color: "#00026E",
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
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

          <Box m={5}>
            <PHForm
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidationSchema)}
              defaultValues={{
                identifier: "",
                password: "",
              }}
            >
              <Stack spacing={3} my={1}>
                <Box
                  fontWeight={400}
                  style={{ color: "#0B1134CC", textAlign: "start" }}
                >
                  <Typography style={{ marginBottom: "10px" }}>
                    Username or Email*
                  </Typography>
                  <PHInput
                    name="identifier"
                    label="Username or Email"
                    type="text"
                    fullWidth={true}
                  />
                </Box>
                <Box
                  fontWeight={400}
                  style={{ color: "#0B1134CC", textAlign: "start" }}
                >
                  <Typography style={{ marginBottom: "10px" }}>
                    Password*
                  </Typography>
                  <PHInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Box>
              </Stack>

              <Link href={"/"}>
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

            <Button
              sx={{
                marginTop: "20px",
              }}
              fullWidth={true}
              onClick={() => setOpenModal(true)}
            >
              Test Login
            </Button>
          </Box>
        </Box>
      </Stack>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 300,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            Login As
          </Typography>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            fullWidth
            onClick={() => handleTestLogin("admin")}
          >
            Login as Admin
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleTestLogin("user")}
          >
            Login as User
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default LoginPage;
