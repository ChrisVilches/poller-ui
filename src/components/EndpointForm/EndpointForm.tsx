import { plainToInstance } from "class-transformer";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AdvancedConfiguration } from "./AdvancedConfiguration";
import { RequiredFields } from "./RequiredFields";
import { Endpoint } from "../../models/Endpoint";
import { Tag } from "../../models/Tag";
import { EndpointService } from "../../services/EndpointService";
import { useEndpointTagsQuery } from "../../slices/endpointSlice";
import { useFindAllQuery } from "../../slices/tagSlice";
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
  const [not, setNot] = useState(endpoint.not || false);
  const [url, setUrl] = useState(endpoint.url || "");
  const [method, setMethod] = useState(endpoint.method);
  const [requestType, setRequestType] = useState(endpoint.type);
  const [notificationMessage, setNotificationMessage] = useState(endpoint.notificationMessage || "");
  const [waitAfterNotificationMinutes, setWaitAfterNotificationMinutes] = useState(endpoint.waitAfterNotificationMinutes);

  useEffect(() => {
    const {
      method, navigations, not, notificationMessage, arguments: args, type, url, rule, title, waitAfterNotificationMinutes
    } = endpoint;
    setTitle(title || "");
    setRule(rule || "ContentEqualsRule");
    setArgs(args || []);
    setNavs(navigations || []);
    setNot(not || false);
    setUrl(url || "");
    setMethod(method || "GET");
    setRequestType(type || "HTML");
    setNotificationMessage(notificationMessage || "");
    setWaitAfterNotificationMinutes(waitAfterNotificationMinutes || 0);
  }, [endpoint]);

  const { data: allTags = [], isLoading: allLoading } = useFindAllQuery();

  const { data: endpointTags = [], isLoading: endpointTagsLoading, fulfilledTimeStamp } = useEndpointTagsQuery(endpoint.id, {
    skip: !endpoint.id
  });

  const [selectedTags, setSelectedTags] = useState([] as Tag[]);

  useEffect(() => {
    setSelectedTags(endpointTags);
  }, [fulfilledTimeStamp]);

  const isTagSelected = (tagId: number) => !!selectedTags.find((t: Tag) => t.id === tagId);

  const toggleSelectTag = (tagId: number) => {
    if(isTagSelected(tagId)) {
      setSelectedTags(state => {
        const newState = [...state];
        return newState.filter((t: Tag) => t.id !== tagId);
      });
      return;
    }
    setSelectedTags(state => {
      const newState = [...state];
      const t = new Tag();
      t.id = tagId;
      newState.push(t);
      return newState;
    });
  };


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
    rule,
    tags: selectedTags,
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
      {
        !allLoading && !endpointTagsLoading ? (
          <div className="space-x-2 mb-2">
            { allTags.map((tag: Tag) => (
              <button key={ tag.id } onClick={ () => toggleSelectTag(tag.id) }>
                <span className={ `${isTagSelected(tag.id) ? "bg-slate-400" : "bg-slate-300"} text-white rounded-md p-2 unselectable` }>
                  { tag.name }
                </span>
              </button>
            )) }
          </div>
        ) : (
          <div>Loading</div>
        )
      }
      <RequiredFields
        { ...{ method, onChangeRule, requestType, rule, setMethod, setRequestType, setTitle, setUrl, title, url } }
      />

      {
        formType === "edit" ? (
          <AdvancedConfiguration
            { ...{
              args, navs, not, notificationMessage, rule, setArgs, setNavs, setNot, setNotificationMessage, setWaitAfterNotificationMinutes, waitAfterNotificationMinutes
            } }
          />
        ) : <></>
      }

      <Button onClick={ sendEndpoint } disabled={ loading }>{ formType === "create" ? "Create" : "Update" }</Button>

      <ErrorList className="mt-8" errors={ errors } />
    </div>
  );
};
