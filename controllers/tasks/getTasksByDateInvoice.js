const { Task } = require("../../models/taskSchema");

const getTasksByDateInvoice = async (req, res, next) => {
  const { _id } = await req.user;
  const { startDate, endDate } = req.query;

  console.log(req.body);

  try {
    const data = await Task.find(
      { owner: _id, dateInvoice: { $gte: startDate, $lte: endDate } },
      { owner: 0 }
    ).sort({
      dateOrder: 1,
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getTasksByDateInvoice;
