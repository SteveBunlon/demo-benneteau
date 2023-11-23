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

export type NotificationsCustomizer = CollectionCustomizer<Schema, 'notifications'>;
export type NotificationsRecord = TPartialRow<Schema, 'notifications'>;
export type NotificationsConditionTree = TConditionTree<Schema, 'notifications'>;
export type NotificationsFilter = TPaginatedFilter<Schema, 'notifications'>;
export type NotificationsSortClause = TSortClause<Schema, 'notifications'>;
export type NotificationsAggregation = TAggregation<Schema, 'notifications'>;

export type UserNotificationsCustomizer = CollectionCustomizer<Schema, 'user-notifications'>;
export type UserNotificationsRecord = TPartialRow<Schema, 'user-notifications'>;
export type UserNotificationsConditionTree = TConditionTree<Schema, 'user-notifications'>;
export type UserNotificationsFilter = TPaginatedFilter<Schema, 'user-notifications'>;
export type UserNotificationsSortClause = TSortClause<Schema, 'user-notifications'>;
export type UserNotificationsAggregation = TAggregation<Schema, 'user-notifications'>;

export type UsersCustomizer = CollectionCustomizer<Schema, 'users'>;
export type UsersRecord = TPartialRow<Schema, 'users'>;
export type UsersConditionTree = TConditionTree<Schema, 'users'>;
export type UsersFilter = TPaginatedFilter<Schema, 'users'>;
export type UsersSortClause = TSortClause<Schema, 'users'>;
export type UsersAggregation = TAggregation<Schema, 'users'>;


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
      'boat:boat_image_path': string;
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
      'boat_image_path': string;
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
      'boat:boat_image_path': string;
      'boat:brand:id': number;
      'boat:brand:name': string;
      'boat:brand:created_at': string;
      'boat:brand:updated_at': string;
    };
  };
  'notifications': {
    plain: {
      'id': number;
      'title': string;
      'description': string;
      'brand_id': number;
      'is_live': boolean;
      'type': string;
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
  'user-notifications': {
    plain: {
      'id': number;
      'user_id': number;
      'notification_id': number;
      'is_read': boolean;
    };
    nested: {
      'user': Schema['users']['plain'] & Schema['users']['nested'];
      'notification': Schema['notifications']['plain'] & Schema['notifications']['nested'];
    };
    flat: {
      'user:id': number;
      'user:name': string;
      'user:birth_date': string;
      'user:is_blocked': boolean;
      'user:brand_id': number;
      'notification:id': number;
      'notification:title': string;
      'notification:description': string;
      'notification:brand_id': number;
      'notification:is_live': boolean;
      'notification:type': string;
      'notification:created_at': string;
      'notification:updated_at': string;
      'user:brand:id': number;
      'user:brand:name': string;
      'user:brand:created_at': string;
      'user:brand:updated_at': string;
      'notification:brand:id': number;
      'notification:brand:name': string;
      'notification:brand:created_at': string;
      'notification:brand:updated_at': string;
    };
  };
  'users': {
    plain: {
      'id': number;
      'name': string;
      'birth_date': string;
      'is_blocked': boolean;
      'brand_id': number;
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
};
