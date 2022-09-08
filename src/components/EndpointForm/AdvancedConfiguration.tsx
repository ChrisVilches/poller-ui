import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import React from "react";
import { ArgumentsForm } from "./ArgumentsForm";
import { NavigationsForm } from "./NavigationsForm";

// TODO: This can be improved by also adding description, and
// storing this data in a localization system (along with the other texts.)
const ruleTokens = {
  ContentEqualsRule: ["content"],
  HasOccurrencesRule: ["count"]
};

const ruleToArgumentTypes = (ruleName: string): ("string" | "boolean" | "number")[] => {
  switch (ruleName) {
  case "ContentEqualsRule":
    return ["string"];
  case "HasOccurrencesRule":
    return ["string", "number", "string"];
  default:
    throw new Error("Invalid  rule");
  }
};

const ruleToArgumentNames = {
  ContentEqualsRule: ["Content"],
  HasOccurrencesRule: ["Text", "Occurrences", "Operator"]
};

interface AdvancedConfigurationProps {
  rule: string
  navs: string[]
  args: (string | number | boolean)[]
  notificationMessage: string
  waitAfterNotificationMinutes: number
  setArgs: Function
  setNavs: Function
  setNotificationMessage: Function
  setWaitAfterNotificationMinutes: Function
}

export const AdvancedConfiguration = ({
  rule,
  navs,
  args,
  notificationMessage,
  waitAfterNotificationMinutes,
  setNavs,
  setArgs,
  setNotificationMessage,
  setWaitAfterNotificationMinutes
}: AdvancedConfigurationProps) => (
  <>
    <div>
      <input type="text"
        value={ notificationMessage } 
        onChange={ (ev) => setNotificationMessage(ev.currentTarget.value) } />
      {
        (ruleTokens[rule] || []).length > 0 ? (
          <Tooltip content={ `With this rule you can use the following tokens (which will be replaced in the notification message): ${ruleTokens[rule].map(s => `%${s}%`).join(", ")}` }>
            <QuestionMarkCircleIcon className="w-5 h-5" />
          </Tooltip>
        ) : <></>
      }
    </div>

    <div>
      <div className="font-bold my-4">Arguments</div>
      <div className="text-slate-600 my-4 text-sm">
        Configure what to do with the data once it&apos;s fetched.
      </div>
      <ArgumentsForm values={ args }
        names={ ruleToArgumentNames[rule] }
        onChange={ setArgs }
        types={ ruleToArgumentTypes(rule) } />
    </div>

    <div className="my-2">
      <div className="font-bold my-2">Navigation</div>
      <div className="text-slate-600 my-4 text-sm">
        Use selectors in order to traverse the DOM before fetching the data.
      </div>
      <NavigationsForm selectors={ navs } onChange={ setNavs } />
    </div>

    <div>
      Wait (minutes) after notification:
      <input type="number"
        value={ waitAfterNotificationMinutes }
        onChange={ (ev) => setWaitAfterNotificationMinutes(+ev.currentTarget.value) } />
    </div>
  </>
);
