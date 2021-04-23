require('dotenv').config()
const express = require('express')
const db = require('../server/config/db/db')
const fs = require('fs')


const authRoute = require('../server/route/auth')
const adminRoute = require('../server/route/admin')
const accountRoute = require('../server/route/account')
const cors = require('cors')

db.connect()

const app = express()
app.use(express.json())
app.use(cors())


app.use('/api/auth', authRoute)
app.use('/api/admin', adminRoute)
app.use('/api/account', accountRoute)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server started on Port ${PORT}`)
})