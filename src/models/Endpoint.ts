import { immerable } from "immer";

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type RequestType = "HTML" | "DHTML" | "JSON";

export class Endpoint {
  [immerable] = true;

  id: number;
  title = "";
  rule = "ContentEqualsRule";
  notificationMessage = "";
  not = false;
  waitAfterNotificationMinutes = 30;
  timeout: number;
  periodMinutes = 15;
  enabled: boolean;
  arguments: (string | boolean | number)[];
  navigations: string[];
  url = "";
  method: MethodType = "GET";
  type: RequestType = "HTML";
  tagIds: Set<number>;
}
