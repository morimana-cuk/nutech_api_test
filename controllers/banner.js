const db = require("../config/database");

const getBanners = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM banners");
    return res.status(200).json({
      status: 0,
      Message: "Success",
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const getservices = async () => {
    const [rows] = await db.execute("SELECT * FROM services");
    return res.status(200).json({
      status: 0,
      Message: "Success",
      data: rows,
    });
}

module.exports = {
  getBanners,
  getservices,
};
