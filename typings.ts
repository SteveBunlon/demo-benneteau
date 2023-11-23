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

export type BrandsCustomizer = CollectionCustomizer<Schema, 'brands'>;
export type BrandsRecord = TPartialRow<Schema, 'brands'>;
export type BrandsConditionTree = TConditionTree<Schema, 'brands'>;
export type BrandsFilter = TPaginatedFilter<Schema, 'brands'>;
export type BrandsSortClause = TSortClause<Schema, 'brands'>;
export type BrandsAggregation = TAggregation<Schema, 'brands'>;

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
      'short_text': string;
      'article': string;
      'boat_id': number;
      'is_published': boolean;
      'order': number;
      'created_at': string;
      'updated_at': string;
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
      'boat:brand_id': number;
      'boat:created_at': string;
      'boat:updated_at': string;
      'boat:brand:id': number;
      'boat:brand:name': string;
      'boat:brand:created_at': string;
      'boat:brand:updated_at': string;
    };
  };
  'boats': {
    plain: {
      'id': number;
      'designation': string;
      'is_old': boolean;
      'type': string;
      'as400_model': string;
      'as400_variant': string;
      'brand_id': number;
      'created_at': string;
      'updated_at': string;
    };
    nested: {
      'brand': Schema['brands']['plain'] & Schema['brands']['nested'];
    };
    flat: {
      'brand:id': number;
      'brand:name': string;
      'brand:created_at': string;
      'brand:updated_at': string;
    };
  };
  'brands': {
    plain: {
      'id': number;
      'name': string;
      'created_at': string;
      'updated_at': string;
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
      'created_at': string;
      'updated_at': string;
      'brandName': string;
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
      'boat:brand_id': number;
      'boat:created_at': string;
      'boat:updated_at': string;
      'boat:brand:id': number;
      'boat:brand:name': string;
      'boat:brand:created_at': string;
      'boat:brand:updated_at': string;
    };
  };
};
