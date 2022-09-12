import { http } from "./http";
import { Tag } from "../models/Tag";

export class TagService {
  static async create(name: string): Promise<Tag> {
    const { data } = await http.post("/tags", { name });
    return data;
  }

  static async remove(tagId: number) {
    const { data } = await http.delete(`/tags/${tagId}`);
    return data;
  }
}
