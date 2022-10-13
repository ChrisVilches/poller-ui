import React, { useContext } from "react";
import { EndpointFormContext, EndpointFormDispatchContext } from "../../../contexts/EndpointFormContext";
import { Toggle } from "../../Toggle";

const ruleTokens = {
  AlwaysRule: ["content"],
  ContentEqualsRule: ["content"],
  HasOccurrencesRule: ["count"]
};

export const SettingsTab = () => {
  const dispatch = useContext(EndpointFormDispatchContext);
  const endpoint = useContext(EndpointFormContext);

  return (
    <>
      <label className="block mb-4">
        <div className="mb-4 text-sm font-medium text-slate-100">
          Notification Message
        </div>

        <input
          type="text"
          value={ endpoint.notificationMessage || "" }
          onChange={ (ev) => dispatch({ payload: ev.currentTarget.value, type: "set_notif_msg" }) }
          placeholder="The website changed!"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>

        <div className="text-slate-100 my-4 text-sm">
          Tokens available in the notification message:
          <div className="rounded-md bg-slate-800 inline-block p-2 m-2 text-slate-300 text-sm font-mono">
            { ruleTokens[endpoint.rule].map(s => `%${s}%`).join(", ") }
          </div>
        </div>
      </label>

      <label className="block mb-4">
        <div className="mb-4 text-sm font-medium text-slate-100">
          Period (minutes)
        </div>
        <input
          type="number"
          value={ endpoint.periodMinutes }
          onChange={ (ev) => dispatch({ payload: +ev.currentTarget.value, type: "set_period" }) }
          placeholder="15"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </label>

      <label className="block mb-4">
        <div className="mb-4 text-sm font-medium text-slate-100">
          Wait after notification (minutes)
        </div>
        <input
          type="number"
          value={ endpoint.waitAfterNotificationMinutes }
          onChange={ (ev) => dispatch({ payload: +ev.currentTarget.value, type: "set_wait" }) }
          placeholder="60"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </label>

      <div className="block mb-4">
        <div className="mb-4 text-sm font-medium text-slate-100">
          Invert condition
        </div>
      </div>
      <Toggle checked={ endpoint.not } onChange={ () => dispatch({ type: "toggle_not" }) }/>
    </>
  );
};
