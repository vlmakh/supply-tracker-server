const { Task } = require("../../models/taskSchema");
const { NotFound } = require("http-errors");

const updateTaskOwner = async (req, res, next) => {
  const { taskId } = req.params;
  const { ownerId } = req.body;

  try {
    const data = await Task.findByIdAndUpdate(
      taskId,
      { owner: ownerId },
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

module.exports = updateTaskOwner;
