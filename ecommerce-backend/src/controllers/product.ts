import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { NewProductRequestBody, SearchRequestQuery, BaseQuery } from "../types/types.js";
import { Request } from "express";
import ErrorHandler from "../utils/utility-class.js";
// The fs module in Node.js stands for "file system". It provides an API to interact with the file system, 
// enabling your application to read, write, delete, and manage files and directories on your system.
// The fs module includes both: Synchronous APIs (blocking) and Asynchronous APIs (non-blocking).
// rm method is used to remove files or directories. rm(path, callback)
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
// import { faker } from "@faker-js/faker";

export const newProduct = TryCatch(
    async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
      
      const { name, price, stock, category } = req.body;
      const photo = req.file;

      if (!photo) return next(new ErrorHandler("Please add Photo", 400));

      if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
          console.log("Deleted");
        });
  
        return next(new ErrorHandler("Please enter All Fields", 400));
      }
  
      await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo.path,
      });

      await invalidateCache({ product: true, admin: true });
  
      return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
      });
    }
);

// Revalidate on New,Update,Delete Product & on New Order
export const getlatestProducts = TryCatch(async (req, res, next) => {
    
    let products;

    if (myCache.has("latest-products"))
      products = JSON.parse(myCache.get("latest-products") as string);
    else {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
      myCache.set("latest-products", JSON.stringify(products));
    }    
  
    return res.status(200).json({
      success: true,
      products,
    });
});

// Revalidate on New,Update,Delete Product & on New Order
export const getAllCategories = TryCatch(async (req, res, next) => {
  
    let categories;

    if (myCache.has("categories"))
      categories = JSON.parse(myCache.get("categories") as string);
    else {
      categories = await Product.distinct("category");
      myCache.set("categories", JSON.stringify(categories));
    }    
  
    return res.status(200).json({
      success: true,
      categories,
    });
});

// Revalidate on New,Update,Delete Product & on New Order
export const getAdminProducts = TryCatch(async (req, res, next) => {
    
    let products;

    if (myCache.has("all-products"))
      products = JSON.parse(myCache.get("all-products") as string);
    else {
      products = await Product.find({});
      myCache.set("all-products", JSON.stringify(products));
    }
  
    return res.status(200).json({
      success: true,
      products,
    });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
    
    let product;
    const id = req.params.id;

    if (myCache.has(`product-${id}`))
      product = JSON.parse(myCache.get(`product-${id}`) as string);
    else {
      product = await Product.findById(id);  
      if (!product) return next(new ErrorHandler("Product Not Found", 404));  
      myCache.set(`product-${id}`, JSON.stringify(product));
    }
  
    return res.status(200).json({
      success: true,
      product,
    });
});

export const updateProduct = TryCatch(async (req, res, next) => {

    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    const product = await Product.findById(id);
  
    if (!product) return next(new ErrorHandler("Product Not Found", 404));
  
    if (photo) {
      rm(product.photo!, () => {
        console.log("Old Photo Deleted");
      });
      product.photo = photo.path;
    }
  
    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
  
    await product.save();

    await invalidateCache({ product: true, productId: String(product._id) });
  
    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
    });
});

export const deleteProduct = TryCatch(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product Not Found", 404));
  
    rm(product.photo!, () => {
      console.log("Product Photo Deleted");
    });
  
    await product.deleteOne();

    await invalidateCache({ product: true, productId: String(product._id) });
  
    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
});

export const getAllProducts = TryCatch(
    async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
      
      const { search, sort, category, price } = req.query;
  
      const page = Number(req.query.page) || 1;
      // 1,2,3,4,5,6,7,8
      // 9,10,11,12,13,14,15,16
      // 17,18,19,20,21,22,23,24
      const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
      const skip = (page - 1) * limit;
  
      const baseQuery: BaseQuery = {};
  
      if (search)
        baseQuery.name = {
          $regex: search,
          $options: "i",
        };
  
      if (price)
        baseQuery.price = {
          $lte: Number(price),
        };
  
      if (category) baseQuery.category = category;
  
      const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);
  
      const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        Product.find(baseQuery)
      ]);
      // Using Promise.all in the way shown has significant benefits, particularly in terms of efficiency 
      // and maintainability. Both productsPromise and Product.find(baseQuery) queries run simultaneously.
      // Promise.all waits for both promises to resolve before continuing. Queries that are independent can 
      // execute in parallel, reducing total execution time compared to running them sequentially (one after 
      // the other).
      // If each query takes T1 and T2 seconds, running them sequentially would take 𝑇1+𝑇2 seconds.
      // Using Promise.all, the total time is approximately the longer of the two durations max(T1,T2) seconds.
  
      const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
  
      return res.status(200).json({
        success: true,
        products,
        totalPage,
      });
    }
);

/*
const [products, filteredOnlyProduct] = await Promise.all([
  productsPromise,
  Product.find(baseQuery)
]);

console.log("All Products:", products);
console.log("Filtered Products:", filteredOnlyProduct);

All Products: [
  { _id: "1", name: "Laptop", price: 1000 },
  { _id: "2", name: "Phone", price: 700 },
  { _id: "3", name: "Tablet", price: 300 }
]

Filtered Products: [
  { _id: "3", name: "Tablet", price: 300 }
]
*/

/*
const generateRandomProducts = async (count: number = 10) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const product = {
      name: faker.commerce.productName(),
      photo: "dfertrbnhyg56746.png",
      price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
      stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
      category: faker.commerce.department(),
      createdAt: new Date(faker.date.past()),
      updatedAt: new Date(faker.date.recent()),
      __v: 0,
    };

    products.push(product);
  }

  await Product.create(products);
  console.log({ succecss: true });
};

generateRandomProducts(30)
*/

/*
const deleteRandomProducts = async (count: number = 10) => {
  const products = await Product.find({}).skip(2);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    await product.deleteOne();
  }

  console.log({ succecss: true });
};

deleteRandomProducts()
*/


  