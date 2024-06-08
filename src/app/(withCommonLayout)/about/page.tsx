import { Box, Container, Grid, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const AboutPage = () => {
  return (
    <Box sx={{ py: 5, background: "#FFF8F4" }}>
      <Container>
        {/* Mission Statement */}
        <Typography variant="h4" sx={{ mb: 3 }}>
          Mission Statement
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          At Flat Mate Finder, our mission is to revolutionize the process of
          finding flatmates by providing a seamless and efficient platform for
          users to connect with potential flatmates and find their ideal living
          arrangements.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          We strive to create a vibrant community where users can easily search
          for flats, connect with like-minded individuals, and build lasting
          relationships. Our goal is to simplify the flat-sharing experience,
          making it enjoyable and stress-free for everyone involved.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Through innovative technology, user-centric design, and a commitment
          to excellence, we aim to empower individuals to find the perfect
          flatmate and create a comfortable and harmonious living environment.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          At Flat Mate Finder, we are dedicated to fostering a sense of
          belonging, mutual respect, and trust among our users, ensuring that
          every flat-sharing experience is rewarding and fulfilling.
        </Typography>

        {/* Team Information */}
        <Typography variant="h4" sx={{ mb: 3 }}>
          Team Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontWeight: "bold" }}>
          Touhidur Zaman - Project Lead / Full-Stack Developer
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Implemented core features and functionalities.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Oversaw project management and coordination.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Developed frontend components and user interfaces.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Implemented client-side logic and interactions.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Ensured responsive design and accessibility.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Designed and implemented backend architecture.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Developed APIs and integrated with databases.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Implemented authentication and authorization mechanisms.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Designed user interfaces and wireframes.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Ensured consistency and usability across the platform.
        </Typography>

        {/* Contact Information */}
        <Typography variant="h4" sx={{ mb: 3 }}>
          Contact Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Email: touhidcodes@gmail.com
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
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
      </Container>
    </Box>
  );
};

export default AboutPage;
