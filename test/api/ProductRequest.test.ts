import { get } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'
import { productSchema, arraySchema } from '../../src/schemas/Product.schema';

chai.use(chaiJsonSchema)

import dotenv = require('dotenv')
dotenv.config()

const expect = chai.expect

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
