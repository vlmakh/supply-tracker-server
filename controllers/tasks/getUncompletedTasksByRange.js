const { Task } = require("../../models/taskSchema");

const getUncompletedTasksByRange = async (req, res, next) => {
  const { _id } = await req.user;
  const { startDate, endDate } = req.query;

  console.log(req.body);

  try {
    const data = await Task.find(
      {
        owner: _id,
        dateOrder: { $gte: startDate, $lte: endDate },
        completed: false,
      },
      { owner: 0 }
    ).sort({
      dateOrder: 1,
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getUncompletedTasksByRange;
