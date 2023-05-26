import { Endpoint } from "../models/Endpoint";
import { Polling } from "../models/Polling";

export type EventInitialize = string;
export type EventAttempt = Endpoint;
export type EventSuccess = Polling;
