const { Task, joiTaskSchema } = require("../../models/taskSchema");
const { NotFound } = require("http-errors");

const updateTask = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const { error } = joiTaskSchema.validate(req.body);

    if (error) {
      error.status = 400;
      error.message = "body error";
      throw error;
    }

    const data = await Task.findByIdAndUpdate(
      taskId,
      { ...req.body },
      {
        new: true,
      }
    );

    if (!data) {
      throw NotFound(`Task id:${taskId} was not found`);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = updateTask;
