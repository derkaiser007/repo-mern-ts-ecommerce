import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse,  UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

// Mutations: Mutations are for creating, updating, or deleting data.
// Queries: Queries are for retrieving data from the server, not altering it.
export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,   
    }),
    endpoints: (builder) => ({
      // Mutation for login
      login: builder.mutation<MessageResponse, User>({
        query: (user) => ({
          url: "new", // Appends "new" to the base URL
          method: "Post",  // HTTP method is POST
          body: user, // Sends the `user` object in the request body
        }),
      }),
      /*
      // Query for getting a user by ID---useGetUserQuery
      getUser: builder.query<UserResponse, string>({
        query: (id) => `${id}`, // Appends the ID to the base URL
      }),
      */
    })
})

export const getUser = async (id: string) => {
  try {
    const { data } : { data : UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation } = userAPI;

// The difference between createApi and createSlice lies in their purpose and functionality within Redux Toolkit:
// 1. createApi: createApi is part of RTK Query, designed for handling API requests and managing server-side data 
// efficiently. Simplifies API calls (creating, fetching, updating, or deleting data).
// 2. createSlice: createSlice is a Redux utility for creating reducers and associated actions in a concise and 
// readable way. Simplifies state management by creating reducers and actions in one step. Designed for managing 
// local state in Redux.