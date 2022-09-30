import { Tab } from "@headlessui/react";
import { ArrowTrendingDownIcon, Cog6ToothIcon, CubeIcon, GlobeAltIcon, HashtagIcon } from "@heroicons/react/24/outline";
import React from "react";
import { ArgumentsTab } from "./AdvancedConfiguration/ArgumentsTab";
import { NavigationsTab } from "./AdvancedConfiguration/NavigationsTab";
import { SettingsTab } from "./AdvancedConfiguration/SettingsTab";
import { TagsTab } from "./AdvancedConfiguration/TagsTab";
import { RequiredFields } from "./RequiredFields";

const tabs: [string, React.ElementType][] = [
  ["URL", GlobeAltIcon],
  ["Settings", Cog6ToothIcon],
  ["Arguments", CubeIcon],
  ["Navigation", ArrowTrendingDownIcon],
  ["Tags", HashtagIcon]
];

export const AdvancedConfiguration = () => (
  <Tab.Group>
    <Tab.List className="mb-10 flex">
      { tabs.map(([name, Icon], idx: number) => (
        <Tab key={ idx } as="div" className="grow">
          { ({ selected }) => (
            <button className={ `w-full ${idx === 0 ? "rounded-l-md" : (idx === 4 ? "rounded-r-md" : "")}
                p-3 ${selected ? "bg-slate-800 text-white" : "bg-slate-900 text-slate-100"}` }>
              <>
                <Icon className="w-4 h-4 inline mr-2" />
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
      <Tab.Panel><RequiredFields /></Tab.Panel>
      <Tab.Panel><SettingsTab /></Tab.Panel>
      <Tab.Panel><ArgumentsTab /></Tab.Panel>
      <Tab.Panel><NavigationsTab /></Tab.Panel>
      <Tab.Panel><TagsTab /></Tab.Panel>
    </Tab.Panels>
  </Tab.Group>
);
