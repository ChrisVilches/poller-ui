import { Type } from "class-transformer";
import { Endpoint } from "./Endpoint";

export class Polling {
  id: number;
  error?: string;

  @Type(() => Endpoint)
    endpoint: Endpoint;
}
