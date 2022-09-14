import { MethodType, RequestType } from "../../models/Endpoint";

export const methodOptions: MethodType[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export const requestTypeOptions: RequestType[] = ["HTML", "DHTML", "JSON"];

export const ruleOptions = ["ContentEqualsRule", "HasOccurrencesRule"];
