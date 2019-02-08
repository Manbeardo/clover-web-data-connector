import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {schema} from "./schema";
import * as tableau from "tableau";

export const connector = tableau.makeConnector();

connector.init = (callback) => {
    tableau.authType = tableau.authTypeEnum.custom;
    callback();
};

connector.getSchema = (callback) => {
    callback(schema);
};

connector.getData = (table, callback) => {
    callback();
};

tableau.registerConnector(connector);

ReactDOM.render(<App/>, document.getElementById('root'));
