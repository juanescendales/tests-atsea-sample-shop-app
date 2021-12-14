import { del } from 'superagent'

import dotenv = require('dotenv')
dotenv.config()

export const deleteUsers = async () => {
    await del(`${process.env.API_URL}/api/customer/`)
}