const db = require("../config/database");
const validator = require("validator");

const getprofile = async (req, res) => {
  const { id_user } = req.user;

  try {
    const [user] = await db.execute(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE id_user = ?",
      [id_user]
    );

    if (user.length === 0) {
      return res.status(404).json({
        status: 104,
        message: "User not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "success",
      data: user[0],
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

const updateprofile = async (req, res) => {
  const { id_user } = req.user;
  const { first_name, last_name } = req.body;

  try {
    const [user] = await db.execute(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE id_user = ?",
      [id_user]
    );

    if (user.length === 0) {
      return res.status(404).json({
        status: 104,
        message: "User not found",
        data: null,
      });
    }

    const updateprofile = await db.execute(
      "UPDATE users SET first_name = ?, last_name = ? WHERE id_user = ?",
      [first_name, last_name, id_user]
    );

    const [userupdate] = await db.execute(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE id_user = ?",
      [id_user]
    );

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: userupdate[0],
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

const updateprofileimage = async (req, res) => {
  const { id_user } = req.user;
  //   const { profile_image } = req.body;

  const file = req.file;
  const body = req.body || {};
  const profile_image = file ? file.path : body.profile_image;

  if (!file && typeof body.profile_image === "undefined") {
    return res.status(400).json({
      status: 102,
      message: "Parameter profile_image tidak boleh kosong",
      data: null,
    });
  }

  try {
    const [user] = await db.execute(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE id_user = ?",
      [id_user]
    );

    if (user.length === 0) {
      return res.status(404).json({
        status: 104,
        message: "User not found",
        data: null,
      });
    }

    if (file) {
      const allowed = ["image/jpeg", "image/png"];
      if (!allowed.includes(file.mimetype)) {
        return res.status(400).json({
          status: 102,
          message:
            "Format image tidak valid. Hanya jpeg dan png yang diperbolehkan",
          data: null,
        });
      }

      await db.execute("UPDATE users SET profile_image = ? WHERE id_user = ?", [
        profile_image,
        id_user,
      ]);
    }

    const [userupdate] = await db.execute(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE id_user = ?",
      [id_user]
    );

    return res.status(200).json({
      status: true,
      message: "Profile image updated successfully",
      data: userupdate[0],
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

module.exports = {
  getprofile,
  updateprofile,
  updateprofileimage,
};
