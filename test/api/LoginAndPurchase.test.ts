import { post, del, get } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'

import dotenv = require('dotenv')
dotenv.config()

const expect = chai.expect

let token = ''

describe('Login And Purchase', () => {

  let customerId = 0
    before(async () => {
      const data = {
        customerId : 0,
        name       : "Gordon",
        address    : "144 Townsend, San Francisco 99999",
        email      : "sally@example.com",
        phone      : "513 222 5555",
        username   : "gordon",
        password   : "gordonpassword",
        enabled    : "true",
        role       : "USER"
      }

      try {
        const response = await post(`${process.env.API_URL}/api/customer/`)
          .send(data)
        if(response?.body?.customerId) {
          customerId = response.body.customerId
        }
      } catch (error) {
        console.log(error)
      }
    })
    after(async () => {
      try {
        await del(`${process.env.API_URL}/api/customer/${customerId}`)
      } catch (error) {
        console.log(error)
      }
    })

  describe('Login', () => {

    const loginData = {
      username : "gordon",
      password : "gordonpassword"
    }

    it('POST method for login an user', async () => {
      const response = await post(`${process.env.API_URL}/login/`)
        .send(loginData)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.have.property('token');
      token = response.body.token
    })
  })

  describe('Login with wrong username return Not Found username', () => {

    const loginData = {
      username : "gordon_bad",
      password : "gordonpassword"
    }

    it('POST method for login an user with wrong username', async () => {
      try {
        await post(`${process.env.API_URL}/login/`)
        .send(loginData)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })

  describe('Login with wrong password', () => {

    const loginData = {
      username : "gordon",
      password : "gordonpassword_bad"
    }

    it('POST method for login an user with wrong password return UNAUTHORIZED', async () => {
      try {
        await post(`${process.env.API_URL}/login/`)
        .send(loginData)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.UNAUTHORIZED)
      }
    })
  })

  describe('Purchase', () => {

    it('GET method for purchase', async () => {
      const response = await get(`${process.env.API_URL}/purchase/`).set({ "Authorization": `Bearer ${token}` })
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.have.property('message');
    })
  })

  describe('Purchase without token', () => {
    it('GET method for purchase without token', async () => {
      try {
        await get(`${process.env.API_URL}/purchase/`)
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
      }
    })
  })

  describe('Purchase with invalid token', () => {
    it('GET method for purchase with invalid token', async () => {
      try {
        await get(`${process.env.API_URL}/purchase/`).set({ "Authorization": 'Bearer invalid_token' })
      } catch (error) {
        expect(error.response.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
      }
    })
  })

})
