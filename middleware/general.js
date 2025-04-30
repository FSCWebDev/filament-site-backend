const {
  JoiValidationError,
  AlreadyCreatedObjectError,
} = require("../utilities");
const jwt = require("jsonwebtoken");

const validateData = modelValidator => {
  return (req, _, next) => {
    const { value, error } = modelValidator.validate(req.body);

    if (error) {
      throw new JoiValidationError(error.message, 500);
    }

    req.validatedBody = value;
    next();
  };
};

const findData = (Model, queryStrings) => {
  return async (req, _, next) => {
    // Creates a query object from queryStrings
    const query = {};
    for (let i of queryStrings) {
      query[i] = req.validatedBody[i];
    }

    // Checks if document exists
    const doc = await Model.findOne(query);
    if (doc) {
      req.foundDoc = doc;
    }

    next();
  };
};

const createData = Model => {
  return async (req, _, next) => {
    if (req.foundDoc) {
      throw new AlreadyCreatedObjectError(
        `Material with type '${req.validatedBody.type}' and color '${req.validatedBody.color}' already exists.`
      );
    }

    req.createdDoc = await Model.create(req.validatedBody);

    next();
  };
};

const updateData = () => {
  return async (req, _, next) => {
    if (!req.foundDoc) {
      throw new AlreadyCreatedObjectError(`Material was not found.`);
    }

    for (let key of Object.keys(req.validatedBody)) {
      req.foundDoc[key] = req.validatedBody[key];
    }
    await req.foundDoc.save();

    next();
  };
};

const updateOrCreateData = Model => {
  return async (req, _, next) => {
    if (!req.foundDoc) {
      Model.create(req.validatedBody);
      next();
    }

    for (let key of Object.keys(req.validatedBody)) {
      req.foundDoc[key] = req.validatedBody[key];
    }
    await req.foundDoc.save();

    next();
  };
};

const deleteData = () => {
  return async (req, _, next) => {
    if (!req.foundDoc) {
      throw new AlreadyCreatedObjectError(`Material was not found.`);
    }

    const doc = await req.foundDoc.deleteOne();
    req.deletedDoc = doc;

    next();
  };
};

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  console.log(process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  validateData,
  findData,
  createData,
  updateData,
  updateOrCreateData,
  deleteData,
  authorizeUser,
};
