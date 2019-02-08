(function () {
  var schema = [
    {
      id: "inventoryItems",
      alias: "Inventory Items",
      columns: [
        {
          id: "incCounter",
          alias: "incremental refresh counter",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "id",
          alias: "item ID",
          dataType: tableau.dataTypeEnum.string
        },
        {
          id: "hidden",
          dataType: tableau.dataTypeEnum.bool
        },
        {
          id: "name",
          alias: "item name",
          dataType: tableau.dataTypeEnum.string
        },
        {
          id: "price",
          alias: "item price",
          dataType: tableau.dataTypeEnum.float,
          numberFormat: tableau.numberFormatEnum.currency
        },
        {
          id: "priceType",
          alias: "item price type",
          dataType: tableau.dataTypeEnum.string
        },
        {
          id: "defaultTaxRates",
          alias: "uses default tax rates",
          dataType: tableau.dataTypeEnum.bool
        },
        {
          id: "cost",
          alias: "item cost",
          dataType: tableau.dataTypeEnum.float,
          numberFormat: tableau.numberFormatEnum.currency
        },
        {
          id: "isRevenue",
          alias: "is revenue",
          dataType: tableau.dataTypeEnum.bool
        },
        {
          id: "modifiedTime",
          alias: "last modified time",
          dataType: tableau.dataTypeEnum.datetime
        }
      ]
    }
  ];

  var myConnector = tableau.makeConnector();

  myConnector.init = function(initCallback) {
    tableau.authType = tableau.authTypeEnum.custom;
    initCallback();
  };

  myConnector.getSchema = function (schemaCallback) {
    schemaCallback(schema);
  };

  myConnector.getData = function (table, doneCallback) {

  };

  tableau.registerConnector(myConnector);

  $(document).ready(function () {
    $("#submitButton").click(function () {
      tableau.connectionName = "Clover POS";
      tableau.submit();
    });
  });
})();
