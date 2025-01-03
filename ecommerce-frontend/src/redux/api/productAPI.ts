import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllProductsResponse,
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductRequest,
} from "../../types/api-types";

export const productAPI = createApi({
  reducerPath: "productApi", // optional, string, default: "api"
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }), // required, can have Custom Query
  tagTypes: ["product"], // optional, array
  endpoints: (builder) => ({ // required
    latestProducts: builder.query<AllProductsResponse, string>({
      // AllProductsResponse: This represents the type of data returned by the query.
      // string: The string type for the argument is currently unused, but it could serve as a placeholder for 
      // future functionality.
      query: () => "latest",
      providesTags: ["product"], 
    }),

    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),

    categories: builder.query<CategoriesResponse, string>({
      query: () => `categories`,
      providesTags: ["product"],
    }),

    searchProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ["product"],
    }),

    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),

    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"], 
    }),

    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useProductDetailsQuery,
  useNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productAPI;

// tagTypes: Tags help automatically invalidate or refetch related queries when a mutation is performed.
// providesTags: The providesTags field in RTK Query is used to specify the tags that a query will provide when 
// it fetches data successfully. 
// invalidatesTags: invalidatesTags is used in mutations because mutations change data on the server, which might 
// require the client to refetch the latest data. It signals that the data represented by a specific tag is no 
// longer valid. When the mutation invalidates the tag, the queries are refetched to get updated data.