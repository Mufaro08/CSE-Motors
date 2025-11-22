const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Inventory by classification
router.get("/type/:classificationId", invController.buildByClassificationId);

// Vehicle detail
router.get("/detail/:inv_id", invController.getVehicleDetail);

module.exports = router;
