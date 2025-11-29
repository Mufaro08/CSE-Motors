const { body, validationResult } = require("express-validator");
const utilities = require(".");

const inventoryValidation = {};

inventoryValidation.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Classification name is required.")
  ];
};

inventoryValidation.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array(),
    });
  }
  next();
};

inventoryValidation.inventoryRules = () => {
  return [
    body("inv_make").notEmpty().withMessage("Please provide a make."),
    body("inv_model").notEmpty().withMessage("Please provide a model."),
    body("inv_year").isLength({ min: 4, max: 4 }).withMessage("Year must be 4 digits."),
    body("inv_description").notEmpty().withMessage("Description is required."),
    body("inv_image").notEmpty().withMessage("Image path required."),
    body("inv_thumbnail").notEmpty().withMessage("Thumbnail path required."),
    body("inv_price").isNumeric().withMessage("Price must be numeric."),
    body("inv_miles").isNumeric().withMessage("Miles must be numeric."),
    body("inv_color").notEmpty().withMessage("Color is required."),
    body("classification_id").isInt().withMessage("Choose a classification.")
  ];
};


module.exports = inventoryValidation;
