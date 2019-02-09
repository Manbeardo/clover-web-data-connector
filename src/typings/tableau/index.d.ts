export interface tableau {
  /**
   * Current context of auth.
   */
  authPurpose: AuthPurposeEnumValue;

  /**
   * Current type of authentication for this connector.
   */
  authType: AuthTypeEnumValue;

  /**
   * A string that you can use to store data between phases. For example, you might store user input that you want to use in the getData phase. Note that this string is saved as plain text, so you should not use  connectionData to store sensitive information. For passwords or authentication tokens, use the password property.

   To store and retrieve JavaScript objects with the  connectionData property, that is to serialize and deserialize objects, use JSON.stringify and  JSON.parse.
   */
  connectionData: string;

  /**
   * Name of this connection.
   */
  connectionName: string;

  /**
   * Current locale, or locale with most similar language, of the web data connector user
   */
  readonly locale: LocaleEnumValue;

  /**
   * You can use this property to store a password, OAuth authentication token, or other secret. This property can be a JSON object and is not written to disk.
   */
  password: string | object;

  /**
   * Current phase of the web data connector
   */
  readonly phase: PhaseEnumValue;

  /**
   * The build number for Tableau Desktop
   *
   * Note: this feature is only supported in version 2.1 and later of the WDC.
   */
  readonly platformBuildNumber: string;

  /**
   * The edition of Tableau Desktop
   *
   * Note: this feature is only supported in version 2.1 and later of the WDC.
   */
  readonly platformEdition: string;

  /**
   * The operating system on which Tableau Destkop is installed.
   *
   * Note: this feature is only supported in version 2.1 and later of the WDC.
   */
  readonly platformOs: string;

  /**
   * The version of Tableau Desktop.
   *
   * Note: this feature is only supported in version 2.1 and later of the WDC.
   */
  readonly platformVersion: string;

  /**
   * Username tied to data source, persisted in a .twb,  .twbx, etc.
   */
  username: string;

  /**
   * Current version of the Web Data Connector API
   */
  readonly version: string;

  /**
   * Called whenever the connector has invalid credentials and needs to reauthenticate its user. This method must be called from the init method during the gather data phase.
   *
   * @param errorMessage message which only shows up in logs and on Tableau Server.
   */
  abortForAuth(errorMessage: string): void

  /**
   * Throws an error within Tableau with the passed  errorMessage
   *
   * @param errorMessage message to display to the user in Tableau.
   */
  abortWithError(errorMessage: string): void

  /**
   * Logs a message in the Tableau log system
   *
   * @param logMessage
   */
  log(logMessage: string): void

  /**
   * Returns a new instance of a WebDataConnector.
   */
  makeConnector(): WebDataConnector

  /**
   * Registers your connector with Tableau. You call this function after you have created the connector instance and attached functions to the instance.
   *
   * @param connector
   */
  registerConnector(connector: WebDataConnector): void

  /**
   * Displays a progress message to the user while an extract is being created. For example, if you switch from the Data Source pane to a sheet, a dialog appears that displays the progress message.
   *
   * Note: this feature is only supported in version 2.1 and later of the WDC.
   *
   * @param progressMessage
   */
  reportProgress(progressMessage: string): void

  /**
   * Tells Tableau that the connector has finished the interactive phase or the authentication phase. After this method is called, Tableau proceeds to the gather data phase.
   */
  submit(): void

  readonly aggTypeEnum: AggTypeEnum

  readonly authPurposeEnum: AuthPurposeEnum

  readonly authTypeEnum: AuthTypeEnum

  readonly columnRoleEnum: ColumnRoleEnum

  readonly columnTypeEnum: ColumnTypeEnum

  readonly dataTypeEnum: DataTypeEnum

  readonly geographicRoleEnum: GeographicRoleEnum

  readonly localeEnum: LocaleEnum

  readonly numberFormatEnum: NumberFormatEnum

  readonly phaseEnum: PhaseEnum

  readonly unitFormatsEnum: UnitFormatsEnum
}

