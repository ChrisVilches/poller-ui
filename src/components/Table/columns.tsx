import { CheckIcon, MinusIcon } from "@heroicons/react/24/outline";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Polling } from "../../models/Polling";
import { truncateString } from "../../util/strings";
import { MessageCell } from "../MessageCell";
import { ResponseCode } from "../ResponseCode";

export const columns: ColumnDef<Polling>[] = [
  {
    accessorKey: "responseCode",
    cell: info => <ResponseCode code={ Number(info.getValue()) }/>,
    header: "Response code"
  },
  {
    accessorKey: "shouldNotify",
    cell: info => info.getValue() ? (
      <CheckIcon className="text-green-500 mx-auto w-6 h-6"/>
    ) : (
      <MinusIcon className="text-gray-600 mx-auto w-6 h-6"/>
    ),
    header: "Should notify?"
  },
  {
    cell: info => {
      const { error, computedMessage } = info.row.original;
      return <MessageCell message={ computedMessage } error={ error }/>;
    },
    header: "Message"
  },
  {
    accessorKey: "manual",
    cell: info => info.getValue() ? "Manual" : "Automated",
    header: "Manual Trigger"
  },
  {
    accessorKey: "createdAt",
    cell: info => <TimeAgo date={ info.getValue() }/>,
    header: "Date"
  },
  {
    cell: info => {
      const { endpoint } = info.row.original;
      return <Link to={ `/pollings/${endpoint.id}` }>{ truncateString(endpoint.title) }</Link>;
    },
    header: "Endpoint"
  }
];
