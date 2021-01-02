const schema = {
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        id: { 
          type: 'string',
          pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
        },
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      properties: {
        amount: { type: 'number', minimum: 1 },
      },
      required: ['amount'],
    }
  },
  required: ['pathParameters', 'body'],
};

export default schema;