import React from "react";
import { methodOptions, requestTypeOptions, ruleOptions } from "./options";
import { RuleLabel } from "../RuleLabel";

const ruleDescription = {
  ContentEqualsRule: (
    <div>
      This rule checks exact content.
    </div>
  ),
  HasOccurrencesRule: (
    <div>
      This rule counts the occurrences of a string.
    </div>
  )
};

const ruleTokens = {
  ContentEqualsRule: ["content"],
  HasOccurrencesRule: ["count"]
};

interface RequiredFieldsProps {
  title: string
  url: string
  rule: string
  method: string
  requestType: string
  setMethod: Function
  setTitle: Function
  setUrl: Function 
  onChangeRule: Function 
  setRequestType: Function
}

export const RequiredFields = ({
  title, url, rule, method, setMethod, setTitle, setUrl, onChangeRule, setRequestType, requestType
}: RequiredFieldsProps) => (
  <>
    <label className="block mb-4 text-sm font-medium text-gray-900">
      <div className="mb-4">
        Title
      </div>
      <input type="text" value={ title } onChange={ (ev) => setTitle(ev.currentTarget.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="My Favorite URL" required/>
    </label>
    <label className="block mb-4 text-sm font-medium text-gray-900">
      <div className="mb-4">
        URL
      </div>
      <div className="flex">
        <select className="flex-shrink-0 z-10 inline-flex items-center py-2.5 pr-10 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300" value={ method } onChange={ (ev) => setMethod(ev.currentTarget.value as any) }>
          { methodOptions.map((methodName: string, idx: number) => (
            <option key={ idx } value={ methodName }>{ methodName }</option>
          )) }
        </select>
        <div className="relative w-full">
          <input value={ url } onChange={ (ev) => setUrl(ev.currentTarget.value) } className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="https://www.some-site.com" required/>
        </div>
      </div>
    </label>
    
    { requestTypeOptions.map((type: string, idx: number) => (
      <label key={ idx } className="mr-6">
        <input type="radio" className="mr-2 checkbox" checked={ requestType === type } onChange={ () => setRequestType(type) }/>
        { type }
      </label>
    )) }

    <div className="space-x-2 mt-4">
      { ruleOptions.map((ruleName: string, idx: number) => (
        <button key={ idx } onClick={ () => onChangeRule(ruleName) }>
          <RuleLabel key={ idx } label={ ruleName } bold={ ruleName === rule }/>
        </button>
      )) }
    </div>

    <div className="text-slate-600 my-4 text-sm">
      { ruleDescription[rule] }
      Tokens available in the notification message:
      <div className="rounded-md bg-gray-200 inline-block p-2 m-2 text-gray-700 text-sm font-mono">
        { ruleTokens[rule].map(s => `%${s}%`).join(", ") }
      </div>
    </div>
  </>
);
