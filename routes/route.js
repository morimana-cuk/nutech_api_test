const express = require("express");
const router = express.Router();
const db = require("../config/database");
const { getBanners, getservices } = require("../controllers/banner");
const { registeruser, login } = require("../controllers/auth/auth");
const { verifytoken } = require("../middlewares/validation");
const {
  getprofile,
  updateprofile,
  updateprofileimage,
} = require("../controllers/profile");
const {
  getBalanceController,
  topupController,
  TransactionController,
  getTransactionHistory,
} = require("../controllers/Transaction");
const multer = require("multer");
const upload = multer({ dest: "img/upload" });

router.get("/banners", getBanners);
router.post("/registration", registeruser);
router.post("/login", login);

router.get("/services", verifytoken, getservices);
router.get("/profile", verifytoken, getprofile);
router.put("/profile/update", verifytoken, updateprofile);
router.put(
  "/profile/image",
  verifytoken,
  upload.single("profile_image"),
  updateprofileimage
);

router.get("/balance", verifytoken, getBalanceController);
router.put("/topup", verifytoken, topupController);
router.post("/transaction", verifytoken, TransactionController);
router.get("/transaction/history", verifytoken, getTransactionHistory);

module.exports = router;
