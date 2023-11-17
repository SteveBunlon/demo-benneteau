/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type ActusCustomizer = CollectionCustomizer<Schema, 'actus'>;
export type ActusRecord = TPartialRow<Schema, 'actus'>;
export type ActusConditionTree = TConditionTree<Schema, 'actus'>;
export type ActusFilter = TPaginatedFilter<Schema, 'actus'>;
export type ActusSortClause = TSortClause<Schema, 'actus'>;
export type ActusAggregation = TAggregation<Schema, 'actus'>;

export type BoatsCustomizer = CollectionCustomizer<Schema, 'boats'>;
export type BoatsRecord = TPartialRow<Schema, 'boats'>;
export type BoatsConditionTree = TConditionTree<Schema, 'boats'>;
export type BoatsFilter = TPaginatedFilter<Schema, 'boats'>;
export type BoatsSortClause = TSortClause<Schema, 'boats'>;
export type BoatsAggregation = TAggregation<Schema, 'boats'>;

export type DocumentsCustomizer = CollectionCustomizer<Schema, 'documents'>;
export type DocumentsRecord = TPartialRow<Schema, 'documents'>;
export type DocumentsConditionTree = TConditionTree<Schema, 'documents'>;
export type DocumentsFilter = TPaginatedFilter<Schema, 'documents'>;
export type DocumentsSortClause = TSortClause<Schema, 'documents'>;
export type DocumentsAggregation = TAggregation<Schema, 'documents'>;


export type Schema = {
  'actus': {
    plain: {
      'id': number;
      'title': string;
      'shortText': string;
      'article': string;
    };
    nested: {};
    flat: {};
  };
  'boats': {
    plain: {
      'id': number;
      'designation': string;
      'is_old': boolean;
      'type': string;
      'as400_model': string;
      'as400_variant': string;
    };
    nested: {};
    flat: {};
  };
  'documents': {
    plain: {
      'id': number;
      'title': string;
      'type': string;
      'creation_date': string;
      'is_confidential': boolean;
      'reference_code': string;
      'file_url': string;
      'boat_id': number;
    };
    nested: {
      'boat': Schema['boats']['plain'] & Schema['boats']['nested'];
    };
    flat: {
      'boat:id': number;
      'boat:designation': string;
      'boat:is_old': boolean;
      'boat:type': string;
      'boat:as400_model': string;
      'boat:as400_variant': string;
    };
  };
};
