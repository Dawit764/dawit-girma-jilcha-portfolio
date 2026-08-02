import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Certification Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer / Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date Issued',
      type: 'string',
      description: 'e.g., 2024, or Aug 2023',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Credential URL',
      type: 'url',
      description: 'Link to verify the credential (optional)',
    }),
    defineField({
      name: 'color',
      title: 'Brand Color (Hex)',
      type: 'string',
      description: 'e.g., #FF9900 for AWS. Defaults to white if left blank.',
    }),
    defineField({
      name: 'logo',
      title: 'Issuer Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
      media: 'logo',
    },
  },
})
