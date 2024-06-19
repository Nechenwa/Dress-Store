require('dotenv').config()

const express = require('express')
const marketPlaceRoutes = require('./routes/marketPlaceRoutes')

const mongoose = require('mongoose')

const app = express();

app.get('/', (req, res) => {
    res.json({message: 'Welcome to DressStore application'})
})

app.use(express.json())
app.use('/api', marketPlaceRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("App connected to mongodb & running on a port: ", process.env.PORT)
    })
})
.catch((error) => {
    console.error(error)
})

