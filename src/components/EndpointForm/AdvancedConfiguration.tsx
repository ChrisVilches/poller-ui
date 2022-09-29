import { Tab } from "@headlessui/react";
import { ArrowTrendingDownIcon, Cog6ToothIcon, CubeIcon, GlobeAltIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { Set } from "immutable";
import React, { ReactNode } from "react";
import { ArgumentsTab } from "./AdvancedConfiguration/ArgumentsTab";
import { NavigationsTab } from "./AdvancedConfiguration/NavigationsTab";
import { SettingsTab } from "./AdvancedConfiguration/SettingsTab";
import { TagsTab } from "./AdvancedConfiguration/TagsTab";
import { Endpoint } from "../../models/Endpoint";

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
  setArgs,
  setNavs,
  setNot,
  setPeriodMinutes,
  setNotificationMessage,
  selectedTagIds,
  setSelectedTagIds,
  setWaitAfterNotificationMinutes
}: AdvancedConfigurationProps) => {
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
        <Tab.Panel>
          <SettingsTab rule={ rule } not={ not }
            notificationMessage={ notificationMessage }
            periodMinutes={ periodMinutes } waitAfterNotificationMinutes={ waitAfterNotificationMinutes }
            setNot={ setNot } setNotificationMessage={ setNotificationMessage }
            setPeriodMinutes={ setPeriodMinutes } setWaitAfterNotificationMinutes={ setWaitAfterNotificationMinutes }/>
        </Tab.Panel>
        <Tab.Panel>
          <ArgumentsTab rule={ rule }
            args={ args }
            setArgs={ setArgs }/>
        </Tab.Panel>
        <Tab.Panel>
          <NavigationsTab navs={ navs } setNavs={ setNavs }/>
        </Tab.Panel>
        <Tab.Panel>
          <TagsTab selectedTagIds={ selectedTagIds } onSelectedTagIdsChange={ setSelectedTagIds }/>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
