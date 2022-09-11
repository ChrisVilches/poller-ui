import { Endpoint } from "./Endpoint";

export class Polling {
  id: number;
  error?: string;
  computedMessage: string;
  endpoint: Endpoint;
}
