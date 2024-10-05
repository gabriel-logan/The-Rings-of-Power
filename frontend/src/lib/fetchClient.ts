"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosRequestConfig } from "axios";

import axiosInstance from "@/service/axiosInstance";

class FetchClient {
  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await axiosInstance.get<T>(url, config);

      return response;
    } catch {
      return undefined;
    }
  }

  async post<T = any>(url: string, data: any, config?: AxiosRequestConfig) {
    try {
      const response = await axiosInstance.post<T>(url, data, config);

      return response;
    } catch {
      return undefined;
    }
  }

  async put<T = any>(url: string, data: any, config?: AxiosRequestConfig) {
    try {
      const response = await axiosInstance.put<T>(url, data, config);

      return response;
    } catch {
      return undefined;
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await axiosInstance.delete<T>(url, config);

      return response;
    } catch {
      return undefined;
    }
  }
}

const fetchClient = new FetchClient();

export default fetchClient;
