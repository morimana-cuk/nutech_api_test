const db = require("../config/database");
const { generateInvoiceNumber } = require("./GenerateInvoice");

const getbalance = async (userId) => {
  const [result] = await db.execute(
    "SELECT balance FROM users WHERE id_user = ?",
    [userId]
  );
  return result.length > 0 ? result[0].balance : "user not found";
};

const topup = async (userId, amount) => {
  const [result] = await db.execute(
    "SELECT balance FROM users WHERE id_user = ?",
    [userId]
  );
  if (result.length > 0) {
    const currentBalance = result[0].balance;
    const newBalance = currentBalance + amount;

    await db.execute("UPDATE users SET balance = ? WHERE id_user = ?", [
      newBalance,
      userId,
    ]);
    return newBalance;
  }
};

const Transaction = async (userId, service_code) => {
  const [serviceRows] = await db.execute(
    "SELECT * FROM services WHERE service_code = ?",
    [service_code]
  );

  if (serviceRows.length === 0) {
    return {
      status: 102,
      message: "Service atau Layanan tidak ditemukan",
      data: null,
    };
  }

  const service = serviceRows[0];
  const service_tariff = Number(service.service_tariff) || 0;

  const [userRows] = await db.execute(
    "SELECT balance FROM users WHERE id_user = ?",
    [userId]
  );

  if (userRows.length === 0) {
    return {
      status: 102,
      message: "User tidak ditemukan",
      data: null,
    };
  }

  const currentBalance = Number(userRows[0].balance) || 0;
  if (currentBalance < service_tariff) {
    return {
      status: 102,
      message: "Saldo tidak cukup",
      data: null,
    };
  }

  const newBalance = currentBalance - service_tariff;
  const invoice = await generateInvoiceNumber();

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute("UPDATE users SET balance = ? WHERE id_user = ?", [
      newBalance,
      userId,
    ]);

    const [inserttransaction] = await connection.execute(
      "INSERT INTO transactions (invoice_number, user_id, service_code, total_amount) VALUES (?, ?, ?, ?)",
      [invoice, userId, service_code, service_tariff]
    );

    await connection.commit();
    const [resulttrnsaction] = await db.execute(
      "SELECT * FROM transactions WHERE id = ?",
      [inserttransaction.insertId]
    );
    return {
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: resulttrnsaction[0].invoice_number,
        service_code: resulttrnsaction[0].service_code,
        service_name: service.service_name,
        transaction_type: resulttrnsaction[0].transaction_type,
        total_amount: resulttrnsaction[0].total_amount,
        created_on: resulttrnsaction[0].created_on,
      },
    };
  } catch (error) {
    console.error("Transaction error:", error);
    await connection.rollback();
    throw error;
  } finally {
    try {
      connection.release();
    } catch (e) {
      // ignore
    }
  }
};

module.exports = { getbalance, topup, Transaction };
