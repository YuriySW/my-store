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
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'modelName',
      media: 'image',
    },
  },
})
