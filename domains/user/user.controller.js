const { fetchUsers, postUser } = require("./user.service");

// list users
exports.list = async (req, res) => {
  try {
    const response = await fetchUsers();
    res.json(response);
  } catch (error) {
    res.json({ error: error });
  }
};

// post user
exports.post = async (req, res) => {
  try {
    const { username } = req.body;

    const { _id: res_id } = await postUser({
      username,
    });
    const response = {
      username: username,
      _id: res_id,
    };
    res.json(response);
  } catch (error) {
    res.json({ error: error });
  }
};