const getCurrent = async (req, res, next) => {
  try {
    const { name, email, role } = await req.user;

    res.status(200).json({ name, email, role });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
