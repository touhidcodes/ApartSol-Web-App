// "use client";

// import {
//   Box,
//   Button,
//   Container,
//   Modal,
//   Stack,
//   Typography,
// } from "@mui/material";
// import Link from "next/link";
// import { FieldValues } from "react-hook-form";
// import { userLogin } from "@/services/actions/userLogin";
// import { toast } from "sonner";
// import PHForm from "@/components/Forms/PHForm";
// import PHInput from "@/components/Forms/PHInput";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { loginValidationSchema } from "@/constants/schema";
// import { useRouter } from "next/navigation";

// const LoginPage = () => {
//   const [error, setError] = useState("");
//   const [openModal, setOpenModal] = useState(false);
//   const router = useRouter();

//   const handleLogin = async (values: FieldValues) => {
//     try {
//       const res = await userLogin(values);

//       if (res?.data?.token) {
//         toast.success(res?.message);
//         router.push("/"), router.refresh();
//       } else {
//         setError(res.message);
//         console.log(res.message);
//       }
//     } catch (err: any) {
//       console.error(err.message);
//     }
//   };

//   const handleTestLogin = async (role: "admin" | "user") => {
//     const credentials =
//       role === "admin"
//         ? {
//             identifier: `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`,
//             password: `${process.env.NEXT_PUBLIC_ADMIN_PASSWORD}`,
//           }
//         : {
//             identifier: `${process.env.NEXT_PUBLIC_USER_EMAIL}`,
//             password: `${process.env.NEXT_PUBLIC_USER_PASSWORD}`,
//           };

//     handleLogin(credentials);
//     setOpenModal(false);
//   };

//   return (
//     <Container>
//       <Stack
//         sx={{
//           height: "100vh",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: 600,
//             width: "100%",
//             boxShadow: 1,
//             borderRadius: 1,
//             p: 4,
//             textAlign: "center",
//             background: "#EBF0F4",
//           }}
//         >
//           <Stack
//             sx={{
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             spacing={2}
//           >
//             <Typography
//               variant="h3"
//               fontWeight={600}
//               style={{ color: "#0B1134CC", marginTop: "20px" }}
//             >
//               Welcome Back!
//             </Typography>
//             <Typography
//               component="p"
//               fontWeight={400}
//               style={{ color: "#0B1134CC" }}
//             >
//               Still don&apos;t have an account?{" "}
//               <Link
//                 href="/register"
//                 style={{
//                   color: "#00026E",
//                   textDecoration: "underline",
//                   fontWeight: "500",
//                 }}
//               >
//                 Create an account
//               </Link>
//             </Typography>
//           </Stack>

//           {error && (
//             <Box>
//               <Typography
//                 sx={{
//                   borderRadius: "2px",
//                   color: "#ff793f",
//                   marginTop: "5px",
//                 }}
//               >
//                 {error}
//               </Typography>
//             </Box>
//           )}

//           <Box m={5}>
//             <PHForm
//               onSubmit={handleLogin}
//               resolver={zodResolver(loginValidationSchema)}
//               defaultValues={{
//                 identifier: "",
//                 password: "",
//               }}
//             >
//               <Stack spacing={3} my={1}>
//                 <Box
//                   fontWeight={400}
//                   style={{ color: "#0B1134CC", textAlign: "start" }}
//                 >
//                   <Typography style={{ marginBottom: "10px" }}>
//                     Username or Email*
//                   </Typography>
//                   <PHInput
//                     name="identifier"
//                     label="Username or Email"
//                     type="text"
//                     fullWidth={true}
//                   />
//                 </Box>
//                 <Box
//                   fontWeight={400}
//                   style={{ color: "#0B1134CC", textAlign: "start" }}
//                 >
//                   <Typography style={{ marginBottom: "10px" }}>
//                     Password*
//                   </Typography>
//                   <PHInput
//                     name="password"
//                     label="Password"
//                     type="password"
//                     fullWidth={true}
//                   />
//                 </Box>
//               </Stack>

//               <Link href={"/"}>
//                 <Typography
//                   mb={1}
//                   textAlign="end"
//                   component="p"
//                   fontWeight={300}
//                   sx={{
//                     textDecoration: "underline",
//                   }}
//                 >
//                   Forgot Password?
//                 </Typography>
//               </Link>

//               <Button
//                 sx={{
//                   margin: "10px 0px",
//                 }}
//                 fullWidth={true}
//                 type="submit"
//               >
//                 Login
//               </Button>
//             </PHForm>

//             <Button
//               sx={{
//                 marginTop: "20px",
//               }}
//               fullWidth={true}
//               onClick={() => setOpenModal(true)}
//             >
//               Test Login
//             </Button>
//           </Box>
//         </Box>
//       </Stack>

//       <Modal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//       >
//         <Box
//           sx={{
//             backgroundColor: "white",
//             padding: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//             width: 300,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Login As
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ mb: 2 }}
//             fullWidth
//             onClick={() => handleTestLogin("admin")}
//           >
//             Login as Admin
//           </Button>
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={() => handleTestLogin("user")}
//           >
//             Login as User
//           </Button>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default LoginPage;

"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "@/constants/schema";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { toast } from "sonner";
import logo from "../../assets/images/logo.png";
import Image from "next/image";

const LoginPage = () => {
  const [error, setError] = useState("");
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
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: `url('assets/images/flat1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
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
              Login to your account and explore all the amazing features we
              offer. Lets make your journey even better.
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
              {/* Heading */}
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#0B1134CC"
                gutterBottom
              >
                Welcome Back!
              </Typography>
              <Typography variant="body1" mb={3}>
                Please login to your account to continue.
              </Typography>

              {/* Error Message */}
              {error && (
                <Typography
                  sx={{
                    color: "red",
                    marginBottom: 2,
                  }}
                >
                  {error}
                </Typography>
              )}

              {/* Form */}
              <PHForm
                onSubmit={handleLogin}
                resolver={zodResolver(loginValidationSchema)}
                defaultValues={{
                  identifier: "",
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
                      Email or Username*
                    </Typography>
                    <PHInput
                      name="identifier"
                      label="Username or Email"
                      type="text"
                      fullWidth
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
                  Login
                </Button>
              </PHForm>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    marginRight: 3,
                    backgroundColor: "#0B1134",
                    color: "white",
                    marginBottom: 2,
                    "&:hover": {
                      backgroundColor: "#061022",
                    },
                  }}
                  fullWidth
                  onClick={() => handleTestLogin("user")}
                >
                  Test User
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginLeft: 3,
                    backgroundColor: "#0B1134",
                    color: "white",
                    marginBottom: 2,
                    "&:hover": {
                      backgroundColor: "#061022",
                    },
                  }}
                  fullWidth
                  onClick={() => handleTestLogin("admin")}
                >
                  Test Admin
                </Button>
              </Box>

              {/* Additional Links */}
              <Typography sx={{ mt: 2 }}>
                Dont have an account?{" "}
                <Link href="/register">
                  <Typography
                    component="span"
                    sx={{
                      color: "#00026E",
                      fontWeight: "500",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up Now
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;
