// User roles
export enum UserRole {
  ADMIN = "ADMIN",
  AGENT = "AGENT",
  USER = "USER",
}

// User account status
export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

// Property types
export enum PropertyType {
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL",
}

// Property purposes
export enum Purpose {
  RENT = "RENT",
  SALE = "SALE",
}

// Booking status
export enum BookingStatus {
  PENDING = "PENDING",
  BOOKED = "BOOKED",
  REJECTED = "REJECTED",
}
