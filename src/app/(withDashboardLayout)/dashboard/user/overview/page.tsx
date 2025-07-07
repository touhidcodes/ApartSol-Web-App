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
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  MapPin,
  Home,
  Calendar,
  Eye,
  Heart,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetUserDashboardStatsQuery,
  useGetUserMonthlyRevenueBreakdownQuery,
  useGetUserMonthlySalesDataQuery,
  useGetUserPropertyBookingTrendsQuery,
  useGetUserPropertyTypesDistributionQuery,
  useGetUserRecentBookingsQuery,
  useGetUserRecentPropertiesQuery,
} from "@/redux/api/dashboardApi";
import { COLORS } from "@/data/dashboard";
import { TDashboardUserStats } from "@/types/Dashboard";

interface RevenueData {
  type: string;
  revenue: number;
}

interface PropertyData {
  id: string;
  title: string;
  type: string;
  price: number;
  status: string;
  location: string;
}

interface BookingData {
  id: string;
  property: string;
  client: string;
  date: string;
  status: string;
  amount: number;
}

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

const getStatusColor = (status: string): string => {
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

const UserDashboard = () => {
  const { data: userStatsResponse } = useGetUserDashboardStatsQuery({});
  const userStats: TDashboardUserStats = userStatsResponse?.data ?? [];

  const { data: propTypesResponse } = useGetUserPropertyTypesDistributionQuery(
    {}
  );
  const propTypes = propTypesResponse?.data ?? [];

  const { data: salesDataResponse } = useGetUserMonthlySalesDataQuery({});
  const salesData = salesDataResponse?.data ?? [];

  const { data: recentPropsResponse } = useGetUserRecentPropertiesQuery({});
  const recentProps: PropertyData[] = recentPropsResponse?.data ?? [];

  const { data: recentBooksResponse } = useGetUserRecentBookingsQuery({});
  const recentBooks: BookingData[] = recentBooksResponse?.data ?? [];

  const { data: revBreakdownResponse } = useGetUserMonthlyRevenueBreakdownQuery(
    {}
  );
  const revBreakdownRaw = revBreakdownResponse?.data ?? [];

  const { data: bookingTrendsResponse } = useGetUserPropertyBookingTrendsQuery(
    {}
  );
  const bookingTrends = bookingTrendsResponse?.data ?? [];

  const revenueArray: RevenueData[] = Array.isArray(revBreakdownRaw)
    ? revBreakdownRaw
    : Object.values(revBreakdownRaw || {});
  const totalRev = revenueArray.reduce((sum, r) => sum + r.revenue, 0);

  const userCards = [
    {
      title: "My Properties",
      value: userStats.myProperties ?? 0,
      change: "+3",
      changeType: "increase" as const,
      icon: Home,
      color: "text-blue-500",
    },
    {
      title: "My Bookings",
      value: userStats.myBookings ?? 0,
      change: "+5",
      changeType: "increase" as const,
      icon: Calendar,
      color: "text-green-500",
    },
    {
      title: "Property Value",
      value: userStats.totalPropertyValue ?? 0,
      change: "+10%",
      changeType: "increase" as const,
      icon: Eye,
      color: "text-purple-500",
    },
    {
      title: "Completed",
      value: userStats.completedBookings ?? 0,
      change: "+2",
      changeType: "increase" as const,
      icon: Heart,
      color: "text-red-500",
    },
  ];

  const isLoading = !userStats;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {userCards.map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Trends</CardTitle>
          <CardDescription>Monthly bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bookingTrends}>
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
          <CardTitle>Property Type Distribution</CardTitle>
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
                {propTypes.map((entry: unknown, index: number) => (
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

      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
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

      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueArray.map((r: RevenueData) => (
              <div key={r.type} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">{r.type}</span>
                  <span className="font-semibold">
                    ${r.revenue.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={(r.revenue / totalRev) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="properties">Recent Properties</TabsTrigger>
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>My Properties</CardTitle>
              <CardDescription>Your 10 most recent listings</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-4 py-2">Title</th>
                    <th className="text-left px-4 py-2">Type</th>
                    <th className="text-left px-4 py-2">Price</th>
                    <th className="text-left px-4 py-2">Status</th>
                    <th className="text-left px-4 py-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProps.map((p: PropertyData) => (
                    <tr key={p.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-2 font-medium">{p.title}</td>
                      <td className="px-4 py-2">{p.type}</td>
                      <td className="px-4 py-2">${p.price.toLocaleString()}</td>
                      <td className="px-4 py-2">
                        <Badge className={getStatusColor(p.status)}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {p.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>Your 10 most recent bookings</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-4 py-2">Property</th>
                    <th className="text-left px-4 py-2">Client</th>
                    <th className="text-left px-4 py-2">Date</th>
                    <th className="text-left px-4 py-2">Status</th>
                    <th className="text-left px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBooks.map((b: BookingData) => (
                    <tr key={b.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-2 font-medium">{b.property}</td>
                      <td className="px-4 py-2">{b.client}</td>
                      <td className="px-4 py-2">{b.date}</td>
                      <td className="px-4 py-2">
                        <Badge className={getStatusColor(b.status)}>
                          {b.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        ${b.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
