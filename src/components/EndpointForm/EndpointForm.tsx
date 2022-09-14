import { Set } from "immutable";
import React, { ReactElement, useEffect, useState } from "react";
import { AdvancedConfiguration } from "./AdvancedConfiguration";
import { RequiredFields } from "./RequiredFields";
import { Endpoint } from "../../models/Endpoint";
import { Tag } from "../../models/Tag";
import { EndpointService } from "../../services/EndpointService";
import { useEndpointTagsQuery } from "../../slices/endpointSlice";
import { ErrorList } from "../ErrorList";

interface EditFormProps {
  endpoint: Endpoint;
  onEndpointUpserted: (e: Endpoint) => void;
  formType: "create" | "edit"
  children: (form: ReactElement, saveEndpoint: () => void, saveLoading: boolean) => ReactElement
}

export const EndpointForm = ({ endpoint, onEndpointUpserted, formType, children }: EditFormProps) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(endpoint.title || "");
  const [rule, setRule] = useState(endpoint.rule || "ContentEqualsRule");
  const [args, setArgs] = useState(endpoint.arguments || []);
  const [navs, setNavs] = useState(endpoint.navigations || []);
  const [not, setNot] = useState(endpoint.not || false);
  const [url, setUrl] = useState(endpoint.url || "");
  const [periodMinutes, setPeriodMinutes] = useState(endpoint.periodMinutes);
  const [selectedTagIds, setSelectedTagIds] = useState(Set<number>());
  const [method, setMethod] = useState(endpoint.method);
  const [requestType, setRequestType] = useState(endpoint.type);
  const [notificationMessage, setNotificationMessage] = useState(endpoint.notificationMessage || "");
  const [
    waitAfterNotificationMinutes,
    setWaitAfterNotificationMinutes
  ] = useState(endpoint.waitAfterNotificationMinutes);

  useEffect(() => {
    const {
      method,
      navigations,
      not,
      notificationMessage,
      arguments: args,
      type,
      url,
      periodMinutes,
      rule,
      title,
      waitAfterNotificationMinutes
    } = endpoint;
    setTitle(title || "");
    setRule(rule || "ContentEqualsRule");
    setArgs(args || []);
    setPeriodMinutes(periodMinutes);
    setNavs(navigations || []);
    setNot(not || false);
    setUrl(url || "");
    setMethod(method || "GET");
    setRequestType(type || "HTML");
    setNotificationMessage(notificationMessage || "");
    setWaitAfterNotificationMinutes(waitAfterNotificationMinutes || 0);
  }, [endpoint]);

  // TODO: I think this doesn't reload the correct data for the correct endpoint ID that's currently selected.
  // This is most likely related to RTK Query Cache.
  // How to reproduce.
  // (1) Keep the console.log I have inside the hook below.
  // (2) Update the tags for one endpoint.
  // (3) Close, open another endpoint edit form, close, and open the endpoint you edited again.
  // (4) You should see no Network activity (query result is cached), and the tags are the same as before.
  //
  // How to solve: Invalidate cache (manually) so that the query is reloaded.
  // Since I'm using Axios for that query, it has to be done manually.
  //
  // Update: Solved by adding "reloadEndpointTags" after the Axios query.
  //         Still needs to confirm if it's fixed or not. Monkey test some more.
  const { data: endpointTags, refetch: reloadEndpointTags } = useEndpointTagsQuery(endpoint.id, {
    skip: !endpoint.id
  });

  useEffect(() => {
    setSelectedTagIds(Set((endpointTags || []).map((t: Tag) => t.id)));
  }, [endpointTags]);

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
    not,
    notificationMessage,
    periodMinutes,
    rule,
    tags: selectedTagIds.toArray(),
    title,
    type: requestType,
    url,
    waitAfterNotificationMinutes
  };

  const saveEndpoint = async () => {
    const partialEndpoint: any = collectPayload();

    setLoading(true);

    try {
      const result: Endpoint = formType === "create" ? (
        await EndpointService.create(partialEndpoint)
      ) : (
        await EndpointService.update(endpoint.id, partialEndpoint)
      );

      reloadEndpointTags();
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

  const requiredFields = (
    <RequiredFields
      { ...{
        method,
        onChangeRule,
        requestType,
        rule,
        setMethod,
        setRequestType,
        setTitle,
        setUrl,
        title,
        url
      } }
    />
  );


  // TODO: Should respond to enter key (when the user wants to send the form).
  const form = (
    <div className="mb-2">
      { formType === "create" ? requiredFields : <></> }

      { formType === "edit" ? (
        <AdvancedConfiguration
          { ...{
            args,
            endpoint,
            mainTab: requiredFields,
            navs,
            not,
            notificationMessage,
            periodMinutes,
            rule,
            selectedTagIds,
            setArgs,
            setNavs,
            setNot,
            setNotificationMessage,
            setPeriodMinutes,
            setSelectedTagIds,
            setWaitAfterNotificationMinutes,
            waitAfterNotificationMinutes
          } }
        />
      ) : <></> }

      <ErrorList className="mt-8" errors={ errors } />
    </div>
  );

  return children(form, saveEndpoint, loading);
};
