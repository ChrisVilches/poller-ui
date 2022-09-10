import { plainToInstance } from "class-transformer";
import { http } from "./http";
import { Tag } from "../models/Tag";

export class TagService {
  static async findAll(): Promise<Tag[]> {
    const { data } = await http.get("/tags");
    return data.map((d: any) => plainToInstance(Tag, d));
  }

  static async endpointTags(endpointId: number) {
    const { data } = await http.get(`/endpoints/${endpointId}/tags`);
    return data.map((d: any) => plainToInstance(Tag, d));
  }
}
