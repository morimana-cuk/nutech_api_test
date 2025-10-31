const db = require("../../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const registeruser = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null,
    });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({
      status: 102,
      message: "Parameter password tidak sesuai format",
      data: null,
    });
  }

  try {
    const [existhinguser] = await db.execute(
      "SELECT id_user FROM users WHERE email = ?",
      [email]
    );
    if (existhinguser.length > 0) {
      return res.status(400).json({
        status: 102,
        message: "Email sudah terdaftar",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO `users`(`email`, `first_name`, `last_name`, `password`) VALUES (?, ?, ?, ?)",
      [email, first_name, last_name, hashedPassword]
    );

    return res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null,
    });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({
      status: 102,
      message: "Parameter password tidak sesuai format",
      data: null,
    });
  }

  try {
    const [userresult] = await db.execute(
      "SELECT id_user, password, first_name, last_name FROM users WHERE email = ?",
      [email]
    );

    // if (!userresult === 0) {
    //   return res.status(400).json({
    //     status: 102,
    //     message: "Email atau password salah",
    //     data: null,
    //   });
    // }
    if (!userresult || userresult.length === 0) {
      return res.status(400).json({
        status: 102,
        message: "Email atau password salah",
        data: null,
      });
    }

    const user = userresult[0];
    if (!user || !user.password) {
      return res.status(400).json({
        status: 102,
        message: "Email atau password salah",
        data: null,
      });
    }

    // const user = userresult[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: 102,
        message: "Email atau password salah",
        data: null,
      });
    }

    const token = jwt.sign(
      { email: email, id_user: user.id_user },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

module.exports = {
  registeruser,
  login,
};
