import { plainToInstance } from "class-transformer";
import { http } from "./http";
import { Endpoint } from "../models/Endpoint";

export class EndpointService {
  static async findAll(): Promise<Endpoint[]> {
    const { data } = await http.get("/endpoints");
    return data.map((d: any) => plainToInstance(Endpoint, d));
  }

  // TODO: Make this the standard way. (Create a middleware that does all of this
  //       and add it to the http.ts instance)
  //       CTRL+F all "try" statements to check where it's used.
  static async update(endpointId: number, endpoint: Endpoint) {
    try {
      const { data } = await http.patch(`/endpoints/${endpointId}`, endpoint);
      return plainToInstance(Endpoint, data);
    } catch(e) {
      throw e.response.data;
    }
  }

  static async remove(endpointId: number) {
    try {
      const { data } = await http.delete(`/endpoints/${endpointId}`);
      return plainToInstance(Endpoint, data);
    } catch(e) {
      throw e.response.data;
    }
  }

  static async create(endpoint: Endpoint) {
    try {
      const { data } = await http.post("/endpoints", endpoint);
      return plainToInstance(Endpoint, data);
    } catch(e) {
      throw e.response.data;
    }
  }

  static async setEnabled(endpointId: number, enabled: boolean) {
    const operation = enabled ? "enable" : "disable";
    const { data } = await http.patch(`/endpoints/${endpointId}/${operation}`);
    return data;
  }
}
