import { User, CartItem, ShippingInfo } from "./types";

export interface UserReducerInitialState {
  loading: boolean;
  user: User | null;
}

export interface CartReducerInitialState {
  loading: boolean;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}