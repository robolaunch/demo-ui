"use client";

import { axiosToastController } from "@/controller/axios.controller";
import axios from "axios";

const axiosInterceptorOpenApi = axios.create({});

axiosInterceptorOpenApi.interceptors.request.use((req) => {
  const { token } = JSON.parse(localStorage.getItem("rl-auth") || "{}");

  if (token) {
    req.headers!.Authorization = `Bearer ${token}`;
  }

  return req;
});

axiosInterceptorOpenApi.interceptors.response.use((res) => {
  console.log("axios.response", res);

  axiosToastController(res);

  return res;
});

export default axiosInterceptorOpenApi;
