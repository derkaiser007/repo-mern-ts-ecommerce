import { Request, Response, NextFunction } from "express";

export interface NewUserRequestBody {
    _id: string;
    name: string;
    email: string;
    photo: string;
    gender: string;
    dob: Date;
}

export interface NewProductRequestBody {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
// req: Request: Represents the HTTP request object from Express. Provides details about the incoming request, such as req.body, req.params, and req.query.
// res: Response: Represents the HTTP response object from Express. Used to send responses back to the client, e.g., res.json() or res.send().
// next: NextFunction: A callback function used to pass control to the next middleware in the pipeline. Commonly used for error handling or when multiple middlewares are chained.
// Promise<void>: Indicates the function is asynchronous and does not return a value directly. Used when a controller performs an action (e.g., saving to a database) without sending a response.
// Promise<Response<any, Record<string, any>>>: Indicates the controller may return an Express Response object. Example: return res.json({ success: true });


export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
};

export type InvalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
  userId?: string;
  orderId?: string;
  productId?: string | string[];
};

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}