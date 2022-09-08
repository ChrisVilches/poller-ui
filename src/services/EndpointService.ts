import { plainToInstance } from "class-transformer";
import { Endpoint } from "../models/Endpoint";
import { http } from "./http";

export class EndpointService {
  static async findAll() {
    const { data } = await http.get('/endpoints')
    return data.map((d: any) => plainToInstance(Endpoint, d))
  }

  // TODO: Make this the standard way.
  //       CTRL+F all "try" statements to check where it's used.
  static async update(endpointId: number, endpoint: Endpoint) {
    try {
      const { data } = await http.patch(`/endpoints/${endpointId}`, endpoint)
      return plainToInstance(Endpoint, data)
    } catch(e) {
      throw e.response.data
    }
  }

  static async create(endpoint: Endpoint) {
    try {
      const { data } = await http.post(`/endpoints`, endpoint)
      return plainToInstance(Endpoint, data)
    } catch(e) {
      throw e.response.data
    }
  }

  static async setEnabled(endpointId: number, enabled: boolean) {
    const operation = enabled ? 'enable' : 'disable'
    const { data } = await http.patch(`/endpoints/${endpointId}/${operation}`)
    return data
  }
}