export interface ColumnInfo {
  /**
   * The default aggregation type for this column.
   */
  aggType?: AggTypeEnumValue;
  /**
   * The user friendly alias of this column. If this property is omitted, the column id will be used.
   */
  alias?: string;
  /**
   * The default role of this column: dimension or measure.
   */
  columnRole?: ColumnRoleEnumValue;
  /**
   * The default type of this column: discrete or continuous.
   */
  columnType?: ColumnTypeEnumValue;
  /**
   * The data type of this column.
   */
  dataType: DataTypeEnumValue;
  /**
   * Whether the column should be used as the join filtering column in the dependent table.
   *
   * Note: This feature is only support in version 2.2 and later of the WDC.
   */
  filterable?: boolean;
  /**
   * The default geographic role of this column.
   */
  geoRole?: GeographicRoleEnumValue;
  /**
   * The id of this column. Column ids must be unique within a table. The id can only contain alphanumeric (a-z, A-Z, 0-9) and underscore characters (_). The id must match the regular expression: "^[a-zA-Z0-9_]\*$".
   */
  id: string;
  /**
   * The default number formatting for this column.
   */
  numberFormat?: NumberFormatEnumValue;
  /**
   * The default units formatting for this column.
   */
  unitsFormat?: UnitsFormatEnumValue;
}

/**
 * Object which is used to actually append data when creating an extract.
 */
export interface Table {
  /**
   * If this is an incremental refresh and the table supports incremental refreshes, this property will contain the largest value from the incrementColumn in the current extract. This value will be an empty string otherwise.
   */
  incrementValue: string;

  /**
   * The metadata about this table
   */
  tableInfo: TableInfo;

  /**
   * Whether the table can be used for join filtering. If the schema properties are set correctly, this equals true.
   */
  isJoinFiltered: boolean;

  /**
   * An array of the values to use for filtering. For example, an array of the user ID values to get data for.
   */
  filterValues?: any[];

  /**
   * Called to actually append rows of data to the extract. Takes either an array of arrays or an array of objects which contain the actual rows of data for the extract. The format for these match version 1 of the API.
   *
   * @param rows
   */
  appendRows(rows: any[][] | object[]): any;
}

export interface TableInfo {
  /**
   * An array of columns that belong to this table.
   */
  columns: Array<ColumnInfo>;
  /**
   * An alias for this table to be shown to the user. This alias is editable by the user and must be unique across all tables used in a join. If this property is omitted, the table id will be used.
   */
  alias?: string;
  /**
   * A user friendly description of the contents in this table.
   */
  description?: string;
  /**
   * An object that specifies the table ID and column ID to use in join filtering to create the primary to foreign key relationship.
   *
   * Note: This feature is only support in version 2.2 and later of the WDC.
   */
  foreignKey?: { tableId: string, columnId: string };
  /**
   * A unique id for this particular table. The id can only contain alphanumeric (a-z, A-Z, 0-9) and underscore characters (_). The id must match the regular expression: "^[a-zA-Z0-9_]\*$".
   */
  id: string;
  /**
   * The id of the column which can be used for incremental refreshes. Must be an int, date, or datetime column.
   */
  incrementColumnId?: string;
  /**
   * Whether you want to make join filtering required for this table. If you set this value to true, you cannot connect to the table without first connecting to the other table.
   */
  joinOnly?: boolean;
}

/**
 * This is the actual interface a WDC will be asked to implement. init and shutdown are optional and will be filled in automatically if a connector does not implement these.
 */
export interface WebDataConnector {
  /**
   * Called to create or update the data for a particular instance of this WDC. data is returned for each table in the connection. Once all data has been returned, the connector must call doneCallback to indicate that data gathering has finished.
   *
   * @param table
   * @param doneCallback Callback function to indicate data gathering is completed.
   */
  getData(table: Table, doneCallback: () => void): void

  /**
   * Called to retrieve the schema information for this WDC.
   *
   * @param schemaCallback Called to inform Tableau about the schema.
   */
  getSchema(schemaCallback: (tables: Array<TableInfo>, connections?: Array<StandardConnection>) => void): void

  /**
   * Called first in each phase of the web data connector.
   *
   * @param initCallback Called to inform Tableau when the connector has finished initializing.
   */
  init(initCallback: () => void): void

