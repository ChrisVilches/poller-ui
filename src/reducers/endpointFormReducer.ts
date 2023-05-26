import { Endpoint, MethodType, RequestType } from "../models/Endpoint";
import { Tag } from "../models/Tag";

export type EndpointFormReducerAction =
| { type: "set_endpoint"; payload: Endpoint }
| { type: "set_title"; payload: string }
| { type: "set_type"; payload: RequestType }
| { type: "set_url"; payload: string }
| { type: "set_method"; payload: MethodType }
| { type: "set_rule"; payload: string }
| { type: "toggle_not"; payload?: null }
| { type: "set_wait"; payload: number }
| { type: "set_period"; payload: number }
| { type: "set_notif_msg"; payload: string }
| { type: "set_args"; payload: (string | number | boolean)[] }
| { type: "set_navs"; payload: string[] }
| { type: "set_tag_ids"; payload: Tag[] }
| { type: "toggle_tag_id"; payload: number }

export const endpointFormReducer = (draft: Endpoint, action: EndpointFormReducerAction) => {
  const { type, payload } = action;

  switch (type) {
  case "set_endpoint":
    Object.assign(draft, payload);
    break;
  case "set_title":
    draft.title = payload;
    break;
  case "set_type":
    draft.type = payload;
    break;
  case "set_url":
    draft.url = payload;
    break;
  case "set_method":
    draft.method = payload;
    break;
  case "set_rule":
    draft.rule = payload;
    draft.arguments = [];
    break;
  case "toggle_not":
    draft.not = !draft.not;
    break;
  case "set_wait":
    draft.waitAfterNotificationMinutes = payload;
    break;
  case "set_period":
    draft.periodMinutes = payload;
    break;
  case "set_notif_msg":
    draft.notificationMessage = payload;
    break;
  case "set_args":
    draft.arguments = payload;
    break;
  case "set_navs":
    draft.navigations = payload;
    break;
  case "set_tag_ids":
    draft.tagIds = new Set(payload.map((t: Tag) => t.id));
    break;
  case "toggle_tag_id":
    draft.tagIds.has(payload) ? draft.tagIds.delete(payload) : draft.tagIds.add(payload);
    break;
  default:
    throw new Error("Invalid action");
  }
};
