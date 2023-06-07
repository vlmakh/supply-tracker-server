const { Task } = require("../../models/taskSchema");

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const data = await Task.findByIdAndDelete(taskId);
    if (!data) {
      res.status(404).json({ message: `Task with id ${taskId} was not found` });
      return;
    }
    const _id = data._doc._id;

    res.status(200).json({ message: "Task deleted", _id });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteTask;
