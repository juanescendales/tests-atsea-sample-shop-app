import { Customer } from '../../src/models/Customer'
import { post } from 'superagent'

import dotenv = require('dotenv')
dotenv.config()

export const createUser = async () => {
    const customer: Customer = {
        customerId : 0,
        name       : "Gordon",
        address    : "144 Townsend, San Francisco 99999",
        email      : "sally@example.com",
        phone      : "513 222 5555",
        username   : "x",
        password   : "x",
        enabled    : true,
        role       : "USER"
    }
    await post(`${process.env.API_URL}/api/customer/`).send(customer)
}