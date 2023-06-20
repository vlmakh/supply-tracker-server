const getCurrent = async (req, res, next) => {
  try {
    const { name, email } = await req.user;

    res.status(200).json({ name, email });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
