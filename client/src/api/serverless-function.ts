import useSWR from "swr";
import axiosInstance, { endpoints, fetcher } from "../utils/axios-instance";
import { useMemo } from "react";

const SERVERLESS_FUNCTION_API_URL = endpoints.serverlessFunctions;

export type IServerlessFunctionProps = {
  route: string;
  httpMethod: string;
  functionName: string;
  functionCode: string;
  functionId: string;
};
export type IServerlessFunctionResponse = {
  errorMessage?: string;
  successMessage?: string;
};

// -----------------------------------------------------------------
export function useGetAllServerlessFunctions() {
  const { data, isLoading, error } = useSWR<IServerlessFunctionProps[]>(
    SERVERLESS_FUNCTION_API_URL,
    fetcher
  );

  const memoizedValues = useMemo(
    () => ({
      functions: data,
      isLoading,
      error,
    }),
    [data, isLoading, error]
  );

  return memoizedValues;
}
// -----------------------------------------------------------------
export function useGetServerlessFunctions(id: string) {
  const { data, isLoading, error } = useSWR<IServerlessFunctionProps>(
    SERVERLESS_FUNCTION_API_URL + `/${id}`,
    fetcher
  );

  const memoizedValues = useMemo(
    () => ({
      data,
      isLoading,
      error,
    }),
    [data, isLoading, error]
  );

  return memoizedValues;
}

// -----------------------------------------------------------------

export async function createServerlessFunction({
  functionId,
  ...rest
}: IServerlessFunctionProps): Promise<IServerlessFunctionResponse> {
  try {
    await axiosInstance.post(
      SERVERLESS_FUNCTION_API_URL + `/${functionId}`,
      rest
    );
    return {
      successMessage: "Serverless function created successfully",
    };
  } catch (error) {
    return {
      errorMessage: "Error creating serverless function",
    };
  }
}

// -----------------------------------------------------------------

export async function updateSeverlessFunction({
  functionId,
  ...rest
}: Partial<IServerlessFunctionProps>): Promise<IServerlessFunctionResponse> {
  try {
    await axiosInstance.put(
      SERVERLESS_FUNCTION_API_URL + `/${functionId}`,
      rest
    );
    return {
      successMessage: "Serverless function updated successfully",
    };
  } catch (error) {
    return {
      errorMessage: "Error updating serverless function",
    };
  }
}
// -----------------------------------------------------------------

export async function deleteSeverlessFunction(
  functionId: string
): Promise<IServerlessFunctionResponse> {
  try {
    await axiosInstance.delete(SERVERLESS_FUNCTION_API_URL + `/${functionId}`);
    return {
      successMessage: "Serverless function Deleted successfully",
    };
  } catch (error) {
    return {
      errorMessage: "Error Deleting serverless function",
    };
  }
}
