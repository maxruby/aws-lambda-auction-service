const schema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 3, maxLength: 255 },
      },
      required: ['title'],
    }
  },
  required: ['body'],
};

export default schema;