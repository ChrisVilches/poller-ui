import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { EndpointTitle } from "./EndpointTitle";
import { PairLabelValueCols } from "./PairLabelValueCols";
import { RuleLabel } from "./RuleLabel";
import { Endpoint } from "../models/Endpoint";

interface EndpointItemReadonlyProps {
  endpoint: Endpoint;
  showActivityLink: boolean;
}

export const EndpointItemReadonly = ({ endpoint, showActivityLink }: EndpointItemReadonlyProps) => (
  <div className="mt-2">
    <div className="mb-8 font-bold"><EndpointTitle title={ endpoint.title } /></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
      <PairLabelValueCols left="Wait after notification" right={ `${endpoint.waitAfterNotificationMinutes} minutes` } />

      { endpoint.timeout && endpoint.enabled ? (
        <PairLabelValueCols left="Next Poll" right={ <TimeAgo date={ endpoint.timeout }/> } />
      ) : "" }
      <PairLabelValueCols left="Inverted" right={ endpoint.not ? "Yes" : "No" } />
    </div>

    { showActivityLink ? (
      <Link to={ `/pollings/${endpoint.id}` }>
        Activity
      </Link>
    ) : <></> }

    <div className="flex justify-end">
      <RuleLabel label={ endpoint.rule } />
    </div>
  </div>
);
