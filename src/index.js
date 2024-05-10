const express = require ('express')
const cors = require ('cors')
const routes = require ('./routes/routes')

const app = express()

app.use (cors ())
app.use (express.json ())
app.use ('/', routes)

const PORT = process.env.PORT || 501

app.listen (PORT, () =>
{
    console.log (`Listen Port: ${PORT}`)
})