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

invCont.buildManagementView = async function (req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash("info")
    });
  } catch (error) {
    next(error);
  }
};

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  });
};

invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;

  const result = await invModel.addClassification(classification_name);

  if (result) {
    req.flash("info", "New classification added.");
    res.redirect("/inv/management");
  } else {
    req.flash("error", "Failed to add classification.");
    res.redirect("/inv/add-classification");
  }
};

//POST add inventory
invCont.addInventory = async function (req, res, next) {
  const data = req.body;

  const result = await invModel.addInventory(data);

  if (result) {
    req.flash("info", "Inventory item added.");
    res.redirect("/inv/management");
  } else {
    req.flash("error", "Failed to add inventory item.");
    res.redirect("/inv/add-inventory");
  }
};



module.exports = invCont;
