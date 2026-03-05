import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Fireline Admin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6jto0ep',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [
    deskTool(),
    visionTool({
      defaultApiVersion: '2023-05-03', // Устанавливаем стабильную версию
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
