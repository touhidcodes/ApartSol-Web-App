export interface TDashboardRevenue {
  type: string;
  revenue: number;
}

export interface TDashboardPropertyType {
  name: string;
  count: number;
}

export interface TDashboardBooking {
  id: string;
  property: string;
  client: string;
  date: string;
  status: string;
  amount: number;
}

export interface TDashboardProperty {
  id: string;
  title: string;
  type: string;
  price: string;
  status: string;
  location: string;
  date: string;
}

export interface TDashboardTopLocation {
  city: string;
  properties: number;
  avgPrice: string;
}

export interface TDashboardRegistrationTrend {
  date: string;
  count: number;
}

export interface TDashboardSalesData {
  month: string;
  buy: number;
  sell: number;
  rent: number;
}

export interface TDashboardUserStats {
  myProperties: number;
  myBookings: number;
  totalPropertyValue: number;
  completedBookings: number;
}
export interface TDashboardAdminStats {
  totalProperties: number;
  totalRevenue: number;
  totalUsers: number;
  userGrowth: number;
  revenueGrowth: number;
  propertyGrowth: number;
}

export interface TDashboardUserStats {
  myProperties: number;
  myBookings: number;
  totalPropertyValue: number;
  completedBookings: number;
}
