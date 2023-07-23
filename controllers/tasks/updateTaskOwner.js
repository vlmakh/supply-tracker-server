const { Task } = require("../../models/taskSchema");
const { NotFound, BadRequest } = require("http-errors");

const updateTaskOwner = async (req, res, next) => {
  const { taskId } = req.params;
  const { newOwnerId } = req.body;
  const { role } = await req.user;

  if (role !== "HEAD") {
    throw BadRequest("Access denied");
  } else {
    try {
      const data = await Task.findByIdAndUpdate(
        taskId,
        { owner: newOwnerId },
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
  }
};

module.exports = updateTaskOwner;
