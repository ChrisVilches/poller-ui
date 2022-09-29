import React from "react";
import { Toggle } from "../../Toggle";

interface SettingsTabProps {
  rule: string
  not: boolean
  notificationMessage: string;
  periodMinutes: number;
  waitAfterNotificationMinutes: number
  setNot: (not: boolean) => void;
  setNotificationMessage: (m: string) => void;
  setPeriodMinutes: (p: number) => void;
  setWaitAfterNotificationMinutes: (w: number) => void;
}

const ruleTokens = {
  ContentEqualsRule: ["content"],
  HasOccurrencesRule: ["count"]
};

export const SettingsTab = ({
  not,
  notificationMessage,
  periodMinutes,
  rule,
  setNot,
  setNotificationMessage,
  setPeriodMinutes,
  setWaitAfterNotificationMinutes,
  waitAfterNotificationMinutes
}: SettingsTabProps) => (
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
