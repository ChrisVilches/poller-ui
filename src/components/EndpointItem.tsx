import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import React , { useState } from "react";
import TimeAgo from "react-timeago";
import { ButtonIconLink } from "./ButtonIconLink";
import { EndpointTitle } from "./EndpointTitle";
import { PairLabelValueCols } from "./PairLabelValueCols";
import { RuleLabel } from "./RuleLabel";
import { Spinner } from "./Spinner";
import { Toggle } from "./Toggle";
import { Endpoint } from "../models/Endpoint";
import { EndpointService } from "../services/EndpointService";
import { formatMinutes } from "../util/time";

const transition = {
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
  initial: { opacity: 0 }
};

interface EndpointItemProps {
  endpoint: Endpoint;
  toggleEnable: (enabled: boolean) => void;
}

export const EndpointItem = ({ endpoint, toggleEnable }: EndpointItemProps) => {
  const [loading, setLoading] = useState(false);

  const toggleEnableAux = async (enabled: boolean) => {
    setLoading(true);
    try {
      toggleEnable(
        await EndpointService.setEnabled(endpoint.id, enabled)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div { ...transition } className="mt-2">
      <div className="mb-8 font-bold"><EndpointTitle title={ endpoint.title }/></div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <PairLabelValueCols
          smallScreenCenterItems={ true }
          left="Wait after notification"
          right={ formatMinutes(endpoint.waitAfterNotificationMinutes) }/>

        { endpoint.timeout && endpoint.enabled ? (
          <PairLabelValueCols
            smallScreenCenterItems={ true }
            left="Next Poll"
            right={ <TimeAgo date={ endpoint.timeout }/> }/>
        ) : "" }
        <PairLabelValueCols
          smallScreenCenterItems={ true }
          left="Inverted"
          right={ endpoint.not ? "Yes" : "No" }/>
        <PairLabelValueCols
          smallScreenCenterItems={ true }
          left="Enabled"
          right={ (
            <>
              <div className="absolute translate-x-14" style={ { visibility: loading ? "visible" : "hidden" } }>
                <Spinner/>
              </div>
              <Toggle
                loading={ loading }
                disabled={ loading }
                checked={ endpoint.enabled }
                onChange={ toggleEnableAux }/>
            </>
          ) }/>
      </div>

      <div className="flex justify-between">
        <ButtonIconLink icon={ ArrowTrendingUpIcon } to={ `/pollings/${endpoint.id}` } className="endpoint-item-link">
          Activity
        </ButtonIconLink>

        <RuleLabel label={ endpoint.rule }/>
      </div>
    </motion.div>
  );
};
