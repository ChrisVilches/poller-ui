import React from "react";
import { EventSuccess } from "../../interfaces/events";
import { PairLabelValueCols } from "../PairLabelValueCols";

export const EventSuccessItem = ({ polling: { endpoint, ...result } }: { polling: EventSuccess }) => (
  <span>
    Polled <b>{ endpoint.title }</b>
    <div className="my-8">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <PairLabelValueCols left={ "Response Code" } right={ result.responseCode }/>
        <PairLabelValueCols left={ "Should Notify" } right={ result.shouldNotify ? "Yes" : "No" }/>
      </div>
      <div className="text-center">
        { result.computedMessage }
      </div>
    </div>
  </span>
);
