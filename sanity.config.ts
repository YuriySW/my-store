import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { deskStructure } from './src/sanity/deskStructure';

export default defineConfig({
  name: 'default',
  title: 'Fireline Admin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6jto0ep',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [
    deskTool({ structure: deskStructure }),
    visionTool({
      defaultApiVersion: '2023-05-03', // Устанавливаем стабильную версию
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'subcategory-by-parent',
        title: 'Подкатегория (в выбранной категории)',
        schemaType: 'category',
        parameters: [{ name: 'parentId', title: 'Parent category id', type: 'string' }],
        value: ({ parentId }) => ({ parent: { _type: 'reference', _ref: parentId } }),
      },
      {
        id: 'product-by-category',
        title: 'Товар (в выбранной подкатегории)',
        schemaType: 'product',
        parameters: [{ name: 'categoryId', title: 'Category id', type: 'string' }],
        value: ({ categoryId }) => ({ category: { _type: 'reference', _ref: categoryId } }),
      },
    ],
  },
});
