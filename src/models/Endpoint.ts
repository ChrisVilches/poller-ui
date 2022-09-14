export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type RequestType = "HTML" | "DHTML" | "JSON";

export class Endpoint {
  id: number;
  title: string;
  rule: string;
  notificationMessage: string;
  not: boolean;
  waitAfterNotificationMinutes: number;
  timeout: number;
  periodMinutes: number;
  enabled: boolean;
  arguments: (string | boolean | number)[];
  navigations: string[];
  url: string;
  method: MethodType;
  type: RequestType;
}
