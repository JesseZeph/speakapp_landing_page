import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

function showLoader(url: string) {
  return !(url || '').includes("products");
}

function handleError(error: AxiosError<ErrorResponse>) {
  const response = error?.response?.data;
  if (response) {
    toast.error(response.message, {
      progress: undefined,
    });
  }
}
export { showLoader, handleError };
