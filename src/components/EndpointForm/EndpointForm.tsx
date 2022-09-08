import { plainToInstance } from "class-transformer";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AdvancedConfiguration } from "./AdvancedConfiguration";
import { RequiredFields } from "./RequiredFields";
import { Endpoint } from "../../models/Endpoint";
import { EndpointService } from "../../services/EndpointService";
import { ErrorList } from "../ErrorList";

interface EditFormProps {
  endpoint: Endpoint;
  onEndpointUpserted: (e: Endpoint) => void;
  formType: "create" | "edit"
}

// TODO: This file shouldn't be called "Edit"

export const EndpointForm = ({ endpoint, onEndpointUpserted, formType }: EditFormProps) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(endpoint.title || "");
  const [rule, setRule] = useState(endpoint.rule || "ContentEqualsRule");
  const [args, setArgs] = useState(endpoint.arguments || []);
  const [navs, setNavs] = useState(endpoint.navigations || []);
  const [url, setUrl] = useState(endpoint.url || "");
  const [method, setMethod] = useState(endpoint.method);
  const [requestType, setRequestType] = useState(endpoint.type);
  const [notificationMessage, setNotificationMessage] = useState(endpoint.notificationMessage || "");
  const [waitAfterNotificationMinutes, setWaitAfterNotificationMinutes] = useState(endpoint.waitAfterNotificationMinutes);

  useEffect(() => {
    const {
      method, navigations, notificationMessage, arguments: args, type, url, rule, title, waitAfterNotificationMinutes
    } = endpoint;
    setTitle(title || "");
    setRule(rule || "ContentEqualsRule");
    setArgs(args || []);
    setNavs(navigations || []);
    setUrl(url || "");
    setMethod(method || "GET");
    setRequestType(type || "HTML");
    setNotificationMessage(notificationMessage || "");
    setWaitAfterNotificationMinutes(waitAfterNotificationMinutes || 0);
  }, [endpoint]);


  const collectPayload = () => formType === "create" ? {
    method,
    rule,
    title,
    type: requestType,
    url
  } : {
    arguments: args,
    method,
    navigations: navs,
    notificationMessage,
    rule,
    title,
    type: requestType,
    url,
    waitAfterNotificationMinutes
  };

  const sendEndpoint = async () => {
    const partialEndpoint: any = collectPayload();

    setLoading(true);

    try {
      const result: Endpoint = formType === "create" ? (
        await EndpointService.create(plainToInstance(Endpoint, partialEndpoint))
      ) : (
        await EndpointService.update(endpoint.id, plainToInstance(Endpoint, partialEndpoint))
      );

      onEndpointUpserted(result);
      setErrors([]);
    } catch (e) {
      setErrors(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onChangeRule = (ruleName: string) => {
    setArgs([]);
    setRule(ruleName);
  };

  return (
    <div className="my-4">
      <RequiredFields
        { ...{ method, onChangeRule, requestType, rule, setMethod, setRequestType, setTitle, setUrl, title, url } }
      />

      {
        formType === "edit" ? (
          <AdvancedConfiguration
            { ...{
              args, navs, notificationMessage, rule, setArgs, setNavs, setNotificationMessage, setWaitAfterNotificationMinutes, waitAfterNotificationMinutes
            } }
          />
        ) : <></>
      }

      <Button onClick={ sendEndpoint } disabled={ loading }>{ formType === "create" ? "Create" : "Update" }</Button>

      <ErrorList errors={ errors } />
    </div>
  );
};
