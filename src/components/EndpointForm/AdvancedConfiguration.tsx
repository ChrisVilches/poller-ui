import { ArrowTrendingDownIcon, Cog6ToothIcon, CubeIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { Tabs } from "flowbite-react";
import { Set } from "immutable";
import React from "react";
import { ArgumentsForm } from "./ArgumentsForm";
import { NavigationsForm } from "./NavigationsForm";
import rulesArgs from "./rules-arguments.json";
import { TagsConfig } from "./TagsConfig";
import { Endpoint } from "../../models/Endpoint";
import { Checkbox } from "../Checkbox";

const ruleTokens = {
  ContentEqualsRule: ["content"],
  HasOccurrencesRule: ["count"]
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
  endpoint: Endpoint
  setSelectedTagIds: (ids: Set<number>) => void
}

export const AdvancedConfiguration = ({
  rule,
  navs,
  not,
  args,
  endpoint,
  notificationMessage,
  waitAfterNotificationMinutes,
  setNavs,
  setNot,
  setArgs,
  setNotificationMessage,
  setSelectedTagIds,
  setWaitAfterNotificationMinutes
}: AdvancedConfigurationProps) => (
  <>
    <Tabs.Group
      aria-label="Tabs with icons"
      style="underline"
    >
      <Tabs.Item
        title="Settings"
        icon={ Cog6ToothIcon }
      >
        <label className="block mb-4">
          <div className="mb-4 text-sm font-medium text-gray-900">
            Notification Message
          </div>

          <input type="text" value={ notificationMessage } onChange={ (ev) => setNotificationMessage(ev.currentTarget.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="The website changed!" required />

          <div className="text-slate-600 my-4 text-sm">
            Tokens available in the notification message:
            <div className="rounded-md bg-gray-200 inline-block p-2 m-2 text-gray-700 text-sm font-mono">
              { ruleTokens[rule].map(s => `%${s}%`).join(", ") }
            </div>
          </div>
        </label>

        <label className="block mb-4">
          <div className="mb-4 text-sm font-medium text-gray-900">
            Wait after notification (minutes)
          </div>
          <input type="number" value={ waitAfterNotificationMinutes } onChange={ (ev) => setWaitAfterNotificationMinutes(+ev.currentTarget.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="60" required />
        </label>

        <div className="block mb-4">
          <div className="mb-4 text-sm font-medium text-gray-900">
            Invert condition
          </div>
        </div>
        <Checkbox label="Invert" checked={ not } onChange={ () => setNot(!not) }></Checkbox>
      </Tabs.Item>
      <Tabs.Item
        title="Arguments"
        icon={ CubeIcon }
      >
        <div className="text-slate-600 my-4 text-sm">
          Configure what to do with the data once it&apos;s fetched.
        </div>
        <ArgumentsForm values={ args }
          names={ rulesArgs.names[rule] }
          onChange={ setArgs }
          argDescriptions={ rulesArgs.descriptions[rule] }
          types={ rulesArgs.types[rule] } />

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
      <Tabs.Item
        title="Tags"
        icon={ HashtagIcon }
      >
        <TagsConfig endpoint={ endpoint } onSelectedTagIdsChange={ setSelectedTagIds } />
      </Tabs.Item>
    </Tabs.Group>
  </>
);
