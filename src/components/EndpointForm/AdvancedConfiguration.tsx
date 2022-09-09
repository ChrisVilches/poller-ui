import { ArrowTrendingDownIcon, CubeIcon } from "@heroicons/react/24/outline";
import { Tabs } from "flowbite-react";
import React from "react";
import { ArgumentsForm } from "./ArgumentsForm";
import { NavigationsForm } from "./NavigationsForm";
import { Checkbox } from "../Checkbox";

// TODO: This can be improved by also adding description, and
// storing this data in a localization system (along with the other texts.)

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
  not: boolean
  args: (string | number | boolean)[]
  notificationMessage: string
  waitAfterNotificationMinutes: number
  setArgs: Function
  setNavs: Function
  setNot: Function
  setNotificationMessage: Function
  setWaitAfterNotificationMinutes: Function
}

export const AdvancedConfiguration = ({
  rule,
  navs,
  not,
  args,
  notificationMessage,
  waitAfterNotificationMinutes,
  setNavs,
  setNot,
  setArgs,
  setNotificationMessage,
  setWaitAfterNotificationMinutes
}: AdvancedConfigurationProps) => (
  <>
    <label className="block mb-4 text-sm font-medium text-gray-900">
      <div className="mb-4">
        Notification Message
      </div>
      <input type="text" value={ notificationMessage } onChange={ (ev) => setNotificationMessage(ev.currentTarget.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="The website changed!" required />
    </label>

    <label className="block mb-4 text-sm font-medium text-gray-900">
      <div className="mb-4">
        Wait after notification (minutes)
      </div>
      <input type="number" value={ waitAfterNotificationMinutes } onChange={ (ev) => setWaitAfterNotificationMinutes(+ev.currentTarget.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="60" required />
    </label>

    <div className="block mb-4 text-sm font-medium text-gray-900">
      <div className="mb-4">
        Invert condition
      </div>
    </div>
    <Checkbox label="Invert" checked={ not } onChange={ () => setNot(!not) }></Checkbox>

    <Tabs.Group
      aria-label="Tabs with icons"
      style="underline"
    >
      <Tabs.Item
        title="Arguments"
        icon={ CubeIcon }
      >
        <div className="text-slate-600 my-4 text-sm">
          Configure what to do with the data once it&apos;s fetched.
        </div>
        <ArgumentsForm values={ args }
          names={ ruleToArgumentNames[rule] }
          onChange={ setArgs }
          types={ ruleToArgumentTypes(rule) } />

      </Tabs.Item>
      <Tabs.Item
        title="DOM/JSON Navigation"
        icon={ ArrowTrendingDownIcon }
      >
        <div className="text-slate-600 my-4 text-sm">
          Use selectors in order to traverse the DOM before fetching the data.
        </div>
        <NavigationsForm selectors={ navs } onChange={ setNavs } />
      </Tabs.Item>
    </Tabs.Group>
  </>
);
