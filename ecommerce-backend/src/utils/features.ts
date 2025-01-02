import mongoose from "mongoose";
import { myCache } from "../app.js";
import { InvalidateCacheProps, OrderItemType } from '../types/types.js'
import { Product } from "../models/product.js";

export const connectDB = (uri: string) => {
    mongoose
      .connect(uri, {
        dbName: "Ecommerce-TS-MERN",
      })
      .then((c) => console.log(`DB Connected to ${c.connection.host}`))
      .catch((e) => console.log(e));
};

export const invalidateCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId
}: InvalidateCacheProps) => {
  
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    const products = await Product.find({}).select("_id")

    products.forEach((i) => {
      productKeys.push(`product-${i._id}`)
    })

    myCache.del(productKeys);
  }

  if (order) {
    const ordersKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(ordersKeys);    
  }

  if (admin) {
    const adminKeys: string[] = [
      "admin-stats",
      "admin-pie-charts",
      "admin-bar-charts",
      "admin-line-charts",
    ];

    myCache.del(adminKeys);
  }
};

/*
[
  { "_id": "1", "name": "Product A", "price": 100 },
  { "_id": "2", "name": "Product B", "price": 200 },
  { "_id": "3", "name": "Product C", "price": 300 }
]

const products = await Product.find({}).select("_id");

[
  { "_id": "1" },
  { "_id": "2" },
  { "_id": "3" }
]
*/

export const reduceStock = async (orderItems: OrderItemType[]) => {

  for (let i = 0; i < orderItems.length; i++) {

    const order = orderItems[i];    
    const product = await Product.findById(order.productId);

    if (!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;

    await product.save();
  }
};