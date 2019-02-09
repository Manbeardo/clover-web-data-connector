import "core-js/es6";
import "core-js/es7";
import "raf/polyfill";
import "whatwg-fetch";

import React from "react";
import ReactDOM from "react-dom";
import tableau, {Table, TableInfo} from "tableau";
import {App} from "./components/App";
import {InventoryItems} from "./tables/InventoryItems";
import {TableType} from "./tables/TableType";
import {CloverCredentials} from "./CloverCredentials";
import {InventoryItemCategories} from "./tables/InventoryItemCategories";
import {Categories} from "./tables/Categories";

const connector = tableau.makeConnector();

const tables = (() => {
  let tables: { [id: string]: TableType } = {};
  for (let table of [
    Categories,
    InventoryItems,
    InventoryItemCategories,
  ]) {
    tables[table.schema.id] = table;
  }
  return tables;
})();

connector.init = (callback) => {
  tableau.authType = tableau.authTypeEnum.custom;
  tableau.connectionName = "Clover POS";

  let appCallback = (creds: CloverCredentials) => {
    tableau.username = "";
    tableau.password = creds;
    tableau.submit();
  };

  ReactDOM.render(<App callback={appCallback} phase={tableau.phase}/>, document.getElementById("root"));

  callback();
};

connector.getSchema = (callback) => {
  let schemas: TableInfo[] = [];
  for (let id in tables) {
    schemas.push(tables[id].schema);
  }
  callback(schemas);
};

async function getData(table: Table): Promise<void> {
  let type = tables[table.tableInfo.id];
  await type.getRows(table, tableau.password as CloverCredentials);
}

connector.getData = (table, callback) => {
  getData(table)
    .then(() => callback())
    .catch((err) => tableau.abortWithError(err));
};

tableau.registerConnector(connector);
