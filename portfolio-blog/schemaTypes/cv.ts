export default {
  name: 'cv',
  title: 'Curriculum Vitae',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the CV (e.g., Dawit Girma Resume 2026)',
    },
    {
      name: 'cvFile',
      title: 'CV File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    }
  ],
}
