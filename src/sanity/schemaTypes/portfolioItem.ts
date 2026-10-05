import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolioItem',
  title: 'Портфолио',
  type: 'document',
  fields: [
    defineField({
      name: 'modelName',
      title: 'Модель камина',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Изображения',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      options: {
        layout: 'grid',
      },
      description: 'До 10 фото одной модели. Первое — превью в сетке.',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
  ],
  preview: {
    select: {
      title: 'modelName',
      media: 'images.0',
      count: 'images',
    },
    prepare({title, media, count}) {
      const n = Array.isArray(count) ? count.length : 0
      return {
        title: title || 'Без названия',
        subtitle: n ? `${n} фото` : 'Нет фото',
        media,
      }
    },
  },
})
