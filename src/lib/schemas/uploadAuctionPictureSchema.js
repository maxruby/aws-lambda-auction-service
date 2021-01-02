const schema = {
  properties: {
    body: {
      type: 'string',
      minLength: 10,
      pattern: '^data:image.+',
    },
  },
  required: ['body'],
};

export default schema;
