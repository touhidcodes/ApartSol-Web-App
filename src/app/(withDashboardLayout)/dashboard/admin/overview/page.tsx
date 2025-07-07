"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Home,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  MessageSquare,
  Filter,
  Search,
  Bell,
  Settings,
  Loader2,
} from "lucide-react";
import {
  useGetUserRegistrationTrendsQuery,
  useGetPropertyTypesDistributionQuery,
  useGetMonthlySalesDataQuery,
  useGetRecentPropertiesQuery,
  useGetRecentBookingsQuery,
  useGetTopLocationsQuery,
  useGetMonthlyRevenueBreakdownQuery,
  useGetAdminDashboardStatsQuery,
} from "@/redux/api/dashboardApi";
import {
  TDashboardAdminStats,
  TDashboardBooking,
  TDashboardProperty,
  TDashboardPropertyType,
  TDashboardRegistrationTrend,
  TDashboardRevenue,
  TDashboardSalesData,
  TDashboardTopLocation,
  TDashboardUserStats,
} from "@/types/Dashboard";
import { COLORS } from "@/data/dashboard";

const AdminDashboard = () => {
  const { data: regTrendsResponse } = useGetUserRegistrationTrendsQuery({}) as {
    data: { data: TDashboardRegistrationTrend[] } | undefined;
  };
  const regTrends = regTrendsResponse?.data ?? [];

  const { data: adminStatsResponse } = useGetAdminDashboardStatsQuery({}) as {
    data: { data: TDashboardAdminStats } | undefined;
  };
  const adminStats = adminStatsResponse?.data ?? undefined;

  const { data: propTypesResponse } = useGetPropertyTypesDistributionQuery(
    {}
  ) as {
    data: { data: TDashboardPropertyType[] } | undefined;
  };
  const propTypes = propTypesResponse?.data ?? [];

  const { data: salesDataResponse } = useGetMonthlySalesDataQuery({}) as {
    data: { data: TDashboardSalesData[] } | undefined;
  };
  const salesData = salesDataResponse?.data ?? [];

  const { data: recentPropsResponse } = useGetRecentPropertiesQuery({}) as {
    data: { data: TDashboardProperty[] } | undefined;
  };
  const recentProps = recentPropsResponse?.data ?? [];

  const { data: recentBooksResponse } = useGetRecentBookingsQuery({}) as {
    data: { data: TDashboardBooking[] } | undefined;
  };
  const recentBooks = recentBooksResponse?.data ?? [];

  const { data: topLocsResponse } = useGetTopLocationsQuery({}) as {
    data: { data: TDashboardTopLocation[] } | undefined;
  };
  const topLocs = topLocsResponse?.data ?? [];

  const { data: revBreakdownResponse } = useGetMonthlyRevenueBreakdownQuery(
    {}
  ) as {
    data:
      | { data: TDashboardRevenue[] | Record<string, TDashboardRevenue> }
      | undefined;
  };
  const revBreakdownRaw = revBreakdownResponse?.data ?? [];

  const revenueArray = Array.isArray(revBreakdownRaw)
    ? revBreakdownRaw
    : Object.values(revBreakdownRaw || {});

  const totalRev = revenueArray.reduce((sum, r) => sum + r.revenue, 0);

  const isLoading = !adminStats;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  const recentValidProps = Array.isArray(recentProps) ? recentProps : [];
  const recentValidBooks = Array.isArray(recentBooks) ? recentBooks : [];
  const validPropTypes = Array.isArray(propTypes) ? propTypes : [];
  const validTopLocs = Array.isArray(topLocs) ? topLocs : [];
  const validRevBreakdown = Array.isArray(revBreakdownRaw)
    ? revBreakdownRaw
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "UNDER_REVIEW":
        return "bg-blue-100 text-blue-800";
      case "SALE":
        return "bg-purple-100 text-purple-800";
      case "RENT":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  interface StatCardProps {
    title: string;
    value: string | number;
    change: string;
    changeType: "increase" | "decrease";
    icon: React.ElementType;
    color: string;
  }

  const StatCard = ({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    color,
  }: StatCardProps) => (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="flex items-center text-xs">
          {changeType === "increase" ? (
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
          )}
          <span
            className={
              changeType === "increase" ? "text-green-600" : "text-red-600"
            }
          >
            {change}
          </span>
          <span className="text-gray-500 ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );

  // Admin-specific stats cards
  const adminCards = [
    {
      title: "Total Properties",
      value: adminStats?.totalProperties ?? 0,
      change: `${adminStats?.propertyGrowth ?? 0}%`,
      changeType: "increase" as const,
      icon: Home,
      color: "text-blue-500",
    },
    {
      title: "Total Revenue",
      value: `$${(adminStats?.totalRevenue ?? 0).toLocaleString() ?? 0}`,
      change: `${adminStats?.revenueGrowth ?? 0}%`,
      changeType: "increase" as const,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Active Users",
      value: adminStats?.totalUsers ?? 0,
      change: `${adminStats?.userGrowth ?? 0}%`,
      changeType: "increase" as const,
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Monthly Growth",
      value: `${adminStats?.propertyGrowth ?? 0}%`,
      change: `${adminStats?.propertyGrowth ?? 0}%`,
      changeType: "increase" as const,
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your property platform and monitor performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card, i) => (
            <StatCard key={i} {...card} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Registration Trends</CardTitle>
              <CardDescription>
                New user registrations over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={regTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Types Distribution</CardTitle>
              <CardDescription>Breakdown of property types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={propTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ name, percent, x, y }) => (
                      <text
                        x={x}
                        y={y}
                        fill="#333"
                        fontSize={15}
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        {`${name} ${(percent * 100).toFixed(0)}%`}
                      </text>
                    )}
                  >
                    {propTypes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sales Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Sales Analytics</CardTitle>
            <CardDescription>
              Monthly performance across buy, sell, and rent transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="buy" stroke="#8884d8" />
                <Line type="monotone" dataKey="sell" stroke="#82ca9d" />
                <Line type="monotone" dataKey="rent" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabs for Tables */}
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">All Properties</TabsTrigger>
            <TabsTrigger value="bookings">All Bookings</TabsTrigger>
            <TabsTrigger value="locations">Top Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Properties</CardTitle>
                <CardDescription>
                  Latest property listings across platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto w-full">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Property</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentValidProps.map((p) => (
                        <tr key={p.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-2 font-medium">{p.title}</td>
                          <td className="px-4 py-2">{p.type}</td>
                          <td className="px-4 py-2 font-semibold">{p.price}</td>
                          <td className="px-4 py-2">
                            <Badge className={getStatusColor(p.status)}>
                              {p.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                            {p.location}
                          </td>
                          <td className="px-4 py-2">{p.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  Latest booking requests across platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto w-full">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Property</th>
                        <th className="px-4 py-2 text-left">Client</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentValidBooks.map((b) => (
                        <tr key={b.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-2 font-medium">
                            {b.property}
                          </td>
                          <td className="px-4 py-2">{b.client}</td>
                          <td className="px-4 py-2">{b.date}</td>
                          <td className="px-4 py-2">
                            <Badge className={getStatusColor(b.status)}>
                              {b.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-2 font-semibold">
                            {b.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>
                  Most popular cities for properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {validTopLocs.map((loc, i) => (
                    <div
                      key={loc.city}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-gray-400">
                          #{i + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{loc.city}</div>
                          <div className="text-sm text-gray-500">
                            {loc.properties} properties
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{loc.avgPrice}</div>
                        <div className="text-sm text-gray-500">Avg. Price</div>
                      </div>
                      <div className="w-24">
                        <Progress
                          value={
                            (loc.properties / (topLocs[0]?.properties || 1)) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Count by Role */}
        <Card>
          <CardHeader>
            <CardTitle>User Count by Role</CardTitle>
            <CardDescription>
              Distribution of users across roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={propTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Breakdown</CardTitle>
              <CardDescription>Revenue by property type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validRevBreakdown.map((r) => (
                  <div
                    key={r.type}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{r.type}</span>
                    <span className="font-semibold">
                      ${r.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
                {validRevBreakdown.map((r) => (
                  <Progress
                    key={r.type}
                    value={(r.revenue / totalRev) * 100}
                    className="h-2"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
              <CardDescription>Platform management shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center"
                >
                  <Home className="h-6 w-6 mb-2" />
                  <span className="text-sm">Manage Properties</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center"
                >
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm">Manage Users</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center"
                >
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-sm">View All Bookings</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center"
                >
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <span className="text-sm">System Messages</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
