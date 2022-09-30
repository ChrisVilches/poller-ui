import React, { useContext } from "react";
import { methodOptions, requestTypeOptions, ruleOptions } from "./options";
import { EndpointFormContext, EndpointFormDispatchContext } from "../../contexts/EndpointFormContext";
import { MethodType, RequestType } from "../../models/Endpoint";
import { RuleDescription } from "../RuleDescription";
import { RuleLabel } from "../RuleLabel";

export const RequiredFields = () => {
  const dispatch = useContext(EndpointFormDispatchContext);
  const endpoint = useContext(EndpointFormContext);

  return (
    <>
      <label className="block mb-4 text-sm font-medium text-slate-100">
        <div className="mb-4">
          Title
        </div>
        <input type="text"
          value={ endpoint.title }
          onChange={ (ev) => dispatch({ payload: ev.currentTarget.value, type: "set_title" }) }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
          focus:border-blue-500 block w-full p-2.5"
          placeholder="My Favorite URL" required/>
      </label>
      <label className="block mb-4 text-sm font-medium text-slate-100">
        <div className="mb-4">
          URL
        </div>
        <div className="flex">
          <select
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 pr-10 text-sm font-medium
          text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4
          focus:outline-none focus:ring-gray-300"
            value={ endpoint.method }
            onChange={ (ev) => dispatch({ payload: ev.currentTarget.value as MethodType, type: "set_method" }) }>
            { methodOptions.map((methodName: string, idx: number) => (
              <option key={ idx } value={ methodName }>{ methodName }</option>
            )) }
          </select>
          <div className="relative w-full">
            <input
              value={ endpoint.url }
              onChange={ (ev) => dispatch({ payload: ev.currentTarget.value, type: "set_url" }) }
              placeholder="https://www.some-site.com"
              required
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100
              border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>
      </label>

      <div className="my-8">
        { requestTypeOptions.map((type: RequestType, idx: number) => (
          <label key={ idx } className="mr-6">
            <input
              type="radio"
              className="mr-2 checkbox"
              checked={ endpoint.type === type }
              onChange={ () => dispatch({ payload: type, type: "set_type" }) }/>
            { type }
          </label>
        )) }
      </div>

      <div className="space-x-2 mt-4">
        { ruleOptions.map((ruleName: string, idx: number) => (
          <button key={ idx } onClick={ () => dispatch({ payload: ruleName, type: "set_rule" }) }>
            <RuleLabel key={ idx } label={ ruleName } bold={ ruleName === endpoint.rule }/>
          </button>
        )) }
      </div>

      <div className="text-slate-200 my-4 text-sm">
        <RuleDescription ruleName={ endpoint.rule }/>
      </div>
    </>
  );
};

