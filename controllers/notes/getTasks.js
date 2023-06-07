const { Task } = require("../../models/taskSchema");

const getTasks = async (req, res, next) => {
  const { _id } = await req.user;

  try {
    const data = await Task.find({ owner: _id }, { owner: 0 });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getTasks;
