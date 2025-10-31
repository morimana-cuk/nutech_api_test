const db = require("../config/database");
const { getbalance, topup, Transaction } = require("../services/Transaction");

const getBalanceController = async (req, res) => {
  try {
    const balance = await getbalance(req.user.id_user);

    return res.status(200).json({
      success: 0,
      message: "Get Balance Berhasil",
      data: balance,
    });
  } catch (error) {
    console.error("Error in getBalanceController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const topupController = async (req, res) => {
  try {
    const { top_up_amount } = req.body;
    const amount = Number(top_up_amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        status: 102,
        message: "Parameter top_up_amount harus angka dan lebih besar dari 0",
        data: null,
      });
    }
    const newBalance = await topup(req.user.id_user, top_up_amount);
    // topup service should return a number or throw on invalid
    if (typeof newBalance !== "number") {
      return res.status(500).json({
        status: 500,
        message: "Gagal melakukan top up",
        data: null,
      });
    }
    if (newBalance <= 0) {
      return res.status(400).json({
        status: 102,
        message:
          "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        data: null,
      });
    }

    return res.status(200).json({
      success: 0,
      message: "Top Up Balance berhasil",
      data: newBalance,
    });
  } catch (error) {
    console.error("Error in topupController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const TransactionController = async (req, res) => {
  const { service_code } = req.body;

  if (!service_code) {
    return res.status(400).json({
      status: 100,
      message: "Parameter service_code is required",
      data: null,
    });
  }
  const [service] = await db.execute(
    "SELECT * FROM services WHERE service_code = ?",
    [service_code]
  );
  if (service.length === 0) {
    return res.status(400).json({
      status: 102,
      message: "Service ataus Layanan tidak ditemukan",
      data: null,
    });
  }

  try {
    const result = await Transaction(req.user.id_user, service_code);

    return res.status(200).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error in TransactionController:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getTransactionHistory = async (req, res) => {
  const { id_user } = req.user;

  let offset = parseInt(req.query.offset, 10);
  let limit = parseInt(req.query.limit, 10);

  if (!Number.isFinite(offset) || Number.isNaN(offset) || offset < 0) offset = 0;
  if (!Number.isFinite(limit) || Number.isNaN(limit) || limit <= 0) limit = 10;
  
  limit = Math.min(limit, 100);

  try {

    const sql = `
      SELECT 
        t.invoice_number, 
        t.transaction_type, 
        COALESCE(s.service_name, 'Top Up balance') AS description, 
        t.total_amount, 
        t.created_on
      FROM 
        transactions t
      LEFT JOIN 
        services s ON t.service_code = s.service_code
      WHERE 
        t.user_id = ?
      ORDER BY 
        t.created_on DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const [rows] = await db.execute(sql, [id_user]);

    return res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset,
        limit,
        records: rows,
      },
    });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  getBalanceController,
  topupController,
  TransactionController,
  getTransactionHistory,
};
