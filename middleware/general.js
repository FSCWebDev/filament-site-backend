const {
  JoiValidationError,
  AlreadyCreatedObjectError,
} = require("../utilities");

const validateData = modelValidator => {
  return (req, res, next) => {
    const { value, error } = modelValidator.validate(req.body);

    if (error) {
      throw new JoiValidationError(error.message, 500);
    }

    req.validatedBody = value;
    next();
  };
};

const findData = (Model, queryStrings) => {
  return async (req, res, next) => {
    // Creates a query object from queryStrings
    const query = {};
    for (let i of queryStrings) {
      query[i] = req.validatedBody[i];
    }

    // Checks if document exists
    const doc = await Model.exists(query);
    if (doc) {
      req.docExists = true;
    }

    next();
  };
};

const createData = Model => {
  return async (req, res, next) => {
    if (req.docExists) {
      throw new AlreadyCreatedObjectError(
        `Material with type '${req.validatedBody.type}' and color '${req.validatedBody.color}' already exists.`
      );
    }

    await Model.create(req.validatedBody);

    next();
  };
};

module.exports = { validateData, findData, createData };
