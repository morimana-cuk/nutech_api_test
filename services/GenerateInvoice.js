
const db = require("../config/database");

const generateInvoiceNumber = async () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  const formatDate = dd + "-" + mm + "-" + yyyy;


  const [result] = await db.execute(
    "SELECT COUNT(*) AS total FROM transactions WHERE DATE(created_on) = CURDATE()"
  );
  const countToday = (result[0].total || 0) + 1;
  const paddedCount = String(countToday).padStart(3, "0");

  const invoice = `INV${formatDate}-${paddedCount}`;
  return invoice;
};

module.exports = { generateInvoiceNumber };
