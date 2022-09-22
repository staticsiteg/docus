/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface QuerySchema {
  /**
   * Query name, default is generated base on the file path.
   */
  name?: string;
  /**
   * Indicating if the query is public.
   */
  public?: boolean;
  /**
   * Query description for documentation.
   */
  description?: string;
  /**
   * Specify how to implement caching, NORMAL_TABLE are used by default.
   */
  cacheProvider?: "NORMAL_TABLE" | "CACHED_TABLE";
  /**
   * Cache time in hours, -1 indicates that the query cache will not expire.
   */
  cacheHours: number;
  /**
   * Specify which queue is used to execute prefetch job. The default is MAIN.
   */
  refreshQueue?: string;
  /**
   * The CRON expressions that control when the refresh cache task is executed.
   */
  refreshCron?: string | ConditionalRefreshCrons;
  /**
   * Refresh cache time in hours, -1 indicates not to refresh.
   */
  refreshHours?: number | ConditionalHours;
  /**
   * Only return data from the cache.
   */
  onlyFromCache?: boolean;
  /**
   * Query params declaration.
   */
  params: Params[];
  resultSchema?: Schema;
}
export interface ConditionalRefreshCrons {
  param: string;
  on: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` ".*".
     */
    [k: string]: string;
  };
}
export interface ConditionalHours {
  param: string;
  on: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` ".*".
     */
    [k: string]: number;
  };
}
export interface Params {
  /**
   * URL Search param name for the query.
   */
  name: string;
  /**
   * Param description for documentation. If undefined, value in param-descriptions.json would be taken as default
   */
  description?: string;
  /**
   * Define the parameter type.
   */
  type?: "array" | "date-range" | "collection" | "employees";
  /**
   * Define the parameter corresponding column name.
   */
  column?: string;
  /**
   * Set in date-range should use that moment as `to` time.
   */
  dateRangeTo?: "now" | "last-valid-datetime";
  /**
   * Define substring in the query sql template. Replacing uses `String.replaceAll`, please make sure the replacing substring is not substring of other texts.
   */
  replaces: string;
  /**
   * Replacing templates, mapped by search value
   */
  template?: {
    [k: string]: string;
  };
  /**
   * Default input value.
   */
  default?: number | string;
  /**
   * Enums for prefetching and validating, default is no prefetching and validating.
   */
  enums?: string | string[];
  /**
   * Regular expression for validating parameter value.
   */
  pattern?: string;
}
/**
 * Result data schema for description.
 */
export interface Schema {
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  /**
   * @minItems 1
   */
  required?: [string, ...string[]];
  /**
   * @minItems 1
   */
  enum?: [unknown, ...unknown[]];
  type?: "array" | "boolean" | "integer" | "number" | "object" | "string";
  not?: Schema1 | Reference;
  allOf?: (Schema1 | Reference)[];
  oneOf?: (Schema1 | Reference)[];
  anyOf?: (Schema1 | Reference)[];
  items?: Schema1 | Reference;
  properties?: {
    [k: string]: Schema1 | Reference;
  };
  additionalProperties?: Schema1 | Reference | boolean;
  description?: string;
  format?: string;
  default?: unknown;
  nullable?: boolean;
  discriminator?: Discriminator;
  readOnly?: boolean;
  writeOnly?: boolean;
  example?: unknown;
  externalDocs?: ExternalDocumentation;
  deprecated?: boolean;
  xml?: XML;
  /**
   * This interface was referenced by `Schema1`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   *
   * This interface was referenced by `Schema`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface Schema1 {
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  /**
   * @minItems 1
   */
  required?: [string, ...string[]];
  /**
   * @minItems 1
   */
  enum?: [unknown, ...unknown[]];
  type?: "array" | "boolean" | "integer" | "number" | "object" | "string";
  not?: Schema1 | Reference;
  allOf?: (Schema1 | Reference)[];
  oneOf?: (Schema1 | Reference)[];
  anyOf?: (Schema1 | Reference)[];
  items?: Schema1 | Reference;
  properties?: {
    [k: string]: Schema1 | Reference;
  };
  additionalProperties?: Schema1 | Reference | boolean;
  description?: string;
  format?: string;
  default?: unknown;
  nullable?: boolean;
  discriminator?: Discriminator;
  readOnly?: boolean;
  writeOnly?: boolean;
  example?: unknown;
  externalDocs?: ExternalDocumentation;
  deprecated?: boolean;
  xml?: XML;
  /**
   * This interface was referenced by `Schema1`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   *
   * This interface was referenced by `Schema`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface Reference {
  /**
   * This interface was referenced by `Reference`'s JSON-Schema definition
   * via the `patternProperty` "^\$ref$".
   */
  [k: string]: string;
}
export interface Discriminator {
  propertyName: string;
  mapping?: {
    [k: string]: string;
  };
  [k: string]: unknown;
}
export interface ExternalDocumentation {
  description?: string;
  url: string;
  /**
   * This interface was referenced by `ExternalDocumentation`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
export interface XML {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
  /**
   * This interface was referenced by `XML`'s JSON-Schema definition
   * via the `patternProperty` "^x-".
   */
  [k: string]: unknown;
}
