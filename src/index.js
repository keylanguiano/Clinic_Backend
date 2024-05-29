const express = require ('express')
const cors = require ('cors')
const routes = require ('./routes/routes')

require ('dotenv').config ()
const PORT = process.env.PORT || 501

const app = express()

app.use (cors ())
app.use (express.json ())
app.use ('/', routes)

app.listen (PORT, () =>
{
    console.log (`Listen Port: ${PORT}`)
})