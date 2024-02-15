import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInterceptorOpenApi: any = axios.create({});

axiosInterceptorOpenApi.interceptors.request.use((req: AxiosRequestConfig) => {
  const { token } = JSON.parse(localStorage.getItem("rl-auth") || "{}");

  if (token) {
    req.headers!.Authorization = `Bearer ${token}`;
  }

  return req;
});

axiosInterceptorOpenApi.interceptors.response.use((res: AxiosResponse) => {
  console.log("axios.response", res);
  return res;
});

export default axiosInterceptorOpenApi;