  /**
   * Called at the end of each phase of the web data connector.
   *
   * @param shutdownCallback Called to inform Tableau when the connector has finished shutdown.
   */
  shutdown(shutdownCallback: () => void): void
}

/**
 * This enum represents the default aggregation that can optionally be assigned as metadata for columns of the int and float dataType.
 */
export interface AggTypeEnum {
  avg: "avg"
  count: "count"
  count_dist: "count_dist"
  median: "media"
  sum: "sum"
}

export type AggTypeEnumValue = "avg" | "count" | "count_dist" | "media" | "sum"

/**
 * This enum represents the context in which authentication is being requested.
 */
export interface AuthPurposeEnum {
  enduring: "enduring"
  ephemeral: "ephemeral"
}

export type AuthPurposeEnumValue = "enduring" | "ephemeral"

/**
 * This enum represents the authentication type of the web data connector.
 */
export interface AuthTypeEnum {
  basic: "basic"
  custom: "custom"
  none: "none"
}

export type AuthTypeEnumValue = "basic" | "custom" | "none"

/**
 * This enum represents the default role of a column.
 */
export interface ColumnRoleEnum {
  dimension: "dimension"
  measure: "measure"
}

export type ColumnRoleEnumValue = "dimension" | "measure"

/**
 * This enum represents the default type of a column.
 */
export interface ColumnTypeEnum {
  continuous: "continuous"
  discrete: "discrete"
}

export type ColumnTypeEnumValue = "continuous" | "discrete"

/**
 * This Enum represents the different data types available to each column
 */
export interface DataTypeEnum {
  bool: "bool"
  date: "date"
  datetime: "datetime"
  float: "float"
  geometry: "geometry"
  int: "int"
  string: "string"
}

export type DataTypeEnumValue = "bool" | "date" | "datetime" | "float" | "geometry" | "int" | "string"

/**
 * This enum represents the default geographic role that can be assigned to a column.
 */
export interface GeographicRoleEnum {
  area_code: "area_code"
  cbs_msa: "cbs_msa"
  city: "city"
  congressional_district: "congressional_district"
  country_region: "country_region"
  county: "county"
  state_province: "state_province"
  zip_code_postcode: "zip_code_postcode"
}

export type GeographicRoleEnumValue =
  "area_code"
  | "cbs_msa"
  | "city"
  | "congressional_district"
  | "country_region"
  | "county"
  | "state_province"
  | "zip_code_postcode"

/**
 * This enum represents the locale, or the locale with the most similar language, of the of the web data connector user.
 */
export interface LocaleEnum {
  america: "america"
  brazil: "brazil"
  china: "china"
  france: "france"
  germany: "germany"
  japan: "japan"
  korea: "korea"
  spain: "spain"
}

export type LocaleEnumValue = "america" | "brazil" | "china" | "france" | "germany" | "japan" | "korea" | "spain"

/**
 * This enum represents the default number format that can optionally be assigned as metadata for columns of the int and float dataType.
 */
export interface NumberFormatEnum {
  readonly currency: "currency"
  readonly number: "number"
  readonly percentage: "percentage"
  readonly scientific: "scientific"
}

export type NumberFormatEnumValue = "currency" | "number" | "percentage" | "scientific"

/**
 * This enum represents the different phases in which a web data connector can be run.
 */
export interface PhaseEnum {
  readonly authPhase: "authPhase";
  readonly gatherDataPhase: "gatherDataPhase";
  readonly interactivePhase: "interactivePhase";
}

export type PhaseEnumValue = "authPhase" | "gatherDataPhase" | "interactivePhase"

/**
 * This enum represents the default unit format that can optionally be assigned as metadata for columns of the int and float dataType.
 */
export interface UnitFormatsEnum {
  readonly billions_english: "billions_english"
  readonly billions_standard: "billions_standard"
  readonly millions: "millions"
  readonly thousands: "thousands"
}

export type UnitsFormatEnumValue = "billions_english" | "billions_standard" | "millions" | "thousands"

declare const t: tableau;

export default t;