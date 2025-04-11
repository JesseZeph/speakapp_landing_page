import { Bounce, toast } from "react-toastify";
function showLoader(url: string) {
  return !(url || '').includes("products");
}

function handleError(error: any) {
  const response = error?.response?.data;
  if (response) {
    toast.error(response?.message, {
      progress: undefined,
    });
  }
}
export { showLoader, handleError };
