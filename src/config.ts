export const API_HOST = process.env.NODE_ENV === "production" ? (
  "http://cloud.chrisvilches.com/poller"
) : (
  "http://localhost"
);

export const API_PORT = process.env.NODE_ENV === "production" ? "" : 3000;

export const WS_ENDPOINT = process.env.NODE_ENV === "production" ? (
  "http://cloud.chrisvilches.com/poller"
) : (
  "ws://localhost:3000"
);
