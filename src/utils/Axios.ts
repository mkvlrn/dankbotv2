import axios, { AxiosInstance } from 'axios';

export class Axios {
  private static instance: AxiosInstance;

  private constructor() {
    //
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = axios.create();
    }

    return this.instance;
  }
}
