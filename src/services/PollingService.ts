import { plainToInstance } from "class-transformer";
import { http } from "./http";
import { Endpoint } from "../models/Endpoint";
import { Polling } from "../models/Polling";

export class PollingService {
  static async poll(endpointId: number): Promise<Polling> {
    const { data } = await http.post(`/pollings/${endpointId}/poll`);
    return plainToInstance(Polling, data);
  }

  static async enqueuePolling(endpointId: number): Promise<Endpoint> {
    const { data } = await http.post(`/pollings/${endpointId}/enqueue`);
    return plainToInstance(Endpoint, data);
  }
}
