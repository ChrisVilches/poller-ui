import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { Tooltip } from "flowbite-react"
import { useState } from "react";
import { Endpoint } from "../models/Endpoint"
import { EndpointService } from "../services/EndpointService";
import { Checkbox } from "./Checkbox";
import { EndpointTitle } from "./EndpointTitle";

interface EndpointItemProps {
  endpoint: Endpoint;
  toggleEnable: Function;
  replaceItem: Function;
}

export const EndpointItem = ({ endpoint, toggleEnable, replaceItem }: EndpointItemProps) => {
  const [loading, setLoading] = useState(false);

  const toggleEnableAux = async () => {
    setLoading(true)
    try {
      toggleEnable(
        await EndpointService.setEnabled(endpoint.id, !endpoint.enabled)
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="my-4">
      <div><EndpointTitle title={endpoint.title}/></div>
      <div>
        Wait (minutes) after notification:
        <Tooltip content="After a notification has been dispatched, wait until the next polling.">
          <QuestionMarkCircleIcon className="w-5 h-5"/>
        </Tooltip>
        {endpoint.waitAfterNotificationMinutes}
      </div>
      <div>Rule: {endpoint.rule}</div>
      <div>
        <Checkbox disabled={loading} checked={endpoint.enabled} onChange={toggleEnableAux} label="Enabled"/>
      </div>
    </div>
  )
}
