import { http } from "./http";

export class TagService {
  static async remove(tagId: number) {
    const { data } = await http.delete(`/tags/${tagId}`);
    return data;
  }

  static async update(tagId: number, name: string) {
    const { data } = await http.patch(`/tags/${tagId}`, { name });
    return data;
  }
}
