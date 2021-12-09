import { get } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'

import dotenv = require('dotenv')
dotenv.config()

const expect = chai.expect

describe('System Utilies', () => {

  describe('Database Healthcheck', () => {

    it('GET method for check database health', async () => {
      const response = await get(`${process.env.API_URL}/utility/healthcheck/`)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.have.property('status')
    })
  })

  describe('Get Container Id', () => {
    it('GET method for get container id', async () => {
      const response = await get(`${process.env.API_URL}/utility/containerid/`)
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body).to.have.property('host')
      expect(response.body).to.have.property('ip')
    })
  })

})
