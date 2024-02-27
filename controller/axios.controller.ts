import { AxiosResponse } from "axios";
import { toast } from "sonner";

export function axiosToastController(response: AxiosResponse) {
  const { status, data } = response;
  const message = data?.message;

  if (status === 200 || status === 201) {
    if (data?.success && !message?.toLowerCase().includes("get")) {
      toast.success(message || "Request success");
    } else if (!data?.success && !message?.toLowerCase().includes("get")) {
      toast.error(message || "Request failed");
    }
  } else if (message) {
    toast.error(message);
  } else {
    toast.error("Request failed");
  }
}
