const { noSpecialCharacters } = require("./../../utils/methods");

const is = {
  missingParams: (payload) => {
    if (!payload.params) return true;
  },
  emptyParams: (payload) => {
    const { ":_id": _id } = payload.params;
    if (!_id && _id === "") return true;
  },
  queryItem: (payload) => {
    if (payload) return true;
  },
  notValidLimit: (payload) => {
    const limitInt = parseInt(payload, 10);
    if (isNaN(limitInt) || limitInt < 1) return true;
  },
  dashDate: (date) => {
    return date.search("-") !== -1;
  },
  validDate: (date) => {
    return new Date(date);
  },
  notValidDate: (payload) => {
    if (!is.dashDate(payload)) return true;
    if (is.validDate(payload).toString() === "Invalid Date") return true;
  },
};

const validate = {
  id: (payload) => {
    if (!noSpecialCharacters(payload)) {
      throw "No special characters allowed in id";
    }
  },
  query: (payload) => {
    const { from, to, limit } = payload;
    if (is.queryItem(from) && is.notValidDate(from))
      throw "Date from in query is not valid";
    if (is.queryItem(to) && is.notValidDate(to))
      throw "Date to in query is not valid";
    if (is.queryItem(limit) && is.notValidLimit(limit))
      throw "Limit in query is not valid";
  },
};

const validate_log = {
  get: function (req, res, next) {
    try {
      if (is.missingParams(req)) throw "Missing user id";
      if (is.emptyParams(req)) throw "User id is empty";
      validate.id(req.params._id);
      validate.query(req.query);

      next();
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};

exports.validate_log = validate_log;