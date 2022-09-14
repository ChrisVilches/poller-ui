import { Tab } from "@headlessui/react";
import { ArrowTrendingDownIcon, Cog6ToothIcon, CubeIcon, GlobeAltIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { Set } from "immutable";
import React, { ReactNode } from "react";
import { ArgumentsForm } from "./ArgumentsForm";
import { NavigationsForm } from "./NavigationsForm";
import rulesArgs from "./rules-arguments.json";
import { TagsConfig } from "./TagsConfig";
import { Endpoint } from "../../models/Endpoint";
import { Toggle } from "../Toggle";

const ruleTokens = {
  ContentEqualsRule: ["content"],
  HasOccurrencesRule: ["count"]
};

interface AdvancedConfigurationProps {
  rule: string
  navs: string[]
  not: boolean
  args: (string | number | boolean)[]
  notificationMessage: string;
  periodMinutes: number;
  waitAfterNotificationMinutes: number
  setArgs: (args: (string | number | boolean)[]) => void
  setNavs: (navs: string[]) => void
  setNot: (not: boolean) => void;
  setNotificationMessage: (m: string) => void;
  setPeriodMinutes: (p: number) => void;
  setWaitAfterNotificationMinutes: (w: number) => void;
  endpoint: Endpoint
  selectedTagIds: Set<number>;
  setSelectedTagIds: (ids: Set<number>) => void
  mainTab: ReactNode;
}

export const AdvancedConfiguration = ({
  rule,
  navs,
  not,
  args,
  mainTab,
  notificationMessage,
  periodMinutes,
  waitAfterNotificationMinutes,
  setNavs,
  setNot,
  setPeriodMinutes,
  setArgs,
  setNotificationMessage,
  selectedTagIds,
  setSelectedTagIds,
  setWaitAfterNotificationMinutes
}: AdvancedConfigurationProps) => {
  const settingsTab = (
    <>
      <label className="block mb-4">
        <div className="mb-4 text-sm font-medium text-slate-100">
          Notification Message
        </div>

        <input
          type="text"
          value={ notificationMessage }
          onChange={ (ev) => setNotificationMessage(ev.currentTarget.value) }
          placeholder="The website changed!"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>

        <div className="text-slate-100 my-4 text-sm">
          Tokens available in the notification message:
          <div className="rounded-md bg-slate-800 inline-block p-2 m-2 text-slate-300 text-sm font-mono">
            { ruleTokens[rule].map(s => `%${s}%`).join(", ") }
          </div>
        </div>
      </label>

      <label className="block mb-4">
        <div className="mb-4 text-sm font-medium text-slate-100">
          Period (minutes)
        </div>
        <input
          type="number"
          value={ periodMinutes }
          onChange={ (ev) => setPeriodMinutes(+ev.currentTarget.value) }
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
          value={ waitAfterNotificationMinutes }
          onChange={ (ev) => setWaitAfterNotificationMinutes(+ev.currentTarget.value) }
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
      <Toggle checked={ not } onChange={ setNot }/>
    </>
  );

  const argumentsTab = (
    <>
      <div className="text-slate-100 mt-4 mb-8 text-sm">
        Configure what to do with the data once it&apos;s fetched.
      </div>

      <ArgumentsForm values={ args }
        names={ rulesArgs.names[rule] }
        onChange={ setArgs }
        argDescriptions={ rulesArgs.descriptions[rule] }
        types={ rulesArgs.types[rule] } />
    </>
  );

  const navigationsTab = (
    <>
      <div className="text-slate-100 my-4 mb-8 text-sm font-medium">
        Use selectors in order to traverse the DOM before fetching the data.
      </div>
      <NavigationsForm selectors={ navs } onChange={ setNavs } />
    </>
  );

  const tagsTab = (
    <TagsConfig selectedTagIds={ selectedTagIds } onSelectedTagIdsChange={ setSelectedTagIds }/>
  );

  const tabs: [string, React.ElementType][] = [
    ["URL", GlobeAltIcon],
    ["Settings", Cog6ToothIcon],
    ["Arguments", CubeIcon],
    ["Navigation", ArrowTrendingDownIcon],
    ["Tags", HashtagIcon]
  ];

  return (
    <Tab.Group>
      <Tab.List className="mb-10 flex">
        { tabs.map(([name, Icon], idx: number) => (
          <Tab key={ idx } as="div" className="grow">
            { ({ selected }) => (
              <button className={ `w-full ${idx === 0 ? "rounded-l-md" : (idx === 4 ? "rounded-r-md" : "")}
                p-3 ${selected ? "bg-slate-800 text-white" : "bg-slate-900 text-slate-100"}` }>
                <>
                  <Icon className="w-4 h-4 inline mr-2"/>
                  <span className="hidden md:inline">
                    { name }
                  </span>
                </>
              </button>
            ) }
          </Tab>
        )) }
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>{ mainTab }</Tab.Panel>
        <Tab.Panel>{ settingsTab }</Tab.Panel>
        <Tab.Panel>{ argumentsTab }</Tab.Panel>
        <Tab.Panel>{ navigationsTab }</Tab.Panel>
        <Tab.Panel>{ tagsTab }</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
