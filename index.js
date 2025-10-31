const express = require("express");
const app = express();
const db = require("./config/database");
const routes = require("./routes/route");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(routes);

const initializeServer = async () => {
  try {
    // Cek koneksi database
    const connection = await db.getConnection();
    console.log("Database connection established successfully.");
    connection.release();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

initializeServer();
