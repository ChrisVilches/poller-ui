import { http } from "./http";
import { Endpoint } from "../models/Endpoint";

export class EndpointService {
  static async findAll(): Promise<Endpoint[]> {
    const { data } = await http.get("/endpoints");
    return data;
  }

  static async update(endpointId: number, endpoint: Partial<Endpoint>) {
    const { data } = await http.patch(`/endpoints/${endpointId}`, endpoint);
    return data;
  }

  static async remove(endpointId: number) {
    const { data } = await http.delete(`/endpoints/${endpointId}`);
    return data;
  }

  static async create(endpoint: Partial<Endpoint>) {
    const { data } = await http.post("/endpoints", endpoint);
    return data;
  }

  static async setEnabled(endpointId: number, enabled: boolean): Promise<boolean> {
    const operation = enabled ? "enable" : "disable";
    const { data } = await http.patch(`/endpoints/${endpointId}/${operation}`);
    return data;
  }
}

