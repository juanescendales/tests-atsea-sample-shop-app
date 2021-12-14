export const productSchema = {
    title: 'Product Schema',
    type: 'object',
    required: ['description', 'image', 'name', 'price', 'productId',],
    properties: {
      description: {
        type: 'string',
      },
      image: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      price: {
        type: 'number',
      },
      productId: {
        type: 'integer',
      },
    },
  }
  
export const arraySchema = {
    title: 'Products Array Schema',
    type: 'array',
    items: productSchema
}