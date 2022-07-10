import { singleton } from 'tsyringe';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@singleton()
export class Axios {
  public instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
  }

  async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }
}
