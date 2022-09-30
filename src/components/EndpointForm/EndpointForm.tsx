import React, { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { AdvancedConfiguration } from "./AdvancedConfiguration";
import { RequiredFields } from "./RequiredFields";
import {
  EndpointFormContext,
  EndpointFormContextProvider,
  EndpointFormDispatchContext
} from "../../contexts/EndpointFormContext";
import { Endpoint } from "../../models/Endpoint";
import { EndpointService } from "../../services/EndpointService";
import { useEndpointTagsQuery } from "../../slices/endpointSlice";
import { collectPayload } from "../../util/endpoint";
import { ErrorList } from "../ErrorList";

interface EditFormProps {
  endpoint: Endpoint;
  onEndpointUpserted: (e: Endpoint) => void;
  formType: "create" | "edit";
  children: (form: ReactElement, saveEndpoint: () => void, saveLoading: boolean) => ReactElement;
}

const EndpointFormAux = ({ endpoint, onEndpointUpserted, formType, children }: EditFormProps) => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: endpointTags, refetch: reloadEndpointTags } = useEndpointTagsQuery(endpoint.id, {
    skip: !endpoint.id
  });

  const endpointState = useContext(EndpointFormContext);
  const dispatch = useContext(EndpointFormDispatchContext);

  useEffect(() => {
    dispatch({ payload: endpointTags || [], type: "set_tag_ids" });
  }, [endpointTags, dispatch]);

  const saveEndpoint = async () => {
    const partialEndpoint: Partial<Endpoint> = collectPayload(formType, endpointState);

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

  // TODO: Should respond to enter key (when the user wants to send the form).
  const form = useMemo(() => (
    <div className="mb-2">
      { formType === "create" ? <RequiredFields/> : <AdvancedConfiguration/> }
      <ErrorList className="mt-8" errors={ errors } />
    </div>
  ), [formType, errors]);

  return children(form, saveEndpoint, loading);
};

const createBlankEndpoint = () => {
  const result = new Endpoint();
  return result;
};

export const EndpointForm = (props: EditFormProps) => {
  const endpoint = props.endpoint.id ? props.endpoint : createBlankEndpoint();

  return (
    <EndpointFormContextProvider endpoint={ endpoint }>
      <EndpointFormAux { ...props }/>
    </EndpointFormContextProvider>
  );
};
