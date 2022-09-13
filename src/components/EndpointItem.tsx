import { motion } from "framer-motion";
import React , { useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Checkbox } from "./Checkbox";
import { EndpointTitle } from "./EndpointTitle";
import { PairLabelValueCols } from "./PairLabelValueCols";
import { RuleLabel } from "./RuleLabel";
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

  const toggleEnableAux = async () => {
    setLoading(true);
    try {
      toggleEnable(
        await EndpointService.setEnabled(endpoint.id, !endpoint.enabled)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div { ...transition } className="mt-2">
      <div className="mb-8 font-bold"><EndpointTitle title={ endpoint.title }/></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <PairLabelValueCols left="Wait after notification (minutes)" right={ endpoint.waitAfterNotificationMinutes }/>

        { endpoint.timeout ? (
          <PairLabelValueCols left="Timeout" right={ <TimeAgo date={ endpoint.timeout }/> }/>
        ) : "" }
        <PairLabelValueCols left="Inverted" right={ endpoint.not ? "Yes" : "No" }/>
        <PairLabelValueCols
          left="Enabled"
          right={ (
            <Checkbox
              loading={ loading }
              disabled={ loading }
              checked={ endpoint.enabled }
              onChange={ toggleEnableAux }
              label=""/>
          ) }/>
      </div>

      <div className="flex flex-row">
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
