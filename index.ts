import type { SslMode } from '@forestadmin/datasource-sql';

import 'dotenv/config';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';

import type { NotificationsRecord, Schema, UserNotificationsRecord } from './typings';

const agent = createAgent<Schema>({
  authSecret: process.env.FOREST_AUTH_SECRET!,
  envSecret: process.env.FOREST_ENV_SECRET!,

  isProduction: process.env.NODE_ENV === 'production',

  typingsPath: './typings.ts',
  typingsMaxDepth: 5,
});

agent
  .addDataSource(
    createSqlDataSource({
      uri: process.env.DATABASE_URL,
      schema: process.env.DATABASE_SCHEMA,
      sslMode: process.env.DATABASE_SSL_MODE as SslMode,
    }),
  )
  .customizeCollection('documents', collection => {
    collection.importField('brandName', { path: 'boat:brand:name' });
  })
  .customizeCollection('boats', collection => {
    collection
      .addAction('Mark as new', {
        scope: 'Bulk',
        execute: async context => {
          const ids = await context.getRecordIds();
          context.collection.update(
            { conditionTree: { field: 'id', operator: 'In', value: ids } },
            { is_old: false },
          );
        },
      })
      .addAction('Mark as old', {
        scope: 'Bulk',
        execute: async context => {
          const ids = await context.getRecordIds();
          context.collection.update(
            { conditionTree: { field: 'id', operator: 'In', value: ids } },
            { is_old: true },
          );
        },
      });
  })
  .customizeCollection('actus', collection => {
    collection
      .addAction('Publish', {
        scope: 'Bulk',
        execute: async context => {
          const ids = await context.getRecordIds();
          context.collection.update(
            { conditionTree: { field: 'id', operator: 'In', value: ids } },
            { is_published: false },
          );
        },
      })
      .addAction('Unpublish', {
        scope: 'Bulk',
        execute: async context => {
          const ids = await context.getRecordIds();
          context.collection.update(
            { conditionTree: { field: 'id', operator: 'In', value: ids } },
            { is_published: true },
          );
        },
      });
  })
  .customizeCollection('notifications', collection => {
    collection
      .addAction('Mark as live', {
        scope: 'Bulk',
        execute: async context => {
          const ids = await context.getRecordIds();
          context.collection.update(
            { conditionTree: { field: 'id', operator: 'In', value: ids } },
            { is_live: true },
          );
        },
      })
      .addAction('Mark as not live', {
        scope: 'Bulk',
        execute: async context => {
          const ids = await context.getRecordIds();
          context.collection.update(
            { conditionTree: { field: 'id', operator: 'In', value: ids } },
            { is_live: false },
          );
        },
      })
      .addAction('Push notification to brands', {
        scope: 'Global',
        form: [
          {
            label: 'Title',
            type: 'String',
            isRequired: true,
          },
          {
            label: 'Description',
            type: 'String',
            widget: 'RichText',
            isRequired: true,
          },
          {
            label: 'Type',
            type: 'Enum',
            enumValues: ['📅', '📨', '📍', '✨', '🕰️'],
            isRequired: true,
          },
          {
            label: 'Brands',
            type: 'StringList',
            widget: 'Dropdown',
            isRequired: true,
            options: async context => {
              const brands = await context.dataSource
                .getCollection('brands')
                .list({}, ['id', 'name']);
              return brands.map(brand => ({ label: brand.name, value: `${brand.id}` }));
            },
          },
        ],
        execute: async (context, resultbuilder) => {
          const brandIds = context.formValues.Brands;
          const users = await context.dataSource
            .getCollection('users')
            .list({ conditionTree: { field: 'brand_id', operator: 'In', value: brandIds } }, [
              'id',
              'brand_id',
            ]);

          const notificationsToCreate = brandIds.map(
            brandId =>
              ({
                brand_id: brandId,
                description: context.formValues.Description,
                title: context.formValues.Title,
                type: context.formValues.Type,
                is_live: true,
                created_at: new Date().toDateString(),
                updated_at: new Date().toDateString(),
              }) as NotificationsRecord,
          );

          const notifications = await context.collection.create(notificationsToCreate);

          const userNotificationsToCreate = notifications
            .map(notification => {
              const concernedUsers = users.filter(user => user.brand_id === notification.brand_id);

              return concernedUsers.map(user => ({
                is_read: false,
                notification_id: notification.id,
                user_id: user.id,
              })) as UserNotificationsRecord[];
            })
            .flat();

          await context.dataSource
            .getCollection('user-notifications')
            .create(userNotificationsToCreate);

          return resultbuilder.success(`Notification pushed to ${users.length} user(s)`);
        },
      });
  });

agent.mountOnStandaloneServer(Number(process.env.PORT));

agent.start().catch(error => {
  // eslint-disable-next-line no-console
  console.error('\x1b[31merror:\x1b[0m Forest Admin agent failed to start\n', error.stack);
  process.exit(1);
});
