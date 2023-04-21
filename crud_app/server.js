const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const router = require('./server/routes/route')
const path = require('path')
const methodOverride = require('method-override')
// const js = require('./public/js/index')
const route = require('./server/routes/route')
dotenv.config({path:'config.env'})
const connectDB =require('./server/database/connection')
const PORT = process.env.PORT || 8080

// log request
app.use(morgan('tiny'));
//mongo db connection
connectDB()

// load public
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(methodOverride('_method'))
// this will returns query string(query string is the url after(question mark) ?) it help to access on form of req.body
//allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true)
app.set("view engine","ejs")
app.set('views',path.join(__dirname,"views"))
app.use('/',route)
app.listen(PORT ,() =>{
    console.log(`The server is running on http://localhost:${PORT}`)
})