const validate = (req, res) => {
  if (!req.body.lesson || req.body.lesson.length < 3) {
    res
      .status(400)
      .send("lesson required and should be at least 3 character long.  ");
  }
};
module.exports = validate;
