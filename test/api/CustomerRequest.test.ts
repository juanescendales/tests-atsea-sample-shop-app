import { post, get, put, del } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'
import { Customer } from '../../src/models/Customer';
import { customerSchema } from '../../src/schemas/Customer.schema';

chai.use(chaiJsonSchema)

import dotenv = require('dotenv')
dotenv.config()

const expect = chai.expect

let customerId = 0

const data: Customer = {
  customerId : 0,
  name       : "Sally Vallery",
  address    : "144 Townsend, San Francisco 99999",
  email      : "sally@example.com",
  phone      : "513 222 5555",
  username   : "sallyv",
  password   : "sallypassword",
  enabled    : true,
  role       : "USER"
}

const updateData = (newAddres: string) => {
  const newData = {...data}
  newData.address = newAddres
  return newData
}


describe('Customer', () => {
  describe('Create Customer', () => {

    it('POST method for create a customer', async () => {

      const response = await post(`${process.env.API_URL}/api/customer/`)
        .send(data)
      expect(response.status).to.equal(StatusCodes.CREATED)
      expect(response.body).to.have.property('customerId');
      customerId = response.body.customerId

    })
  })

  describe('Recreate Customer', () => {
    it('POST method for recreate the same customer', async () => {

      try {
        await post(`${process.env.API_URL}/api/customer/`)
        .send(data)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.CONFLICT)
      }

    })
  })

  describe('Get Customer by customerId', () => {
    it('GET method for find a customer by id', async () => {

      const response = await get(`${process.env.API_URL}/api/customer/${customerId}`)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.be.jsonSchema(customerSchema)
      expect(response.body).to.have.property('customerId');
      customerId = response.body.customerId

    })
  })

  describe('Get Customer with a wrong customerId', () => {
    it('GET method for  find a customer by id = 0', async () => {
      try {
        await get(`${process.env.API_URL}/api/customer/0`)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })

  describe('Get Customer by name', () => {
    it('GET method for find a customer by name', async () => {

      const response = await get(`${process.env.API_URL}/api/customer/name=${data.name}`)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.be.jsonSchema(customerSchema)
      expect(response.body).to.have.property('customerId');
      customerId = response.body.customerId

    })
  })

  describe('Get Customer with a wrong name', () => {
    it('GET method for  find a customer by name = "not_found_name"', async () => {
      try {
        await get(`${process.env.API_URL}/api/customer/name=not_found_name`)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })

  describe('Get Customer by useraname', () => {
    it('GET method for find a customer by username', async () => {

      const response = await get(`${process.env.API_URL}/api/customer/username=${data.username}`)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.be.jsonSchema(customerSchema)
      expect(response.body).to.have.property('customerId');
      customerId = response.body.customerId

    })
  })

  describe('Get Customer with a wrong username', () => {
    it('GET method for  find a customer by username = "not_found_username"', async () => {
      try {
        await get(`${process.env.API_URL}/api/customer/username=not_found_username`)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })

  describe('Update Customer', () => {
    it('PUT method for update a customer with customerId', async () => {

      const response = await put(`${process.env.API_URL}/api/customer/${customerId}`)
        .send(updateData('my new address'))
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.be.jsonSchema(customerSchema)
      expect(response.body.address).to.be.eq('my new address');
    })
  })

  describe('Update Customer with wrong customerId', () => {
    it('PUT method for update a customer with wrong customerId = 0', async () => {

      try {
        await put(`${process.env.API_URL}/api/customer/0`)
        .send(updateData('my new address'))
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })

  describe('Delete Customer', () => {
    it('DELETE method for delete a customer with customerId', async () => {
      const response = await del(`${process.env.API_URL}/api/customer/${customerId}`)
      expect(response.status).to.equal(StatusCodes.NO_CONTENT)
    })
  })

  describe('Delete Customer with wrong customerId', () => {
    it('DELETE method for delete a customer with customerId', async () => {
      try {
        await del(`${process.env.API_URL}/api/customer/${customerId}`)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })

  describe('Delete All Customers', () => {
    it('DELETE method for delete all customers', async () => {
      const response = await del(`${process.env.API_URL}/api/customer/`)
      expect(response.status).to.equal(StatusCodes.NO_CONTENT)
    })
  })

})
