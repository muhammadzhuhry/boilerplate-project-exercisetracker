const { getUser } = require("./../user/user.service");
const { fetchExercises } = require("./../exercise/exercise.service");
const { set } = require("./../../utils/methods");

// get logs
exports.get = async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    const fromDate = set.undefinedDate(from);
    const toDate = set.undefinedDate(to);
    const limitInt = parseInt(limit, 10) || null;
    const responseLogs = await fetchExercises(_id, fromDate, toDate, limitInt);
    const responseUser = await getUser(_id);
    const response = {
      responseUser,
      log: responseLogs,
      count: responseLogs.length,
    };
    res.json(response);
  } catch (error) {
    res.json({ error: error.message });
  }
};