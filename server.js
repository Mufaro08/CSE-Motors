const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
const app = express();

const staticRoute = require("./routes/static");
const inventoryRoute = require("./routes/inventoryRoute");

// View engine setup
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

// Middleware
app.use(staticRoute);

// Home route
app.get("/", async (req, res) => {
  const utilities = require("./utilities");
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", nav });
});

// Inventory routes
app.use("/inv", inventoryRoute);

// Local server
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
