import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Категории',
  type: 'document',
  fields: [
    defineField({
      name: 'parent',
      title: 'Родительская категория',
      type: 'reference',
      to: [{ type: 'category' }],
      weak: true,
      description: 'Заполняется только для подкатегорий. Для основных категорий оставьте пустым.',
    }),
    defineField({
      name: 'name',
      title: 'Название категории',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Изображение категории',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'subcategories',
      title: 'Подкатегории',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
          options: {
            filter: ({ document }) =>
              `_id != "${document?._id ?? ''}"`,
          },
        },
      ],
      description: 'Категории, вложенные в эту. Не выбирайте эту же категорию.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      parentName: 'parent.name',
      media: 'image',
    },
    prepare({ title, parentName, media }) {
      return {
        title,
        subtitle: parentName ? `В: ${parentName}` : undefined,
        media,
      }
    },
  },
})
