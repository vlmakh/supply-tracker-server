const { Task, joiTaskSchema } = require("../../models/taskSchema");

const addTask = async (req, res, next) => {
  const { _id, name } = await req.user;

  try {
    const { error } = joiTaskSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const data = await Task.create({
      ...req.body,
      owner: _id,
      ownerName: name,
    });

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = addTask;
