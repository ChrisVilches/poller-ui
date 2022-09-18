const parseEnvVariable = (varName: string): string => {
  const value: string | undefined = process.env[varName];

  if (!value) {
    throw new Error(`ENV variable ${varName} cannot be empty!`);
  }

  return String(process.env[varName]);
};

export const API_ENDPOINT = parseEnvVariable("REACT_APP_API_ENDPOINT");
export const WS_ENDPOINT_BASE = parseEnvVariable("REACT_APP_WS_ENDPOINT_BASE");
export const WS_ENDPOINT_PATH = parseEnvVariable("REACT_APP_WS_ENDPOINT_PATH");
