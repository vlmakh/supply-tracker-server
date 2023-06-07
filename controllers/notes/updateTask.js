const { Task, joiTodosSchema } = require("../../models/taskSchema");
const { NotFound } = require("http-errors");

const updateTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { todos } = req.body;

  try {
    const { error } = joiTodosSchema.validate({ todos });

    if (error) {
      error.status = 400;
      error.message = "missing todos";
      throw error;
    }

    const data = await Task.findByIdAndUpdate(
      taskId,
      { todos },
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
