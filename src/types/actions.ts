export type AuthActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export const initialAuthState: AuthActionState = {
  status: "idle",
  message: "",
};

export type CheckoutActionState = {
  status: "idle" | "success" | "error";
  message: string;
  orderNumber?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export const initialCheckoutState: CheckoutActionState = {
  status: "idle",
  message: "",
};
