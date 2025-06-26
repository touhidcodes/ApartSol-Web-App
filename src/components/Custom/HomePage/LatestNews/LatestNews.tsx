import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Container,
} from "@mui/material";
import Image from "next/image";
import { newsData } from "@/data/latestNews";

const LatestNews = () => {
  return (
    <Box sx={{ padding: 1, mb: 5 }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#00026E", mb: 3 }}
        >
          Latest News
        </Typography>
        <Grid container spacing={3}>
          {newsData.map((news) => (
            <Grid item xs={12} sm={6} md={4} key={news.id}>
              <Card
                sx={{ height: "100%", position: "relative", cursor: "pointer" }}
              >
                <Box sx={{ position: "relative", width: "100%", height: 200 }}>
                  <Image
                    src={news.image}
                    alt={news.title}
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: "4px 4px 0 0" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      backgroundColor: "#00026E",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {news.date}
                    </Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {news.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LatestNews;
