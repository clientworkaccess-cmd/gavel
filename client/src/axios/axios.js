import { toast } from "react-toastify";
import apiClient from ".";

// ✅ Reusable function for error handling
const handleError = (error, customMessage = "Something went wrong") => {
  const msg =
    error?.response?.data?.message ||
    error?.message ||
    customMessage;
  toast.error(msg);
  console.error("API Error:", msg);
  return { error: true, message: msg };
};

// ✅ GET Request
export const getReq = async (path) => {
  try {
    const response = await apiClient.get(path);
    return response?.data;
  } catch (error) {
    console.log(error?.response?.message);
  }
};

// ✅ POST Request
export const postReq = async (path, data) => {
  try {
    const response = await apiClient.post(path, data);
    toast.success(response?.data?.message || "Request successful!");
    return response?.data;
  } catch (error) {
    return handleError(error, "Failed to submit data");
  }
};

// ✅ PUT Request
export const putReq = async (path, data) => {
  try {
    const response = await apiClient.put(path, data);
    toast.success(response?.data?.message || "Update successful!");
    return response?.data;
  } catch (error) {
    return handleError(error, "Failed to update data");
  }
};

// ✅ DELETE Request
export const deletReq = async (path) => {
  try {
    const response = await apiClient.delete(path);
    toast.success(response?.data?.message || "Delete successful!");
    return response?.data;
  } catch (error) {
    return handleError(error, "Failed to delete data");
  }
};
