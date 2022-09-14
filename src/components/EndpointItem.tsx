import { Spinner } from "flowbite-react";
import { motion } from "framer-motion";
import React , { useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { EndpointTitle } from "./EndpointTitle";
import { PairLabelValueCols } from "./PairLabelValueCols";
import { RuleLabel } from "./RuleLabel";
import { Toggle } from "./Toggle";
import { Endpoint } from "../models/Endpoint";
import { EndpointService } from "../services/EndpointService";

const transition = {
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
  initial: { opacity: 0 }
};

interface EndpointItemProps {
  endpoint: Endpoint;
  toggleEnable: Function;
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

  // TODO: Error: "<button> cannot appear as a descendant of <button>."

  return (
    <motion.div { ...transition } className="mt-2">
      <div className="mb-8 font-bold"><EndpointTitle title={ endpoint.title }/></div>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <PairLabelValueCols
          smallScreenCenterItems={true}
          left="Wait after notification"
          right={ `${endpoint.waitAfterNotificationMinutes} minutes` }/>

        { endpoint.timeout ? (
          <PairLabelValueCols
            smallScreenCenterItems={true}
            left="Next Poll"
            right={ <TimeAgo date={ endpoint.timeout }/> }/>
        ) : "" }
        <PairLabelValueCols
          smallScreenCenterItems={true}
          left="Inverted"
          right={ endpoint.not ? "Yes" : "No" }/>
        <PairLabelValueCols
          smallScreenCenterItems={true}
          left="Enabled"
          right={ (
            <>
              <div className="absolute translate-x-12">
                <Spinner style={ { visibility: loading ? "visible" : "hidden" } }/>
              </div>
              <Toggle
                loading={ loading }
                disabled={ loading }
                checked={ endpoint.enabled }
                onChange={ toggleEnableAux }/>
            </>
          ) }/>
      </div>

      <div className="flex flex-row items-center">
        <div className="grow">
          <Link className="endpoint-item-link" to={ `/pollings/${endpoint.id}` }>
            Activity
          </Link>
        </div>
        
        <div className="">
          <RuleLabel label={ endpoint.rule }/>
        </div>
      </div>
    </motion.div>
  );
};
