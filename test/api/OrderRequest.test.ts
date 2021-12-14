import { post, get, put, del } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'
import { Order } from '../../src/models/Order';
import { orderSchema, arraySchema } from '../../src/schemas/Order.schema';

chai.use(chaiJsonSchema)

import dotenv = require('dotenv')
dotenv.config()

const expect = chai.expect

let orderId = 0

const data: Order = {
  orderId           : 1,
  orderDate         : "2017-02-28T19:52:39Z",
  customerId        : 54321,
  productsOrdered   : {"1":1, "2":1, "3":1}
}

const updateData = (customerId: number) => {
  const newData = {...data}
  newData.customerId = customerId
  return newData
}


describe('Order', () => {
  describe('Create Order', () => {

    it('POST method for create an order', async () => {

      const response = await post(`${process.env.API_URL}/api/order/`)
        .send(data)
      expect(response.status).to.equal(StatusCodes.CREATED)
      expect(response.body).to.have.property('orderId');
      orderId = response.body.orderId

    })
  })

  describe('Recreate Order', () => {
    it('POST method for recreate the same Order', async () => {

      try {
        await post(`${process.env.API_URL}/api/order/`)
        .send(data)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.CONFLICT)
      }

    })
  })

  describe('Get All Orders', () => {
    it('GET method for find all orders', async () => {

      const response = await get(`${process.env.API_URL}/api/order/`)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.be.jsonSchema(arraySchema)
    })
  })

  describe('Get Order by orderId', () => {
    it('GET method for find an order by id', async () => {

      const response = await get(`${process.env.API_URL}/api/order/${orderId}`)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.be.jsonSchema(orderSchema)
      expect(response.body).to.have.property('orderId');
      orderId = response.body.orderId

    })
  })

  describe('Get Order with a wrong orderId', () => {
    it('GET method for find an order by id = 0', async () => {
      try {
        await get(`${process.env.API_URL}/api/order/0`)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })


  describe('Update Order', () => {
    it('PUT method for update an order with orderId', async () => {

      const response = await put(`${process.env.API_URL}/api/order/${orderId}`)
        .send(updateData(8))
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.be.jsonSchema(orderId)
      expect(response.body.customerId).to.be.eq(8);
    })
  })

  describe('Update order with wrong orderId', () => {
    it('PUT method for update an order with wrong orderId = 0', async () => {

      try {
        await put(`${process.env.API_URL}/api/order/0`)
        .send(updateData(8))
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })

  describe('Delete Order', () => {
    it('DELETE method for delete an order with orderId', async () => {
      const response = await del(`${process.env.API_URL}/api/order/${orderId}`)
      expect(response.status).to.equal(StatusCodes.NO_CONTENT)
    })
  })

  describe('Delete Order with wrong orderId', () => {
    it('DELETE method for delete an order with orderId', async () => {
      try {
        await del(`${process.env.API_URL}/api/order/${orderId}`)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })

})
