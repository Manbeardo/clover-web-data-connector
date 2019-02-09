import {Location} from "history";

export interface CloverCredentials {
  readonly merchantID: string
  readonly accessToken: string
  readonly environment: string
}

export function getCredentialsFromLocation(loc: Location): CloverCredentials {
  let params = new URLSearchParams(loc.search);
  return {
    merchantID: params.get("merchant_id")!!,
    accessToken: params.get("access_token")!!,
    environment: params.get("environment")!!,
  };
}

export function AddCredentialsToParams(params: URLSearchParams, creds: CloverCredentials) {
  params.append("merchant_id", creds.merchantID);
  params.append("access_token", creds.accessToken);
  params.append("environment", creds.environment);
}