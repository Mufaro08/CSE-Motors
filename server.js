/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const inventoryRoute = require('./routes/inventoryRoute');
const invModel = require("./models/inventory-model");

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") 



/* ***********************
 * Routes
 *************************/
app.use(static)
//Index route
app.get("/", function (req, res) {
  res.render("index", { title: "Home" })
})

// Inventory routes
app.use("/inv", inventoryRoute)

app.get('/custom', function (req, res) {
  res.render('custom', { title: 'Custom Vehicles' });
  });

  app.get('/sedan', function (req, res) {
    res.render('sedan');
  });
  


  app.get('/suv', function (req, res) {
  res.render('suv');
  });

  app.get('/truck', function (req, res) {
  res.render('truck');
  });
/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
