import { Type } from "class-transformer";
import { Endpoint } from "./Endpoint";

export class Tag {
  id: number;
  name: string;
  endpointsCount: number;

  @Type(() => Endpoint)
    endpoints: Endpoint[]
}
