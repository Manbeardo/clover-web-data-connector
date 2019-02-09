import {TableType} from "./TableType";
import {cloverClient, getCloverEndpoint} from "../CloverClient";

export interface InventoryItem {
  id: string,
  hidden: boolean,
  name: string,
  price: number,
  priceType: string,
  defaultTaxRates: boolean,
  cost: number,
  isRevenue: boolean,
  modifiedTime: number
}

export const InventoryItems: TableType = {
  schema: {
    id: "inventoryItems",
    alias: "Inventory Items",
    columns: [
      {
        id: "id",
        alias: "item ID",
        dataType: "string",
      },
      {
        id: "hidden",
        dataType: "bool",
      },
      {
        id: "name",
        alias: "item name",
        dataType: "string",
      },
      {
        id: "price",
        alias: "item price",
        dataType: "float",
        numberFormat: "currency",
      },
      {
        id: "priceType",
        alias: "item price type",
        dataType: "string",
      },
      {
        id: "defaultTaxRates",
        alias: "uses default tax rates",
        dataType: "bool",
      },
      {
        id: "cost",
        alias: "item cost",
        dataType: "float",
        numberFormat: "currency",
      },
      {
        id: "isRevenue",
        alias: "is revenue",
        dataType: "bool",
      },
      {
        id: "modifiedTime",
        alias: "last modified time",
        dataType: "datetime",
      },
    ],
  },
  getRows: async (table, creds) => {
    await cloverClient.getAll<InventoryItem>(`/v3/merchants/${creds.merchantID}/items`, {
      creds: creds,
    }, (rows) => {
      table.appendRows(rows.map((row) => {
        row.price = row.price / 100;
        row.cost = row.cost / 100;
        return row;
      }));
    });
  },
};