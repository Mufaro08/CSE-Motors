const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

// Build inventory by classification
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = parseInt(req.params.classificationId);
    const data = await invModel.getInventoryByClassificationId(classification_id);

    const nav = await utilities.getNav();

    if (!data || data.length === 0) {
      return res.render("./inventory/classification", {
        title: "No Vehicles Found",
        nav,
        grid: "",
        errors: null,
      });
    }

    const grid = await utilities.buildClassificationGrid(data);
    const className = data[0].classification_name;

    res.render("./inventory/classification", {
      title: className + " Vehicles",
      nav,
      grid,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};

// Vehicle details by ID
invCont.getVehicleDetail = async function (req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id);
    if (isNaN(inv_id)) return res.status(400).send("Invalid inventory ID");

    const vehicle = await invModel.getVehicleById(inv_id);
    const nav = await utilities.getNav();

    if (!vehicle) {
      return res.status(404).send("Vehicle not found");
    }

    const detailHTML = utilities.buildVehicleDetailHTML(vehicle);
    const title = `${vehicle.inv_make} ${vehicle.inv_model} Details`;

    res.render("./inventory/detail", {
      title,
      nav,
      detailHTML,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = invCont;
