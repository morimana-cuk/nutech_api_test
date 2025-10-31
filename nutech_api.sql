-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 31, 2025 at 03:52 PM
-- Server version: 8.0.30
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutech_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int NOT NULL,
  `banner_name` varchar(255) NOT NULL,
  `banner_image` text NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `banner_name`, `banner_image`, `description`, `created_at`) VALUES
(1, 'Promo Akhir Tahun', 'https://cdn.example.com/images/banner1.jpg', 'Diskon spesial hingga 50% untuk semua layanan!', '2025-10-30 06:46:16'),
(2, 'Diskon Pulsa 20%', 'https://cdn.example.com/images/banner2.jpg', 'Nikmati diskon 20% untuk isi ulang pulsa selama periode promo.', '2025-10-30 06:46:16'),
(3, 'Bonus Game Voucher', 'https://cdn.example.com/images/banner3.jpg', 'Dapatkan bonus voucher game untuk setiap transaksi di atas 50.000.', '2025-10-30 06:46:16'),
(4, 'Topup Cashback', 'https://cdn.example.com/images/banner4.jpg', 'Cashback saldo hingga 10% untuk topup pertama kamu.', '2025-10-30 06:46:16'),
(5, 'Event Ramadan', 'https://cdn.example.com/images/banner5.jpg', 'Nikmati berbagai penawaran menarik selama bulan Ramadan.', '2025-10-30 06:46:16'),
(6, 'Paket Data Hemat', 'https://cdn.example.com/images/banner6.jpg', 'Beli paket data hemat mulai dari 10.000.', '2025-10-30 06:46:16'),
(7, 'Flash Sale', 'https://cdn.example.com/images/banner7.jpg', 'Flash sale khusus hari ini, jangan sampai ketinggalan!', '2025-10-30 06:46:16'),
(8, 'Gratis Ongkir', 'https://cdn.example.com/images/banner8.jpg', 'Gratis ongkir untuk pembelian layanan tertentu.', '2025-10-30 06:46:16'),
(9, 'Referral Reward', 'https://cdn.example.com/images/banner9.jpg', 'Ajak teman dan dapatkan saldo gratis!', '2025-10-30 06:46:16'),
(10, 'Upgrade Keanggotaan', 'https://cdn.example.com/images/banner10.jpg', 'Upgrade akun kamu dan dapatkan fitur eksklusif.', '2025-10-30 06:46:16');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_code` varchar(255) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_icon` text NOT NULL,
  `service_tariff` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_code`, `service_name`, `service_icon`, `service_tariff`) VALUES
('AIRPDAM', 'Tagihan PDAM', 'https://cdn.example.com/icons/pdam.png', 35000),
('DATA1GB', 'Paket Data 1GB', 'https://cdn.example.com/icons/data1gb.png', 15000),
('DATA5GB', 'Paket Data 5GB', 'https://cdn.example.com/icons/data5gb.png', 50000),
('PLN20', 'Token Listrik 20.000', 'https://cdn.example.com/icons/pln20.png', 20000),
('PLN50', 'Token Listrik 50.000', 'https://cdn.example.com/icons/pln50.png', 50000),
('PULSA10', 'Pulsa 10.000', 'https://cdn.example.com/icons/pulsa10.png', 10000),
('PULSA20', 'Pulsa 20.000', 'https://cdn.example.com/icons/pulsa20.png', 20000),
('VOUCHERFF', 'Voucher Free Fire', 'https://cdn.example.com/icons/ff.png', 10000),
('VOUCHERML', 'Voucher Mobile Legends', 'https://cdn.example.com/icons/ml.png', 12000),
('VOUCHERPUBG', 'Voucher PUBG', 'https://cdn.example.com/icons/pubg.png', 15000);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `service_code` varchar(255) NOT NULL,
  `transaction_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'PAYMENT',
  `total_amount` int NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `invoice_number`, `user_id`, `service_code`, `transaction_type`, `total_amount`, `created_on`) VALUES
(1, 'INV31-10-2025-001', 1, 'AIRPDAM', 'PAYMENT', 35000, '2025-10-31 14:01:36'),
(2, 'INV31-10-2025-002', 1, 'AIRPDAM', 'PAYMENT', 35000, '2025-10-31 14:04:27'),
(3, 'INV31-10-2025-003', 1, 'AIRPDAM', 'PAYMENT', 35000, '2025-10-31 14:05:06'),
(4, 'INV31-10-2025-004', 1, 'AIRPDAM', 'PAYMENT', 35000, '2025-10-31 14:06:25'),
(5, 'INV31-10-2025-005', 1, 'AIRPDAM', 'PAYMENT', 35000, '2025-10-31 14:06:37'),
(6, 'INV31-10-2025-006', 1, 'AIRPDAM', 'PAYMENT', 35000, '2025-10-31 14:11:00'),
(7, 'INV31-10-2025-007', 1, 'AIRPDAM', 'PAYMENT', 35000, '2025-10-31 15:34:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_image` text,
  `balance` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `email`, `first_name`, `last_name`, `password`, `profile_image`, `balance`, `created_at`) VALUES
(1, 'morimana@gmail.com', 'User1', 'Nutech1', '$2b$10$0QPavjQ4u3nK.7KqWAtKKegs9Kz70QkS4TU6IsY.fvKLbSGD3Q7LC', 'img\\upload\\7ff70e50b653aac78fbcf09fdc04d1e9', 955000, '2025-10-30 08:14:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_code`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoice_number` (`invoice_number`),
  ADD UNIQUE KEY `invoice_number_2` (`invoice_number`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
