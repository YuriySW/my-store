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
      name: 'category',
      title: 'Категория',
      type: 'reference',
      to: [{type: 'portfolioCategory'}],
      validation: (Rule) => Rule.required(),
      description: 'Камины, Барбекю, Биокамины и т.д.',
      options: {
        // только основные (без подкатегорий)
        filter: '!defined(parent)',
      },
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
      category: 'category.name',
    },
    prepare({title, media, count, category}) {
      const n = Array.isArray(count) ? count.length : 0
      const bits = [category, n ? `${n} фото` : 'Нет фото'].filter(Boolean)
      return {
        title: title || 'Без названия',
        subtitle: bits.join(' · '),
        media,
      }
    },
  },
})

