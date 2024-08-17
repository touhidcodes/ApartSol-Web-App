"use client";
import Loading from "@/components/UI/Loading/Loading";
import {
  useGetMonthlyTotalUsersQuery,
  useGetTotalBookingsCountQuery,
  useGetTotalPostCountQuery,
  useGetTotalUserCountQuery,
  useGetUserByRoleQuery,
  useGetUserRegistrationTrendsQuery,
} from "@/redux/api/dashboard";
import { Container, Typography, Paper, Grid } from "@mui/material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const { data: registrationTrends, isLoading: isLoadingTrends } =
    useGetUserRegistrationTrendsQuery(undefined);
  const { data: monthlyUsers, isLoading: isLoadingTotal } =
    useGetMonthlyTotalUsersQuery(undefined);
  const { data: roles, isLoading: isLoadingRoles } =
    useGetUserByRoleQuery(undefined);
  const { data: totalUsers, isLoading: totalUserLoading } =
    useGetTotalUserCountQuery(undefined);
  const { data: totalBookings, isLoading: totalBookingsLoading } =
    useGetTotalBookingsCountQuery(undefined);
  const { data: totalPost, isLoading: totalPostLoading } =
    useGetTotalPostCountQuery(undefined);

  if (
    isLoadingTrends ||
    isLoadingTotal ||
    isLoadingRoles ||
    totalUserLoading ||
    totalBookingsLoading ||
    totalPostLoading
  )
    return <Loading />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={5}>
        {/* Line Chart for Registration Trends */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Registration Trends By This Month: ({monthlyUsers?.month})
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={registrationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  fillOpacity={0.3}
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* 2nd row Card (Spans 4 columns) */}
        <Grid item xs={12} md={4}>
          <Grid container gap={5}>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#DCFCE7",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                width: "80%",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Monthly Total Users</Typography>
              <Typography variant="h4">{monthlyUsers?.count}</Typography>
            </Paper>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#F4E8FF",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                width: "80%",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{totalUsers}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* 2nd row  */}
        <Grid item xs={12} md={4}>
          <Grid container gap={5}>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#FFE2E6",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                width: "80%",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Total Post</Typography>
              <Typography variant="h4">{totalPost}</Typography>
            </Paper>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#FFF4DE",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                width: "80%",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4">{totalBookings}</Typography>
            </Paper>
          </Grid>
        </Grid>
        {/* Bar Chart for User Count by Role (Spans 12 columns) */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              User Count by Role
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roles}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
