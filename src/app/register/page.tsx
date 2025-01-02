"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegister } from "@/services/actions/userRegister";
import { USER_ROLE } from "@/constants/role";
import { registerValidationSchema } from "@/constants/schema";
import Image from "next/image";
import logo from "../../assets/images/logo.png";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = {
      ...values,
      role: USER_ROLE.USER,
    };

    try {
      const res = await userRegister(data);

      if (res?.data?.id) {
        toast.success("User registered successfully!");
        const result = await userLogin({
          password: values.password,
          identifier: values.email || values.username,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: `url('assets/images/flat2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Overlay to darken the background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            width: "100%",
            margin: 0,
            padding: { xs: 2, md: 4 },
          }}
        >
          {/* Left Column */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <Box sx={{ marginY: 5 }}>
              <Image src={logo} alt="Logo" width={120} height={120} />
            </Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="white"
              gutterBottom
            >
              Find Your Flatmate?
            </Typography>
            <Typography
              variant="body1"
              color="white"
              mb={2}
              sx={{ paddingRight: 25 }}
            >
              Register an account and explore all the amazing features we offer.
              Lets make your journey even better.
            </Typography>
          </Grid>

          {/* Right Column (Form) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingY: 5,
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "80%", md: "75%" },
                padding: { xs: 3, md: 4 },
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
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
                  variant="h4"
                  fontWeight="bold"
                  color="#0B1134CC"
                  gutterBottom
                >
                  Register
                </Typography>
                <Typography variant="body1" mb={3}>
                  Please register to your account to continue.
                </Typography>

                <Box m={5}>
                  <PHForm
                    onSubmit={handleRegister}
                    resolver={zodResolver(registerValidationSchema)}
                    defaultValues={{
                      email: "",
                      password: "",
                    }}
                  >
                    <Stack spacing={2} mb={2}>
                      <Box
                        fontWeight={700}
                        style={{
                          textAlign: "start",
                          color: "#00026E",
                        }}
                      >
                        <Typography
                          style={{ marginBottom: "3px", fontWeight: "500" }}
                        >
                          Username*
                        </Typography>
                        <PHInput
                          name="username"
                          label="Username"
                          type="text"
                          fullWidth={true}
                        />
                      </Box>
                      <Box
                        fontWeight={700}
                        style={{
                          textAlign: "start",
                          color: "#00026E",
                        }}
                      >
                        <Typography
                          style={{ marginBottom: "3px", fontWeight: "500" }}
                        >
                          Email*
                        </Typography>
                        <PHInput
                          name="email"
                          label="Email"
                          type="email"
                          fullWidth={true}
                        />
                      </Box>
                      <Box
                        fontWeight={700}
                        style={{
                          textAlign: "start",
                          color: "#00026E",
                        }}
                      >
                        <Typography
                          style={{ marginBottom: "3px", fontWeight: "500" }}
                        >
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

                    <Typography sx={{ mt: 2 }}>
                      By hitting the Register button, you agree to the{" "}
                      <Link href="/login">
                        <Typography
                          component="span"
                          sx={{
                            color: "#00026E",
                            textDecoration: "underline",
                            fontWeight: "500",
                            cursor: "pointer",
                          }}
                        >
                          Terms conditions & Privacy Policy
                        </Typography>
                      </Link>
                    </Typography>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#0B1134",
                        color: "white",
                        marginY: 2,
                        "&:hover": {
                          backgroundColor: "#061022",
                        },
                      }}
                    >
                      Register
                    </Button>
                  </PHForm>
                  {/* Additional Links */}
                  <Typography sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link href="/login">
                      <Typography
                        component="span"
                        sx={{
                          color: "#00026E",
                          textDecoration: "underline",
                          fontWeight: "500",
                          cursor: "pointer",
                        }}
                      >
                        Sign In
                      </Typography>
                    </Link>
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterPage;
