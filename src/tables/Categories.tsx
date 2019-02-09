import {TableType} from "./TableType";
import {cloverClient} from "../CloverClient";
import {InventoryItem} from "./InventoryItems";

export interface Category {
  modifiedTime?: number,
  deleted?: boolean,
  sortOrder: number,
  name: string,
  id: string,
  items?: InventoryItem[]
}

export const Categories: TableType = {
  schema: {
    id: "categories",
    alias: "Categories",
    columns: [
      {
        id: "modifiedTime",
        alias: "last modified time",
        dataType: "datetime",
      },
      {
        id: "deleted",
        alias: "is deleted",
        dataType: "bool",
      },
      {
        id: "sortOrder",
        alias: "sort order",
        dataType: "int",
      },
      {
        id: "name",
        alias: "category name",
        dataType: "string",
      },
      {
        id: "id",
        alias: "category ID",
        dataType: "string",
      },
    ],
  },
  getRows: async (table, creds) => {
    await cloverClient.getAll<Category>(`/v3/merchants/${creds.merchantID}/categories`, {
      creds: creds,
    }, (rows) => {
      table.appendRows(rows.map((row) => {
        return {
          modifiedTime: row.modifiedTime,
          deleted: row.deleted,
          sortOrder: row.sortOrder,
          name: row.name,
          id: row.id,
        };
      }));
    });
  },
};