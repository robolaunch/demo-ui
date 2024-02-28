import { AxiosResponse } from "axios";
import { toast } from "sonner";

export function axiosToastController(response: AxiosResponse) {
  const { status, data } = response;
  const message = data?.message;

  if (status === 200 || status === 201) {
    if (!data?.success) {
      return toast.error(message || "Request failed");
    }

    if (data?.success && !message?.toLowerCase().includes("get")) {
      return toast.success(message || "Request success");
    }
  } else {
    toast.error(message || "Request failed");
  }
}
