const User = require("../Models/userModel");

exports.getProfile = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email: email });
    delete user.password;
    if (!user) {
      return res.json({ messae: "User Not Found" });
    }

    return res.json({ user });
  } catch (error) {
    return res.json({ message: "Error occured While getting user Info" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;

    const allowedFields = [
      "firstName",
      "lastName",
      "phone",
      "dateOfBirth",
      "gender",
      "isSubscribedToNewsletter",
    ];

    let isModified = false;

    for (let field of allowedFields) {
      if (field in req.body && req.body[field] !== user[field]?.toString()) {
        user[field] = req.body[field];
        isModified = true;
      }
    }

    if (isModified) {
      await user.save();
    }

    const updatedUser = user.toObject();
    delete updatedUser.password;
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
