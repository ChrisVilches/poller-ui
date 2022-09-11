import { http } from "./http";
import { Endpoint } from "../models/Endpoint";

export class PollingService {
  static async enqueuePolling(endpointId: number): Promise<Endpoint> {
    const { data } = await http.post(`/pollings/${endpointId}/enqueue`);
    return data;
  }
}
