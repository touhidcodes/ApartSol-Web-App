export type TCoupon = {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  description: string;
};
