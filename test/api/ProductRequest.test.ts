import { get } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'

chai.use(chaiJsonSchema)

import dotenv = require('dotenv')
dotenv.config()

const expect = chai.expect

const productSchema = {
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

const arraySchema = {
    title: 'Products Array Schema',
    type: 'array',
    items: productSchema
  }

describe('Products', () => {
  describe('Get All Products', () => {
    it('GET method for get all products', async () => {
      const response = await get(`${process.env.API_URL}/api/product/`)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.be.jsonSchema(arraySchema)
    })
  })

  describe('Get Single Product', () => {
    const productId = 1

    it('GET method for get single product', async () => {
      const response = await get(`${process.env.API_URL}/api/product/${productId}`)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.be.jsonSchema(productSchema)
    })
  })
})
