import rulesArgs from "../components/EndpointForm/rules-arguments.json";
import { Endpoint } from "../models/Endpoint";

export const collectPayload = (formType: string, endpoint: Endpoint) => {
  if (formType === "create") {
    const { method, rule, title, type, url } = endpoint;
    return { method, rule, title, type, url };
  }

  const {
    method, navigations, not, notificationMessage,
    periodMinutes, rule, title, type, url, waitAfterNotificationMinutes
  } = endpoint;

  return {
    arguments: endpoint.arguments,
    method,
    navigations,
    not,
    notificationMessage,
    periodMinutes,
    rule,
    tags: Array.from(endpoint.tagIds),
    title,
    type,
    url,
    waitAfterNotificationMinutes
  };
};

export const convertUsingType = (typeName: string, value: string) => {
  switch (typeName) {
  case "number":
    return +value;
  case "string":
    return value;
  case "boolean":
    return !!value;
  case "comparisonOperator":
    return value;
  default:
    throw new Error(`Invalid type name (${typeName})`);
  }
};

export const getSanitizedArgs = (endpoint: Endpoint) => {
  if (endpoint.arguments && endpoint.arguments.length) {
    return endpoint.arguments;
  }

  const defaultArgs = rulesArgs.defaultValues[endpoint.rule];

  if (!defaultArgs) {
    throw new Error("Rule has no default arguments");
  }

  return defaultArgs;
};
