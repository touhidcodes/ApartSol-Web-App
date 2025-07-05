import { TCoupon } from "@/types/Payment";

export const COUPONS: Record<string, Omit<TCoupon, "code">> = {
  WELCOME10: {
    discount: 10,
    type: "percentage",
    description: "10% off for new customers",
  },
  SAVE500: {
    discount: 500,
    type: "fixed",
    description: "$500 off on booking",
  },
  PROPERTY20: {
    discount: 20,
    type: "percentage",
    description: "20% off on property booking",
  },
  FIRSTTIME: {
    discount: 15,
    type: "percentage",
    description: "15% off for first-time users",
  },
  PREMIUM100: {
    discount: 100,
    type: "fixed",
    description: "$100 off premium properties",
  },
};
