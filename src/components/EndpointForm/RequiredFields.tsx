import React from "react";
import { methodOptions, requestTypeOptions, ruleOptions } from "./options";

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
    <div>
      <input type="text" value={ title } onChange={ (ev) => setTitle(ev.currentTarget.value) } />
    </div>
    <div>
      <input type="text" value={ url } onChange={ (ev) => setUrl(ev.currentTarget.value) } />
    </div>
    <div>
      <select value={ rule } onChange={ (ev) => onChangeRule(ev.currentTarget.value) }>
        { ruleOptions.map((ruleName: string, idx: number) => (
          <option key={ idx } value={ ruleName }>{ ruleName }</option>
        )) }
      </select>
      <div className="text-slate-600 my-4 text-sm">
        { ruleDescription[rule] }
      </div>
    </div>
    <div>
      <select value={ method } onChange={ (ev) => setMethod(ev.currentTarget.value as any) }>
        { methodOptions.map((methodName: string, idx: number) => (
          <option key={ idx } value={ methodName }>{ methodName }</option>
        )) }
      </select>
    </div>
    <div>
      <select value={ requestType } onChange={ (ev) => setRequestType(ev.currentTarget.value as any) }>
        { requestTypeOptions.map((requestType: string, idx: number) => (
          <option key={ idx } value={ requestType }>{ requestType }</option>
        )) }
      </select>
    </div>
  </>
);
