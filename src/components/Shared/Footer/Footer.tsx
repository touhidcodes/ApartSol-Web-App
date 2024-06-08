import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box sx={{ py: 5, background: "#222", color: "#fff" }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: touhidcodes@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +1234567890
            </Typography>
            {/* Social Media Links */}
            <Box sx={{ display: "flex" }}>
              <Link href="#" color="inherit" sx={{ mr: 1 }}>
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ mr: 1 }}>
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon />
              </Link>
            </Box>
          </Grid>

          {/* Copyright Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              © 2024 Flat Mate Finder. All rights reserved.
            </Typography>
          </Grid>

          {/* Additional Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Additional Links
            </Typography>
            <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
              Terms of Use
            </Link>
            <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
              Privacy Policy
            </Link>
            {/* Add more additional links as needed */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
