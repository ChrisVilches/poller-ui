import { plainToInstance } from "class-transformer";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { Endpoint } from "../../models/Endpoint";
import { EndpointService } from "../../services/EndpointService";
import { ErrorList } from "../ErrorList";
import { AdvancedConfiguration } from "./AdvancedConfiguration";
import { RequiredFields } from "./RequiredFields";

interface EditFormProps {
  endpoint: Endpoint;
  onEndpointUpserted: (e: Endpoint) => void;
  formType: 'create' | 'edit'
}

// TODO: This file shouldn't be called "Edit"

export const EndpointForm = ({ endpoint, onEndpointUpserted, formType }: EditFormProps) => {
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState(endpoint.title || '');
  const [rule, setRule] = useState(endpoint.rule || 'ContentEqualsRule');
  const [args, setArgs] = useState(endpoint.arguments || [])
  const [navs, setNavs] = useState(endpoint.navigations || [])
  const [url, setUrl] = useState(endpoint.url || '')
  const [method, setMethod] = useState(endpoint.method)
  const [requestType, setRequestType] = useState(endpoint.type)
  const [notificationMessage, setNotificationMessage] = useState(endpoint.notificationMessage || '')
  const [waitAfterNotificationMinutes, setWaitAfterNotificationMinutes] = useState(endpoint.waitAfterNotificationMinutes);

  useEffect(() => {
    setTitle(endpoint.title || '')
    setRule(endpoint.rule || 'ContentEqualsRule')
    setArgs(endpoint.arguments || [])
    setNavs(endpoint.navigations || [])
    setUrl(endpoint.url || '')
    setMethod(endpoint.method || 'GET')
    setRequestType(endpoint.type || 'HTML')
    setNotificationMessage(endpoint.notificationMessage || '')
    setWaitAfterNotificationMinutes(endpoint.waitAfterNotificationMinutes || 0)
  }, [endpoint.method, endpoint.navigations, endpoint.notificationMessage, endpoint.type, endpoint.url])

  const collectPayload = () => formType === 'create' ? {
    title,
    rule,
    url,
    type: requestType,
    method
  } : {
    waitAfterNotificationMinutes,
    rule,
    title,
    arguments: args,
    navigations: navs,
    url,
    notificationMessage,
    method,
    type: requestType
  }

  const sendEndpoint = async () => {
    const partialEndpoint: any = collectPayload()

    setLoading(true)

    try {
      if (formType === 'create') {
        const updatedEndpoint: Endpoint = await EndpointService.create(plainToInstance(Endpoint, partialEndpoint));
        onEndpointUpserted(updatedEndpoint)
      } else {
        const updatedEndpoint: Endpoint = await EndpointService.update(endpoint.id, plainToInstance(Endpoint, partialEndpoint));
        onEndpointUpserted(updatedEndpoint)
      }

      setErrors([])
    } catch (e) {
      setErrors(e.message)
    } finally {
      setLoading(false)
    }
  }

  const onChangeRule = (ruleName: string) => {
    setArgs([])
    setRule(ruleName)
  }

  return (
    <div className="my-4">
      <RequiredFields
      {...{title, url, rule, method, setMethod, setTitle, setUrl, onChangeRule, setRequestType, requestType }}
      />

      {
        formType === "edit" ? (
          <AdvancedConfiguration
          {...{notificationMessage, setNotificationMessage, rule, navs, args, setArgs,
            setNavs, waitAfterNotificationMinutes, setWaitAfterNotificationMinutes}}
          />
        ) : <></>
      }

      <Button onClick={sendEndpoint} disabled={loading}>{formType === 'create' ? 'Create' : 'Update'}</Button>

      <ErrorList errors={errors} />
    </div>
  )
}
