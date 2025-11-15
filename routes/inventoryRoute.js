// inventoryRoute.js

const express = require("express");
const { getClassifications } = require("../models/inventory-model");
const router = express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to display vehicle details based on inv_id
router.get("/detail/:inv_id", invController.getVehicleDetail);

module.exports = router;
