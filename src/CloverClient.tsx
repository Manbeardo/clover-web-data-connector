import {pRateLimit} from "p-ratelimit";
import {CloverCredentials} from "./CloverCredentials";

const limit = pRateLimit({
  interval: 60 * 1000,
  rate: 16,
  concurrency: 5,
});

export interface CloverClientOptions extends RequestInit {
  creds: CloverCredentials
  page?: {
    limit: number,
    offset: number
  }
  query?: { [key: string]: string }
}

interface PaginatedResponse<T> {
  elements: T[]
  href: string
}

class CloverClient {
  readonly limit = pRateLimit({
    interval: 60 * 1000,
    rate: 16,
    concurrency: 5,
  });

  readonly do = async <T extends {}>(path: string, opts: CloverClientOptions): Promise<T> => {
    let query = new URLSearchParams();
    for (let key in opts.query) {
      query.append(key, opts.query[key]);
    }
    if (opts.page) {
      query.append("limit", opts.page.limit.toString());
      query.append("offset", opts.page.offset.toString());
    }
    query.append("access_token", opts.creds.accessToken);

    let response: Response = await limit(() => fetch(`${getCloverEndpoint(opts.creds)}${path}?${query}`, opts));
    if (!response.ok) {
      throw `clover api returned status code ${response.status}`;
    }

    return await response.json() as T;
  };

  readonly get = <T extends {}>(path: string, opts: CloverClientOptions): Promise<T> => {
    const optsCopy = Object.assign({}, opts);
    opts.method = "GET";
    return this.do(path, optsCopy);
  };

  readonly getAll = async <T extends {}>(path: string, opts: CloverClientOptions, handler: (elems: T[]) => void | Promise<void>): Promise<void> => {
    opts = Object.assign({}, opts); // copy opts because we'll mutate it later
    const limit = 1000;
    let offset = 0;
    let response: PaginatedResponse<T>;
    do {
      opts.page = {
        limit: limit,
        offset: offset,
      };
      response = await this.get(path, opts);
      await handler(response.elements);

      offset += limit;
    } while (response.elements.length > 0);
  };
}

export const cloverClient = new CloverClient();

export function getCloverEndpoint(creds: CloverCredentials) {
  if (creds.environment === "prod") {
    return "https://api.clover.com";
  } else if (creds.environment === "sandbox") {
    return "https://apisandbox.dev.clover.com";
  }
  throw `unknown environment: ${creds.environment}`;
}