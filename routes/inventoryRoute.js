const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Inventory by classification
router.get("/type/:classificationId", invController.buildByClassificationId);

// Vehicle detail
router.get("/detail/:inv_id", invController.getVehicleDetail);

//Management
router.get("/management", invController.buildManagementView);

//Form Route
router.get("/add-classification", invController.buildAddClassification);

router.post(
  "/add-classification",
  inventoryValidation.classificationRules(),
  inventoryValidation.checkClassificationData,
  invController.addClassification
);

//Add-Inventory route
router.get("/add-inventory", invController.buildAddInventory);

router.post(
  "/add-inventory",
  inventoryValidation.inventoryRules(),
  inventoryValidation.checkInventoryData,
  invController.addInventory
);


module.exports = router;
