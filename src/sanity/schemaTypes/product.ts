import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Товары',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Название товара',
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
      name: 'price',
      title: 'Цена (₽)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'reference',
      to: [{ type: 'category' }],
      weak: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Изображения товара',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
    }),
    defineField({
      name: 'details',
      title: 'Детали',
      type: 'text',
    }),
    defineField({
      name: 'characteristics',
      title: 'Характеристики',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'characteristic',
          title: 'Характеристика',
          fields: [
            { name: 'key', title: 'Параметр (напр. Длина)', type: 'string' },
            { name: 'value', title: 'Значение (напр. 1000 мм)', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      categoryName: 'category.name',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, price, categoryName, media } = selection
      return {
        title: title || 'Без названия',
        subtitle: `${categoryName || 'Без категории'} — ${price ? `${price} ₽` : 'Цена не указана'}`,
        media: media,
      }
    },
  },
})
