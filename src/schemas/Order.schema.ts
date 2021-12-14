export const orderSchema = {
    title: 'Order Schema',
    type: 'object',
    required: ['orderId', 'orderDate', 'customerId', 'productsOrdered'],
    properties: {
      orderId: {
        type: 'integer',
      },
      orderDate: {
        type: 'string',
      },
      customerId: {
        type: 'integer',
      },
      productsOrdered: {
        type: 'object',
      },
    },
  }
  
export const arraySchema = {
    title: 'Orders Array Schema',
    type: 'array',
    items: orderSchema
  }