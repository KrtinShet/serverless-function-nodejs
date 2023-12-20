import axios, { AxiosRequestConfig } from "axios";

const baseURL = "";
const axiosInstance = axios.create({ baseURL });

export default axiosInstance;

// -------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  // console.log("fetcher -> args", args);

  const [url, config] = Array.isArray(args) ? args : [args];
  // console.log("fetcher -> [url][config]", url, config);

  const res = await axiosInstance.get(url, { ...config });
  // console.log("fetcher -> res", res);

  return res.data;
};

// -------------------------------------------------------------

export const endpoints = {
  serverlessFunctions: "/serverless-function",
};
