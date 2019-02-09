import {TableType} from "./TableType";
import {cloverClient} from "../CloverClient";
import {InventoryItem} from "./InventoryItems";
import {Categories} from "./Categories";

export const InventoryItemCategories: TableType = {
  schema: {
    id: "inventoryItemCategories",
    alias: "Inventory item categories",
    joinOnly: true,
    foreignKey: {
      tableId: Categories.schema.id,
      columnId: "id",
    },
    columns: [
      {
        id: "itemID",
        alias: "item ID",
        dataType: "string",
      },
      {
        id: "categoryID",
        alias: "category ID",
        dataType: "string",
        filterable: true,
      },
    ],
  },
  getRows: async (table, creds) => {
    for (let category of table.filterValues!! as string[]) {
      await cloverClient.getAll<InventoryItem>(`/v3/merchants/${creds.merchantID}/categories/${category}/items`, {
        creds: creds,
      }, (rows) => {
        table.appendRows(rows.map((row) => {
          return {
            "itemID": row.id,
            "categoryID": category,
          };
        }));
      });
    }
  },
};