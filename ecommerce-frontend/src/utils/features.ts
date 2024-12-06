import { MessageResponse } from "../types/api-types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType, // The API response, which can either include data (success) or error (failure).
  navigate: NavigateFunction | null, // Navigation function from `react-router-dom` (optional).
  url: string // The URL to navigate to after success (optional).
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const messageResponse = error.data as MessageResponse;
    toast.error(messageResponse.message);
  }
};

export const getLastMonths = () => {
  const currentDate = moment(); 
  // moment() initializes the current date and time.

  currentDate.date(1); 
  // currentDate.date(1) sets the date to the first day of the current month. 
  //This ensures that calculations for past months are based on the beginning of each month.

  const last6Months: string[] = [];
  const last12Months: string[] = [];

  for (let i = 0; i < 6; i++) {
    // currentDate.clone() creates a copy of the current date, ensuring the original currentDate remains unchanged.
    // .subtract(i, "months") shifts the copied date back by i months. .format("MMMM") converts the date into the 
    // full month name (e.g., "January").
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last6Months.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last12Months.unshift(monthName);
  }

  return {
    last12Months,
    last6Months,
  };
};