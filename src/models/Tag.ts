import { Endpoint } from "./Endpoint";

export class Tag {
  id: number;
  name: string;
  endpointsCount: number;
  endpoints: Endpoint[];
}
