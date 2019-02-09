import {Table, TableInfo} from "tableau";
import {CloverCredentials} from "../CloverCredentials";

export interface TableType {
  schema: TableInfo
  getRows: (table: Table, creds: CloverCredentials) => Promise<void>
}