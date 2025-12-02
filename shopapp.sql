-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 01, 2025 at 03:57 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `description`) VALUES
(1, 'Điện thoại ', 'Danh mục này bao gồm các dòng điện thoại thông minh từ các thương hiệu như Samsung, Apple, Xiaomi, Oppo,... với nhiều mức giá và tính năng khác nhau, từ phổ thông đến cao cấp.\n'),
(2, 'Laptop', 'Bao gồm các mẫu laptop dùng cho học tập, làm việc văn phòng, đồ họa hoặc gaming từ các thương hiệu như Dell, HP, Asus, Lenovo, Apple,...'),
(3, 'Đồng hồ', 'Phụ kiện'),
(4, 'Phụ kiện', 'Bao gồm các phụ kiện như: Dây sạc, Pin, Màn hình \n'),
(5, 'Máy ảnh và quay phim', 'Máy ảnh (Canon, Sony, Fujifilm…)\nỐng kính, filter\nGimbal chống rung\nMicro thu âm, đèn LED quay video\nThẻ nhớ, túi máy ảnh '),
(6, 'Thiết bị in ấn và mạng', 'Máy in, máy scan\nMực in, giấy in\nRouter, modem, thiết bị phát Wi-Fi\nBộ chia mạng (switch), dây mạng'),
(7, 'Âm thanh và giải trí', 'Loa Bluetooth\nDàn âm thanh mini, soundbar\nMicro karaoke\nTV Box, Android Box\nKính thực tế ảo (VR)');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_code` varchar(20) NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(16,0) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Đang xử lý',
  `shipping_name` varchar(100) DEFAULT NULL,
  `shipping_phone` varchar(20) DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_code` (`order_code`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_code`, `order_date`, `total_price`, `status`, `shipping_name`, `shipping_phone`, `shipping_address`) VALUES
(3, 2, 'ORDA22696', '2025-06-10 15:55:14', 17000000, 'Đã xác nhận', 'Nguyễn Văn A', '0909876543', '45 Lê Lợi'),
(2, 2, 'ORDD64CE5', '2025-06-10 15:51:29', 17000000, 'Đã xác nhận', 'Khương', '0909123456', '123 HTV'),
(1, 2, 'ORDB99A20', '2025-06-10 15:50:13', 100000000, 'Đã hủy', 'Khương', '1234567890', '123 HTV'),
(4, 2, 'ORD4805DB', '2025-06-11 07:46:08', 69000000, 'Đã xác nhận', 'Trần Thị B', '0912345678', '80 Phan Bội Châu, ĐN'),
(5, 2, 'ORDFF4610', '2025-06-11 07:47:02', 240000000, 'Đã xác nhận', 'Nguyễn Thị Hân', '0912345678', '88 Phan Bội Châu, QN'),
(6, 2, 'ORDAA0FCD', '2025-06-11 09:22:20', 25000000, 'Đã xác nhận', 'Đen', '0912345678', '178 Phan Bội Châu, HN'),
(7, 2, 'ORD370712', '2025-06-11 09:22:48', 12000000, 'Đã xác nhận', 'Trần ', '0912345678', '12 Nguyễn Thị Minh Khai'),
(8, 2, 'ORDC2CCAD', '2025-06-11 09:24:08', 17000000, 'Đã xác nhận', 'Nguyễn C', '0912345678', '78 Ngô Mây'),
(9, 2, 'ORDB1785E', '2025-06-11 10:46:41', 38000000, 'Đã xác nhận', 'Trần B', '0912345678', '78 Phan Châu Trinh'),
(10, 2, 'ORD6E2454', '2025-06-12 14:52:57', 17000000, 'Đã xác nhận', 'Trần Đức An', '0912345987', '79 Nguyễn Lữ'),
(11, 2, 'ORD92D23A', '2025-06-12 15:41:42', 17000000, 'Đã xác nhận', 'Hahah', '0912345678', '78 Phan Bội Châu'),
(12, 2, 'ORD128419', '2025-06-12 15:44:52', 19000000, 'Đã xác nhận', 'Kakaka', '0912345678', '78 Phan Bội Châu'),
(13, 2, 'ORD65B034', '2025-06-12 15:48:17', 17000000, 'Đã xác nhận', 'khương', '1232322321', 'fdgdffgdf'),
(14, 2, 'ORD39285E', '2025-06-12 16:11:15', 17000000, 'Đã xác nhận', 'Ngô Hùng Khương', '1232322321', 'csdsa'),
(15, 2, 'ORD169888', '2025-06-12 16:12:28', 15000000, 'Đã xác nhận', 'Ngô Hùng Khương', '1232322321', 'dfsfs'),
(16, 2, 'ORDD8FAAF', '2025-06-12 16:19:30', 26000000, 'Đã xác nhận', 'khương', '1232322321', 'jhgjhgj'),
(17, 2, 'ORDA2984B', '2025-06-12 17:42:48', 15000000, 'Đã xác nhận', 'Ngô Hùng Khương', '1232322321', 'sdsds'),
(18, 2, 'ORDB9EB68', '2025-06-12 18:28:23', 16000000, 'Đã xác nhận', 'khương', '1232322321', 'fdgdgd'),
(19, 2, 'ORD064F76', '2025-06-13 14:31:37', 19000000, 'Đã xác nhận', 'Ngô Hùng Khương', '1234454545', 'kmhjkhkhk'),
(20, 2, 'ORDF06170', '2025-06-13 14:53:13', 19000000, 'Đang xử lý', 'Ngô Hùng Khương', '1234454545', 'sfsf'),
(21, 2, 'ORD5402DC', '2025-06-13 15:11:44', 19000000, 'Đã hủy', 'Ngô Hùng Khương', '1234454545', 'dsfsdfs'),
(22, 3, 'ORD8AAD03', '2025-06-15 08:04:53', 25000000, 'Đã hủy', 'Vương', '019313134', '12 Ngô Mây'),
(23, 2, 'ORD657235', '2025-06-17 12:15:34', 17000000, 'Đã xác nhận', 'Ngô Hùng Khương', 'èwe', 'sfsfsf'),
(24, 2, 'ORD578D93', '2025-06-18 09:52:20', 15000000, 'Đang xử lý', 'Black', '0123456789', 'ssssss'),
(25, 2, 'ORD6B556A', '2025-06-18 09:59:39', 17000000, 'Đang xử lý', 'Vương', '0123456789', '345 Ghềnh Ráng'),
(26, 2, 'ORDC0A29B', '2025-06-18 10:02:29', 16000000, 'Đã hủy', 'Ngô Hùng Khương', '0123456789', 'hdfhdhgd'),
(27, 2, 'ORDF17F82', '2025-06-18 10:23:48', 17000000, 'Đang xử lý', 'Black', '0123456789', 'xzasas'),
(28, 2, 'ORD06BA93', '2025-06-18 10:24:31', 17000000, 'Đang xử lý', 'khương', '0123456789', 'csada'),
(29, 2, 'ORD5EA0A4', '2025-06-18 10:26:47', 26000000, 'Đang xử lý', 'Ngô Hùng Khương', '0123456789', '123 Ngô Mây'),
(30, 2, 'ORDD165C7', '2025-06-18 10:28:34', 19000000, 'Đang xử lý', 'Ngô Hùng Khương', '0123456789', 'fdssfsd'),
(31, 2, 'ORDB5E7E7', '2025-06-18 10:30:45', 17000000, 'Đang xử lý', 'Black', '0123456789', 'kkk'),
(32, 2, 'ORDA3AC76', '2025-06-18 10:34:08', 12000000, 'Đang xử lý', 'Black', '0123456789', 'jkgkh'),
(33, 2, 'ORD7FCA2D', '2025-06-18 10:43:25', 17000000, 'Đang xử lý', 'Black', '0123456789', 'ygyjgg'),
(34, 2, 'ORDC1F94F', '2025-06-18 10:50:57', 17000000, 'Đang xử lý', 'Ngô Hùng Khương', '0123456789', 'nmn'),
(35, 2, 'ORD27FF5B', '2025-06-18 11:10:31', 31000000, 'Đang xử lý', 'Ngô Hùng Khương', '0123456789', 'dfsf'),
(36, 2, 'ORD138808', '2025-06-18 11:16:03', 12000000, 'Đang xử lý', 'Ngô Hùng Khương', '0123456789', 'ygjtjt'),
(37, 5, 'ORD27B062', '2025-06-18 11:18:20', 12000000, 'Đang xử lý', 'Ngô Hùng Khương', '0123456789', 'jkfghgfhf'),
(38, 5, 'ORD773A26', '2025-06-18 11:25:21', 16000000, 'Đang xử lý', 'Black', '0123456789', 'dfhdfgdr'),
(39, 5, 'ORD575846', '2025-06-18 11:25:52', 19000000, 'Đã xác nhận', 'Ngô Hùng Khương', '0123456789', 'gffh'),
(40, 5, 'ORDAC67B3', '2025-06-19 10:00:58', 41440000, 'Đã xác nhận', 'Black', '0123456789', '23 Phạm Ngọc Thạch'),
(41, 14, 'ORD610BC4', '2025-06-20 09:05:28', 17000000, 'Đã xác nhận', 'Blue', '0232423423', '34 Hà Duy Tập'),
(42, 3, 'ORD044E7B', '2025-06-20 13:43:31', 19000000, 'Đã xác nhận', 'Vương', '1232322321', 'dcdss'),
(43, 17, 'ORD21BBCA', '2025-07-01 10:49:12', 34000000, 'Đã hủy', 'ggg', '01231211231', 'fdfdfd');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(16,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(19, 11, 11, 1, 17000000),
(18, 10, 11, 1, 17000000),
(17, 9, 5, 2, 12000000),
(16, 9, 3, 4, 31000000),
(15, 9, 2, 3, 19000000),
(14, 9, 1, 2, 17000000),
(20, 12, 2, 1, 19000000),
(21, 12, 4, 2, 25000000),
(22, 13, 2, 10, 19000000),
(23, 13, 4, 2, 25000000),
(24, 14, 4, 1, 25000000),
(25, 15, 5, 1, 12000000),
(26, 16, 6, 1, 17000000),
(27, 17, 2, 2, 19000000),
(28, 18, 1, 1, 17000000),
(29, 19, 1, 1, 17000000),
(30, 20, 2, 1, 19000000),
(31, 21, 6, 1, 17000000),
(32, 22, 6, 1, 17000000),
(33, 23, 9, 1, 15000000),
(34, 24, 7, 1, 26000000),
(35, 25, 9, 1, 15000000),
(36, 26, 8, 1, 16000000),
(37, 27, 2, 1, 19000000),
(38, 28, 2, 1, 19000000),
(39, 29, 2, 1, 19000000),
(40, 30, 4, 1, 25000000),
(41, 31, 1, 1, 17000000),
(42, 32, 1, 2, 17000000),
(43, 33, 1, 2, 17000000),
(44, 34, 2, 1, 19000000),
(45, 24, 9, 1, 15000000),
(46, 25, 6, 1, 17000000),
(47, 26, 8, 1, 16000000),
(48, 35, 1, 1, 17000000),
(49, 36, 2, 1, 19000000),
(50, 37, 1, 1, 17000000),
(51, 27, 1, 1, 17000000),
(52, 28, 1, 1, 17000000),
(53, 29, 7, 1, 26000000),
(54, 30, 2, 1, 19000000),
(55, 31, 1, 1, 17000000),
(56, 32, 5, 1, 12000000),
(57, 33, 1, 1, 17000000),
(58, 34, 1, 1, 17000000),
(59, 35, 5, 1, 12000000),
(60, 35, 2, 1, 19000000),
(61, 36, 5, 1, 12000000),
(62, 37, 5, 1, 12000000),
(63, 38, 8, 1, 16000000),
(64, 39, 2, 1, 19000000),
(65, 40, 33, 1, 22450000),
(66, 40, 31, 1, 18990000),
(67, 41, 1, 1, 17000000),
(68, 42, 2, 1, 19000000),
(69, 43, 1, 2, 17000000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'Tên sản phẩm',
  `price` decimal(16,0) NOT NULL COMMENT 'Giá sản phẩm',
  `category` varchar(255) DEFAULT NULL COMMENT 'Loại sản phẩm',
  `trademark` varchar(255) DEFAULT NULL COMMENT 'Hãng sản xuất',
  `status` varchar(50) NOT NULL COMMENT 'Trạng thái',
  `image` varchar(255) DEFAULT NULL COMMENT 'Link ảnh',
  `quantity` int NOT NULL,
  `description` text NOT NULL,
  `images` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `category`, `trademark`, `status`, `image`, `quantity`, `description`, `images`) VALUES
(1, 'MSI Gaming Thin GF63 12UC i5 12450H', 17000000, 'Laptop', 'MSI', 'Còn hàng', 'http://localhost:3000/uploads/msi_i5.jpg', 7, '⚙️ Cấu hình chính:\r\n- CPU: Intel Core i5‑12450H (8 nhân)\r\n- RAM: 8GB DDR4\r\n- Ổ cứng: 512GB SSD NVMe\r\n- GPU: NVIDIA GeForce RTX 3050\r\n- Màn hình: 15.6\" FHD 144Hz\r\n🎮 Phù hợp: Game thủ, đồ họa cơ bản, học lập trình', '[\"http://localhost:3000/uploads/msi_i5.jpg\",\"http://localhost:3000/uploads/msii5_s1.jpg\",\"http://localhost:3000/uploads/msii5_s2.jpg\"]'),
(2, 'Samsung Galaxy S24', 19000000, 'Điện thoại', 'Samsung', 'Còn hàng', 'http://localhost:3000/uploads/samsung_s24.jpg', 7, '📱 Màn hình: Dynamic AMOLED 6.1\", Full HD+\r\n⚙️ Chip: Exynos 2400 / Snapdragon 8 Gen 3 (tuỳ khu vực)\r\n📸 Camera: Chính 50MP, góc siêu rộng 12MP, tele 10MP\r\n🔋 Pin: 4000mAh, sạc nhanh 25W\r\n💡 Hệ điều hành: Android 14, One UI 6', '[\"http://localhost:3000/uploads/samsung_s24.jpg\",\"http://localhost:3000/uploads/sss24_1.jpg\",\"http://localhost:3000/uploads/sss24_2.jpg\",\"http://localhost:3000/uploads/sss24_3.jpg\"]'),
(3, 'iPhone 14 Pro Max', 31000000, 'Điện thoại', 'Apple', 'Hết hàng', 'http://localhost:3000/uploads/iphone14promax.jpg', 0, '📱 Màn hình: Super Retina XDR 6.7\", 120Hz ProMotion\r\n📸 Camera: Triple 48MP + 12MP + 12MP\r\n🔋 Pin: 4323mAh, sạc nhanh 20W\r\n⚙️ Chip: Apple A16 Bionic\r\n💡 Face ID, iOS 16 trở lên', '[\"http://localhost:3000/uploads/iphone14promax.jpg\",\r\n\"http://localhost:3000/uploads/14pm_s1.jpg\",\r\n\"http://localhost:3000/uploads/14pm_s2.jpg\"]'),
(4, 'iPhone 14 Pro', 25000000, 'Điện thoại', 'Apple', 'Hết hàng', 'http://localhost:3000/uploads/iphone14pro.jpg', 0, '📱 Màn hình: Super Retina XDR 6.1\"\r\n📸 Camera: 48MP + 12MP\r\n⚙️ Chip: Apple A16 Bionic\r\n🔋 Pin: 3200mAh\r\n💡 Hệ điều hành: iOS 16, Face ID', '[\"http://localhost:3000/uploads/iphone14pro.jpg\",\"http://localhost:3000/uploads/ip14pro_s1.jpg\",\"http://localhost:3000/uploads/ip14pro_s2.jpg\"]'),
(5, 'Dell Inspiron 14', 12000000, 'Điện lạnh', 'Dell', 'Còn hàng', 'http://localhost:3000/uploads/dell_inspiron14.jpg', 5, '🖥️ Màn hình: 14 inch Full HD\r\n⚙️ CPU: Intel Core i5 thế hệ 11\r\n💾 RAM: 8GB DDR4, Ổ cứng: 512GB SSD\r\n🔋 Pin: 3-cell, 42Wh\r\n💡 Hệ điều hành: Windows 11 Home', '[\"http://localhost:3000/uploads/dell_inspiron14.jpg\",\"http://localhost:3000/uploads/dell_inspiron14_s1.jpg\",\"http://localhost:3000/uploads/dell_inspiron14_s2.jpg\",\"http://localhost:3000/uploads/dell_inspiron14_s3.jpg\"]'),
(6, 'Lenovo Thinkpad', 17000000, 'Điện thoại\r\n', 'Lenovo', 'Còn hàng', 'http://localhost:3000/uploads/lenovo_thinkpad.jpg', 16, '⚙️ CPU: AMD Ryzen 5 5600U\r\n💾 RAM: 16GB, SSD 512GB\r\n🖥️ Màn hình: 14\" FHD IPS\r\n📶 Cổng: USB-C, HDMI, Wi-Fi 6\r\n🔋 Pin: 45Wh, sạc nhanh', '[\"http://localhost:3000/uploads/lenovo_thinkpad.jpg\",\"http://localhost:3000/uploads/lenovo_thinkpad_s1.jpg\",\"http://localhost:3000/uploads/lenovo_thinkpad_s2.jpg\",\"http://localhost:3000/uploads/lenovo_thinkpad_s3.jpg\",\"http://localhost:3000/uploads/lenovo_thinkpad_s4.jpg\",\"http://localhost:3000/uploads/lenovo_thinkpad_s5.jpg\"]'),
(7, 'MacBook Air 13 inch M14 16/256GB', 26000000, 'Laptop', 'MaccBook', 'Còn hàng', 'http://localhost:3000/uploads/macbook-air-13-inch-m4-xanh-da-troi-600x600.jpg', 18, '🧠 Chip: Apple M4\r\n💾 RAM: 16GB, SSD: 256GB\r\n🖥️ Màn hình: 13\" Liquid Retina\r\n🔋 Pin: 18 tiếng sử dụng\r\n💡 Hệ điều hành: macOS Sonoma', '[\"http://localhost:3000/uploads/macbook-air-13-inch-m4-xanh-da-troi-600x600.jpg\",\r\n\"http://localhost:3000/uploads/macbook-air-13-inch-m4-xanh-da-troi-600x600_s1.jpg\",\r\n\"http://localhost:3000/uploads/macbook-air-13-inch-m4-xanh-da-troi-600x600_s2.jpg\",\r\n\"http://localhost:3000/uploads/macbook-air-13-inch-m4-xanh-da-troi-600x600_s3.jpg\",\r\n\"http://localhost:3000/uploads/macbook-air-13-inch-m4-xanh-da-troi-600x600_s4.jpg\",\r\n\"http://localhost:3000/uploads/macbook-air-13-inch-m4-xanh-da-troi-600x600_s5.jpg\"]'),
(8, 'MacBook Air 13 inch M1 8GB/256GB', 16000000, 'Laptop', 'Macbook', 'Còn hàng', 'http://localhost:3000/uploads/mac_m1.jpg', 9, '🧠 Chip: Apple M1\r\n💾 RAM: 8GB, SSD: 256GB\r\n🖥️ Màn hình: Retina 13.3 inch\r\n🔋 Pin: Lên đến 18 giờ\r\n💡 Hệ điều hành: macOS Big Sur', '[\"http://localhost:3000/uploads/mac_m1.jpg\",\"http://localhost:3000/uploads/mac_m1_s1.jpg\",\"http://localhost:3000/uploads/mac_m1_s2.jpg\",\"http://localhost:3000/uploads/mac_m1_s3.jpg\",\"http://localhost:3000/uploads/mac_m1_s4.jpg\",\"http://localhost:3000/uploads/mac_m1_s5.jpg\"]'),
(9, 'Iphone 16 ', 15000000, 'Điện thoại', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip16.jpg', 7, '📱 iPhone 16 với thiết kế hiện đại\r\n📸 Camera kép 48MP, quay phim 4K\r\n⚙️ Chip: Apple A17 Bionic\r\n🖥️ Màn hình OLED 6.1\"\r\n🔋 Pin lâu, hỗ trợ sạc nhanh', '[\"http://localhost:3000/uploads/ip16.jpg\",\"http://localhost:3000/uploads/ip16_s1.jpg\",\"http://localhost:3000/uploads/ip16_s2.jpg\",\"http://localhost:3000/uploads/ip16_s3.jpg\",\"http://localhost:3000/uploads/ip16_s4.jpg\",\"http://localhost:3000/uploads/ip16_s5.jpg\"]'),
(10, 'Iphone 13', 12000000, 'Điện thoại', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/iphone13.jpg', 12, '📱 Màn hình: 6.1\" Super Retina XDR\r\n⚙️ Chip: Apple A15 Bionic\r\n📸 Camera kép 12MP, Cinematic Mode\r\n🔋 Pin: 3240mAh\r\n💡 iOS 15, hỗ trợ nâng cấp', '[\"http://localhost:3000/uploads/iphone13.jpg\",\"http://localhost:3000/uploads/iphone13_s1.jpg\",\"http://localhost:3000/uploads/iphone13_s2.jpg\",\"http://localhost:3000/uploads/iphone13_s3.jpg\",\"http://localhost:3000/uploads/iphone13_s4.jpg\"]'),
(11, 'Laptop Asus Vivobook Go 15 E1504FA R5 7520U/16GB/512GB/Win11 (NJ776W)', 17000000, 'Laptop', 'Asus', 'Hết hàng', 'http://localhost:3000/uploads/vivobook.jpg', 0, '🖥️ Màn hình: 15.6 inch FHD\r\n⚙️ CPU: AMD Ryzen 5 7520U\r\n💾 RAM: 16GB, SSD: 512GB\r\n🔋 Pin: 42Wh, sạc nhanh 45W\r\n📦 Hệ điều hành: Windows 11', '[\"http://localhost:3000/uploads/vivobook.jpg\",\"http://localhost:3000/uploads/vivobook_s1.jpg\",\"http://localhost:3000/uploads/vivobook_s2.jpg\",\"http://localhost:3000/uploads/vivobook_s3.jpg\",\"http://localhost:3000/uploads/vivobook_s4.jpg\"]'),
(13, 'Iphone 15 Plus', 20999000, 'Điện thoại', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip15plus.jpg', 50, '📱 Màn hình: 6.7\" Super Retina XDR\r\n⚙️ Chip: Apple A16 Bionic\r\n📸 Camera: 48MP + 12MP\r\n🔋 Pin: 4383mAh, sạc nhanh 20W\r\n💡 iOS 17, hỗ trợ 5G', '[\"http://localhost:3000/uploads/ip15plus.jpg\",\"http://localhost:3000/uploads/ip15plus_s1.jpg\",\"http://localhost:3000/uploads/ip15plus_s2.jpg\"]'),
(12, 'Iphone 14 Plus', 19999000, 'Điện thoại', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip14plus.jpg', 50, '📱 Màn hình: 6.7\" Super Retina XDR\r\n⚙️ Chip: Apple A16 Bionic\r\n📸 Camera: 48MP + 12MP\r\n🔋 Pin: 4323mAh, sạc nhanh\r\n💡 iOS 16, hỗ trợ 5G', '[\"http://localhost:3000/uploads/ip14plus.jpg\",\"http://localhost:3000/uploads/ip14plus_s1.jpg\",\"http://localhost:3000/uploads/ip14plus_s2.jpg\"]'),
(14, 'Apple Watch Series 10 42mm viền nhôm dây thể thao', 7999000, 'Đồng hồ', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/awatchs10.jpg', 10, '🔧 Thiết kế & màn hình\nMỏng hơn gần 10% so với Series 9, với độ dày chỉ 9.7 mm và trọng lượng giảm 2–20 g tùy phiên bản \nHai kích cỡ: 42 mm (màn hình 374 × 446) và 46 mm (416 × 496)\nMàn hình OLED “góc rộng” lớn nhất từ trước đến nay trên Apple Watch, sáng hơn 40% khi nhìn ở góc và thêm ~9–30% diện tích hiển thị so với các đời trước \n💡 Phần cứng & hiệu năng\nChip S10 SiP + Neural Engine 4‑lõi, nâng cao hiệu suất, tiết kiệm điện năng \nBộ nhớ trong 64 GB \nHỗ trợ cử chỉ chạm hai lần (“double‑tap”), thu phóng, nhập văn bản giọng nói \n💓 Sức khỏe & thể thao\nCác cảm biến: nhịp tim, ECG, SpO₂, đo độ sâu và nhiệt độ nước (lên đến 50 m chịu nước) \nTính năng cảnh báo ngưng thở khi ngủ (sleep apnea detection) được FDA chấp thuận \nỨng dụng mới trong watchOS 11: Translate, Tides, theo dõi giấc ngủ nâng cao, thông tin tải tập luyện \n🔋 Thời lượng pin & sạc\nPin dùng cả ngày ~18 giờ (thực tế khoảng 48 giờ nếu dùng liên tục) \n🎨 Chất liệu & màu sắc\nVỏ nhôm (Jet Black, Rose Gold, Silver) hoặc titan (Slate, Gold, Natural)\nDùng vật liệu tái chế, thay thế thép không gỉ để giảm nhẹ và thân thiện \n🌐 Kết nối & tính năng thông minh\nKết nối Bluetooth 5.3, Wi‑Fi 4, NFC, UWB, eSIM tùy chọn 4G \nTích hợp Siri offline, cải tiến chất lượng cuộc gọi nhờ neural engine giảm nhiễu nền .\nCác tính năng an toàn: phát hiện ngã, phát hiện va chạm, Smart Stack nâng cấp', '[\"http://localhost:3000/uploads/awatchs10_s1.jpg\",\"http://localhost:3000/uploads/awatchs10_s2.jpg\",\"http://localhost:3000/uploads/awatchs10_s3.jpg\",\"http://localhost:3000/uploads/awatchs10_s4.jpg\",\"http://localhost:3000/uploads/awatchs10_s5.jpg\"]'),
(15, 'Đồng hồ thông minh Apple Watch SE 2 GPS 40mm viền nhôm dây thể thao', 4999000, 'Đồng hồ', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/awse2.jpg', 20, 'Midnight (đen nhạt): vỏ nhôm sắc tối + dây sport/loop đen, cá tính, dễ phối cùng trang phục \nStarlight (vàng nhạt/beige): tông sáng, mềm mại, phù hợp khi đeo buổi sáng .\nSilver (bạc): cổ điển, sang trọng, ít bị lỗi thời .', '[\"http://localhost:3000/uploads/awse2.jpg\",\"http://localhost:3000/uploads/awse2_s1.jpg\"]'),
(16, 'Iphone 15 Pro Max 258GB', 27990000, 'Điện thoại ', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip15promax.jpg', 20, '', '[\"http://localhost:3000/uploads/ip15promax_s1.jpg\",\"http://localhost:3000/uploads/ip15promax_s2.jpg\",\"http://localhost:3000/uploads/ip15promax_s3.jpg\",\"http://localhost:3000/uploads/ip15promax_s4.jpg\",\"http://localhost:3000/uploads/ip15promax_s5.jpg\"]'),
(17, 'Iphone 14 128GB', 11990000, 'Điện thoại ', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip14.jpg', 20, '🔹 Thiết kế\nChất liệu: Khung nhôm hàng không vũ trụ, mặt lưng kính.\nKích thước & Trọng lượng:\nDày 7.8mm, nặng khoảng 172g.\nMàu sắc: Xanh dương, Tím, Midnight (Đen), Starlight (Trắng), Đỏ, Vàng (bổ sung sau).\n🔹 Màn hình\nLoại: Super Retina XDR OLED\nKích thước: 6.1 inch\nĐộ phân giải: 2532 x 1170 pixels\nCông nghệ: HDR10, Dolby Vision, True Tone, Haptic Touch\nTần số quét: 60Hz (không có ProMotion như bản Pro)\n🔹 Hiệu năng\nChip xử lý: A15 Bionic (5 lõi GPU – tương tự iPhone 13 Pro)\nRAM: 6GB\nBộ nhớ trong: 128GB / 256GB / 512GB (không hỗ trợ thẻ nhớ)\n🔹 Camera\nCamera sau (kép):\n12MP chính (f/1.5) – khẩu độ lớn hơn, chụp thiếu sáng tốt hơn\n12MP góc siêu rộng (f/2.4)\nHỗ trợ Photonic Engine, Smart HDR 4, Deep Fusion\nQuay phim 4K, Cinematic Mode, Action Mode (chống rung mạnh)\nCamera trước:\n12MP (f/1.9), hỗ trợ tự động lấy nét\n🔹 Pin và Sạc\nDung lượng pin: Khoảng 3,279mAh\nThời lượng sử dụng: Lên đến 20 giờ xem video\nSạc: Sạc nhanh 20W (50% trong ~30 phút), sạc không dây MagSafe\n🔹 Tính năng khác\nFace ID (nhận diện khuôn mặt 3D)\n5G, Wi-Fi 6, Bluetooth 5.3\neSIM (ở Mỹ: loại bỏ khe SIM vật lý)\niOS 16 (cập nhật lên iOS mới nhất)\nChống nước IP68\n\n', '[\"http://localhost:3000/uploads/ip14_s1.jpg\",\"http://localhost:3000/uploads/ip14_s2.jpg\",\"http://localhost:3000/uploads/ip14_s3.jpg\"]'),
(18, 'Xiaomi Watch S4', 3999000, 'Đồng hồ', 'Xiaomi', 'Còn hàng', 'http://localhost:3000/uploads/xiaomi_watch.jpg', 4, 'Màn hình AMOLED tròn 1,43″, độ phân giải 466×466 (326 ppi), độ sáng tối đa đạt 1500–2200 nits – cực nét ngay dưới ánh nắng ngoài trời. Cảm biến theo dõi nhịp tim 24/7, SpO₂, giấc ngủ, mức độ stress – độ chính xác khoảng 98 %.', '[\"http://localhost:3000/uploads/xiaomi_watch.jpg\",\"http://localhost:3000/uploads/xiaomi_watch_1.jpg\",\"http://localhost:3000/uploads/xiaomi_watch_2.jpg\",\"http://localhost:3000/uploads/xiaomi_watch_3.jpg\",\"http://localhost:3000/uploads/xiaomi_watch_4.jpg\",\"http://localhost:3000/uploads/xiaomi_watch_5.jpg\"]'),
(19, 'Đồng hồ Samsung Galaxy Watch FE 40mm', 2199000, 'Đồng hồ', 'Samsung', 'Còn hàng', 'http://localhost:3000/uploads/samsung_galaxy.jpg', 11, 'Mặt đồng hồ tròn kích thước 40 mm, dày chỉ 9.8 mm và nặng nhẹ khoảng 26.6 g – mang cảm giác đeo thoải mái cả ngày dài. Vi xử lý Exynos W920, RAM 1.5 GB, bộ nhớ trong 16 GB – đủ mạnh cho các tác vụ cơ bản và đa nhiệm mượt mà.', '[\"http://localhost:3000/uploads/samsung_galaxy.jpg\",\"http://localhost:3000/uploads/samsung_galaxy_1.jpg\",\"http://localhost:3000/uploads/samsung_galaxy_2.jpg\",\"http://localhost:3000/uploads/samsung_galaxy_3.jpg\",\"http://localhost:3000/uploads/samsung_galaxy_4.jpg\",\"http://localhost:3000/uploads/samsung_galaxy_5.jpg\"]'),
(20, 'Samsung Galaxy Watch5 Pro', 3990000, 'Đồng hồ', 'Samsung', 'Hết hàng', 'http://localhost:3000/uploads/samsung_watch5.jpg', 0, 'Vỏ Titanium + mặt kính Sapphire 1.4″ Super AMOLED (450 × 450) – thiết kế siêu bền, chống xước tốt, cảm giác cao cấp. Viền đồng hồ liền mạch, không vòng xoay vật lý, hiển thị hiện đại. Cảm biến BioActive 3‑trong‑1: đo SPO₂, ECG, phân tích thành phần cơ thể. Pin khủng 590 mAh, sạc nhanh 45% trong 30 phút.', '[\"http://localhost:3000/uploads/samsung_watch5.jpg\",\"http://localhost:3000/uploads/samsung_watch5_1.jpg\",\"http://localhost:3000/uploads/samsung_watch5_2.jpg\",\"http://localhost:3000/uploads/samsung_watch5_3.jpg\",\"http://localhost:3000/uploads/samsung_watch5_4.jpg\",\"http://localhost:3000/uploads/samsung_watch5_5.jpg\"]'),
(21, 'Đồng hồ thông minh Huawei Watch Fit 3', 2399000, 'Đồng hồ', 'Huawei', 'Còn hàng', 'http://localhost:3000/uploads/huawei_watch.jpg', 12, 'Thiết kế vuông giống Apple Watch, kích thước 43.2 × 36.3 × 9.9 mm, trọng lượng chỉ khoảng 26 g (không dây), đeo thoải mái suốt ngày dài. Màn hình 1.82″ AMOLED độ phân giải 480×408 (347 ppi), độ sáng tối đa 1.500 nits.', '[\"http://localhost:3000/uploads/huawei_watch.jpg\",\"http://localhost:3000/uploads/huawei_watch_1.jpg\",\"http://localhost:3000/uploads/huawei_watch_2.jpg\",\"http://localhost:3000/uploads/huawei_watch_3.jpg\",\"http://localhost:3000/uploads/huawei_watch_4.jpg\",\"http://localhost:3000/uploads/huawei_watch_5.jpg\"]'),
(22, 'Đồng hồ thông minh Huawei Watch GT 5 Dây Da', 4690000, 'Đồng hồ', 'Huawei', 'Còn hàng', 'http://localhost:3000/uploads/huawei_watch_gt.jpg', 8, 'Thiết kế tròn cổ điển, vỏ thép không gỉ với dây da cao cấp. Màn hình AMOLED 1.43″, độ phân giải 466×466 px (326 ppi). Mỏng nhẹ (~35 g), pin 14 ngày, hỗ trợ GPS, sạc nhanh dock nam châm.', '[\"http://localhost:3000/uploads/huawei_watch_gt.jpg\",\"http://localhost:3000/uploads/huawei_watch_gt_1.jpg\",\"http://localhost:3000/uploads/huawei_watch_gt_2.jpg\",\"http://localhost:3000/uploads/huawei_watch_gt_3.jpg\",\"http://localhost:3000/uploads/huawei_watch_gt_4.jpg\",\"http://localhost:3000/uploads/huawei_watch_gt_5.jpg\"]'),
(23, 'Đồng hồ thông minh trẻ em Mykid 4G Lite V2', 1399000, 'Đồng hồ', 'Viettel', 'Còn hàng', 'http://localhost:3000/uploads/viettel_watch.jpg', 2, 'Kích thước 42 mm, dày 9.7 mm – mỏng nhẹ. Vỏ nhôm tái chế, màu Jet Black, Silver, Rose Gold. GPS + 4G eSIM – gọi, định vị không cần điện thoại. Pin 18–36 giờ.', '[\"http://localhost:3000/uploads/viettel_watch.jpg\",\"http://localhost:3000/uploads/viettel_watch_1.jpg\",\"http://localhost:3000/uploads/viettel_watch_2.jpg\",\"http://localhost:3000/uploads/viettel_watch_3.jpg\",\"http://localhost:3000/uploads/viettel_watch_4.jpg\",\"http://localhost:3000/uploads/viettel_watch_5.jpg\"]'),
(24, 'Đồng hồ thông minh OPPO Watch X', 5990000, 'Đồng hồ', 'Oppo', 'Còn hàng', 'http://localhost:3000/uploads/oppo_watch.jpg', 10, 'Kích thước 42 mm, dày 9.7 mm – mỏng nhẹ. Vỏ nhôm tái chế, màu Jet Black, Silver, Rose Gold. GPS + 4G eSIM – gọi, định vị không cần điện thoại. Pin 18–36 giờ.', '[\"http://localhost:3000/uploads/apple_watch.jpg\",\"http://localhost:3000/uploads/oppo_watch_1.jpg\",\"http://localhost:3000/uploads/oppo_watch_2.jpg\",\"http://localhost:3000/uploads/apple_watch_3.jpg\",\"http://localhost:3000/uploads/oppo_watch_4.jpg\",\"http://localhost:3000/uploads/oppo_watch_5.jpg\"]'),
(25, 'Đồng hồ thông minh Mibro Watch C4', 620000, 'Đồng hồ', 'Mibro', 'Còn hàng', 'http://localhost:3000/uploads/mibro_watch.jpg', 21, 'Màn hình lớn 2.01″ TFT độ phân giải 240×296 px, viền siêu mỏng. Kích thước 51×41×9.8 mm, nhẹ 29 g. Pin 350 mAh dùng 10–45 ngày. Sạc 2 giờ.', '[\"http://localhost:3000/uploads/mibro_watch.jpg\",\"http://localhost:3000/uploads/mibro_watch_1.jpg\",\"http://localhost:3000/uploads/mibro_watch_2.jpg\",\"http://localhost:3000/uploads/mibro_watch_3.jpg\",\"http://localhost:3000/uploads/mibro_watch_4.jpg\",\"http://localhost:3000/uploads/mibro_watch_5.jpg\"]'),
(26, 'Iphone 13 Pro Max 258GB', 22990000, 'Điện thoại ', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip13PM.jpg', 15, 'Màn hình: 6.7 inch Super Retina XDR OLED\n➤ Hỗ trợ ProMotion với tần số quét 120Hz, cho cảm giác mượt mà khi vuốt chạm.\nThiết kế:\n➤ Khung viền thép không gỉ, mặt lưng kính nhám sang trọng\n➤ Màu sắc nổi bật: Xanh Sierra, Vàng, Bạc, Xám Graphite\nCamera:\n➤ Bộ 3 camera sau 12MP (chính, góc rộng, tele) + cảm biến LiDAR\n➤ Hỗ trợ chụp đêm, chụp macro, quay video Cinematic mode\n\nHiệu năng:\n➤ Chip A15 Bionic mạnh mẽ, xử lý tốt cả game và AI\n➤ RAM 6GB, bộ nhớ trong từ 128GB đến 1TB\nPin:\n➤ Dung lượng pin lớn hơn đời trước (~4352 mAh)\n➤ Sử dụng thoải mái cả ngày, hỗ trợ sạc nhanh và sạc MagSafe\nHệ điều hành: iOS (cập nhật lâu dài)', '[\"http://localhost:3000/uploads/ip13PM_s2.jpg\",\"http://localhost:3000/uploads/ip13PM_s1.jpg\",\"http://localhost:3000/uploads/ip13PM_s3.jpg\"]'),
(27, 'Iphone 13 Pro 128GB', 15990000, 'Điện thoại ', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip13proc.jpg', 18, 'Màn hình:\n➤ 6.1 inch Super Retina XDR OLED\n➤ Tần số quét 120Hz (ProMotion) – vuốt cực mượt, hiển thị sắc nét\nHiệu năng:\n➤ Chip A15 Bionic mạnh mẽ\n➤ RAM 6GB – xử lý đa nhiệm tốt\n➤ Bộ nhớ trong 128GB – đủ dùng cho nhu cầu phổ thông: lưu ảnh, app, video\nCamera:\n➤ 3 camera sau 12MP (góc rộng, siêu rộng, tele)\n➤ Chụp ảnh đêm, chụp chân dung xóa phông, quay video 4K, chế độ điện ảnh (Cinematic)\n\nThiết kế:\n➤ Khung viền thép không gỉ, mặt kính nhám chống bám vân tay\n➤ Nhiều màu sang trọng: Xanh Sierra, Vàng, Bạc, Xám Graphite\nPin:\n➤ Thời lượng pin tốt, dùng thoải mái cả ngày\n➤ Sạc nhanh, hỗ trợ MagSafe', '[\"http://localhost:3000/uploads/ip13pro.jpg\",\"http://localhost:3000/uploads/ip13pro1.jpg\",\"http://localhost:3000/uploads/ip13pro2.jpg\",\"http://localhost:3000/uploads/ip13pro3.jpg\",\"http://localhost:3000/uploads/ip13pro4.jpg\"]'),
(28, 'Iphone 16 Pro 128GB', 16990000, 'Điện thoại ', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip16pro.png', 20, 'Màn hình: 6.3 inch Super Retina XDR OLED, 120Hz ProMotion\nThiết kế: Khung titan siêu bền, viền mỏng hơn\nCamera: Cụm camera 3 ống kính nâng cấp, hỗ trợ quay video không gian (spatial video)\nHiệu năng: Chip Apple A18 Pro – mạnh mẽ vượt trội\nTính năng mới: Nút “Action Button” có thể tùy biến, thêm “Capture Button” chuyên dụng chụp ảnh/video\nPin: Cải thiện nhẹ về thời lượng so với iPhone 15 Pro\nDung lượng: Từ 128GB đến 1TB', '[\"http://localhost:3000/uploads/ip16pro1.png\",\"http://localhost:3000/uploads/ip16pro2.png\",\"http://localhost:3000/uploads/ip16pro3.png\",\"http://localhost:3000/uploads/ip16pro4.png\",\"http://localhost:3000/uploads/ip16pro5.png\"]'),
(29, 'Iphone 16 Plus 128GB', 20990000, 'Điện thoại ', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip16plus.jpg', 20, 'Màn hình: 6.7 inch Super Retina XDR OLED, 60Hz\nThiết kế: Giống iPhone 15 Plus, có thể thêm màu mới\nCamera: Camera kép 48MP + 12MP, chụp đêm tốt hơn\nHiệu năng: Chip Apple A17 hoặc A18 (bản tiêu chuẩn)\nPin: Dung lượng lớn – nổi bật về thời gian sử dụng\nMức giá: Dễ tiếp cận hơn so với dòng Pro', '[\"http://localhost:3000/uploads/ip16plus1.jpg\",\"http://localhost:3000/uploads/ip16plus2.jpg\",\"http://localhost:3000/uploads/ip16plus3.jpg\",\"http://localhost:3000/uploads/ip16plus4.jpg\",\"http://localhost:3000/uploads/ip16plus5.jpg\"]'),
(30, 'Iphone 16 Pro Max 258GB', 29990000, 'Điện thoại ', 'Apple', 'Còn hàng', 'http://localhost:3000/uploads/ip16pm.jpg', 25, 'Màn hình: 6.9 inch – lớn nhất trong lịch sử iPhone\nThiết kế: Khung titan, viền siêu mỏng, trọng lượng nhẹ hơn\nCamera: Cụm camera chuyên nghiệp, zoom quang học lên đến 5x hoặc hơn\nHiệu năng: Apple A18 Pro – cực mạnh cho xử lý đồ họa, AI\nTính năng nổi bật: Quay video không gian (dùng cho Apple Vision Pro), Capture Button chuyên dụng\nPin: Pin lớn, hỗ trợ sạc nhanh, thời lượng pin tốt nhất dòng 16', '[\"http://localhost:3000/uploads/ip16pm1.jpg\",\"http://localhost:3000/uploads/ip16pm2.jpg\",\"http://localhost:3000/uploads/ip16pm3.jpg\",\"http://localhost:3000/uploads/ip16pm4.jpg\",\"http://localhost:3000/uploads/ip16pm5.jpg\"]'),
(31, 'Samsung Galaxy S25 5G 12GB/256GB', 18990000, 'Điện thoại ', 'Samsung', 'Còn hàng', 'http://localhost:3000/uploads/ss25.jpg', 19, 'Thiết kế & Màn hình\nThiết kế: Mỏng hơn, viền cực mỏng, khung viền bo cong nhẹ, mặt lưng kính hoặc kính mờ cao cấp\nMàn hình: 6.1 inch Dynamic AMOLED 2X\n➤ Độ phân giải Full HD+\n➤ Tần số quét 120Hz, HDR10+, độ sáng cao\n➤ Cảm biến vân tay dưới màn hình\n\n🔹 Hiệu năng\nChip xử lý (theo khu vực):\nSnapdragon 8 Gen 4 (4nm) – bản toàn cầu (dự kiến Samsung bỏ Exynos)\nRAM: 8GB\nBộ nhớ trong: 128GB / 256GB (không hỗ trợ thẻ nhớ)\nHệ điều hành: Android 15 (One UI 7), cập nhật dài hạn (lên đến 7 năm)\n🔹 Camera\nCamera chính: 50MP, khẩu độ lớn hơn, hỗ trợ lấy nét nhanh Dual Pixel\n\nCamera góc rộng: 12MP\n\nCamera selfie: 12MP\nQuay video: 4K 60fps, hỗ trợ AI xử lý hình ảnh\n🔹 Pin & Sạc\nDung lượng pin: Khoảng 4.000–4.200 mAh\nSạc nhanh: 25W\nSạc không dây: Có\nSạc ngược không dây: Có\n🔹 Kết nối & Tính năng khác\n5G, Wi-Fi 7, Bluetooth 5.4\nChuẩn chống nước/bụi IP68\nÂm thanh stereo, Dolby Atmos\nHỗ trợ Samsung DeX, bảo mật Knox', '[\"http://localhost:3000/uploads/ss251.jpg\",\"http://localhost:3000/uploads/ss252.jpg\",\"http://localhost:3000/uploads/ss253.jpg\",\"http://localhost:3000/uploads/ss254.jpg\",\"http://localhost:3000/uploads/ss255.jpg\"]'),
(32, 'Samsung Galaxy S25 Ultra 5G 12GB/1TB', 34490000, 'Điện thoại ', 'Samsung', 'Còn hàng', 'http://localhost:3000/uploads/ss25u.jpg', 20, '🔹 1. Thiết kế cao cấp\nKhung Titan nhẹ và bền hơn (thay vì nhôm như trước)\nMặt kính Gorilla Glass Victus 3, bo cạnh vuông tương tự S24 Ultra\nKèm bút S Pen, tích hợp trong máy\nMàu sắc dự kiến: Đen Phantom, Titan Xanh, Titan Tím, Titan Kem...\n🔹 2. Màn hình đỉnh cao\nKích thước: 6.8 inch QHD+\nCông nghệ: Dynamic AMOLED 2X\nTần số quét: 1–120Hz (LTPO), mượt và tiết kiệm pin\nĐộ sáng: Tối đa ~2.600 nits (cải thiện khi dùng ngoài trời)\n🔹 3. Hiệu năng mạnh mẽ\nChip: Snapdragon 8 Gen 4 (dự kiến không dùng Exynos trên bản Ultra)\nRAM: 12GB LPDDR5X\nBộ nhớ trong: 1TB UFS 4.0 – siêu nhanh, phù hợp người làm video, chơi game nặng\nHệ điều hành: Android 15 + One UI 7\nHỗ trợ cập nhật Android & bảo mật lên đến 7 năm\n🔹 4. Camera chuyên nghiệp\nCamera chính: 200MP (ISOCELL HP2) – xử lý AI tốt hơn\nCamera góc rộng: 12MP\nZoom 5x (50MP) và Zoom 3x (10MP) – thay thế zoom 10x cũ\nCamera selfie: 12MP\nHỗ trợ quay video 8K, chế độ Pro, Astrophoto, quay đêm AI, quay video không gian (spatial video)\n🔹 5. Pin & sạc\nDung lượng: 5.000 mAh\nSạc nhanh: 45W (có dây), 15W (không dây)\nSạc ngược không dây: Hỗ trợ\nTối ưu pin bằng AI – dùng cả ngày với tác vụ nặng\n🔹 6. Tính năng cao cấp khác\n5G, Wi-Fi 7, Bluetooth 5.4\nIP68 chống nước, bụi\nÂm thanh stereo với Dolby Atmos\nSamsung DeX, Knox bảo mật, hỗ trợ bút S Pen\nNút chụp ảnh vật lý (Capture Button) có thể được thêm mới (tin đồn)', '[\"http://localhost:3000/uploads/ss25u1.jpg\",\"http://localhost:3000/uploads/ss25u2.jpg\",\"http://localhost:3000/uploads/ss25u3.jpg\",\"http://localhost:3000/uploads/ss25u4.jpg\",\"http://localhost:3000/uploads/ss25u5.jpg\"]'),
(33, 'Điện thoại Samsung Galaxy S25 Plus 5G 12GB/256GB', 22450000, 'Điện thoại ', 'Samsung', 'Còn hàng', 'http://localhost:3000/uploads/ss25p.jpg', 11, '🔹 Thiết kế sang trọng, viền siêu mỏng\nKiểu dáng hiện đại, bo nhẹ 2 cạnh, mỏng hơn thế hệ trước\nMặt kính cường lực Gorilla Glass Victus 3, khung nhôm Armor Aluminum\nMàu sắc dự kiến: Đen Phantom, Xanh Navy, Tím Titan, Trắng\n🔹 Màn hình lớn, sắc nét\nKích thước: 6.7 inch Dynamic AMOLED 2X\nTần số quét: 120Hz mượt mà\nĐộ phân giải: Full HD+ (~2340 x 1080)\n\nĐộ sáng tối đa: ~2.600 nits – rõ nét ngoài trời\nVân tay siêu âm trong màn hình, hỗ trợ Always-On Display\n🔹 Hiệu năng mạnh mẽ\nVi xử lý: Snapdragon 8 Gen 4 (tiến trình 3nm, tiết kiệm pin hơn)\nRAM: 12GB LPDDR5X – chạy đa nhiệm mượt mà\nROM: 256GB UFS 4.0 – tốc độ đọc/ghi siêu nhanh\nHệ điều hành: Android 15, giao diện One UI 7\nHỗ trợ cập nhật Android và bảo mật lên đến 7 năm\n\n🔹 Camera nâng cấp AI\nCamera chính: 50MP cảm biến lớn, hỗ trợ AI ISP\nCamera góc rộng: 12MP\nCamera tele: 10MP – zoom quang 3x\nCamera selfie: 12MP hỗ trợ chụp HDR và quay 4K\nTính năng chụp đêm, quay video 4K 60fps, chống rung OIS\n🔹 Pin & sạc\nDung lượng: ~4.800 mAh\nSạc nhanh: 45W (có dây) – sạc 65% trong khoảng 30 phút\nSạc không dây: 15W\nSạc ngược không dây: Có hỗ trợ (Wireless PowerShare)\n🔹 Kết nối & Tính năng\n5G, Wi-Fi 7, Bluetooth 5.4\nChuẩn kháng nước/bụi IP68\nÂm thanh stereo Dolby Atmos\nSamsung DeX, bảo mật vân tay siêu âm dưới màn hình\nKhông có khe cắm thẻ nhớ, không jack tai nghe 3.5mm', '[\"http://localhost:3000/uploads/ss25p1.jpg\",\"http://localhost:3000/uploads/ss25p2.jpg\",\"http://localhost:3000/uploads/ss25p3.jpg\",\"http://localhost:3000/uploads/ss25p4.jpg\",\"http://localhost:3000/uploads/ss25p5.jpg\"]'),
(34, 'Dell XPS 13 9340 Ultra 7 155H/16GB/1TB/OfficeHS/Win11 (HXRGT2)', 53990000, 'Laptop', 'Dell', 'Còn hàng', 'http://localhost:3000/uploads/dell-xps-13-9340-ultra-7-hxrgt2.jpg', 20, '🔹 Thiết kế cao cấp, siêu mỏng nhẹ\nVỏ nhôm nguyên khối CNC – chắc chắn, sang trọng\nCân nặng chỉ ~1.17 kg – cực kỳ nhẹ, dễ di chuyển\nMỏng chỉ ~14.8 mm – tinh tế, gọn gàng\nViền màn hình siêu mỏng, cảm giác “không viền” cao cấp\nLogo XPS khắc laser, hoàn thiện tỉ mỉ\n\n🔹 Màn hình tuyệt đẹp\n13.4 inch InfinityEdge\nTỉ lệ 16:10, viền siêu mỏng bốn cạnh\nĐộ phân giải: Full HD+ (1920 x 1200) – sắc nét, màu đẹp\nCông nghệ Eyesafe + chống chói, bảo vệ mắt\nHỗ trợ 100% sRGB – phù hợp làm đồ họa cơ bản\n\n🔹 Hiệu năng mạnh mẽ với Intel Core Ultra\nCPU: Intel® Core™ Ultra 7 155H (ra mắt 2024, tiến trình Intel 4)\nAI tích hợp (NPU) – xử lý tác vụ trí tuệ nhân tạo, tiết kiệm pin hơn\nRAM: 16GB LPDDR5x (onboard, bus cao, tiết kiệm điện)\nSSD: 1TB M.2 PCIe Gen 4 – tốc độ cực cao, khởi động và mở app tức thì\n\n🔹 Hệ điều hành & phần mềm\nCài sẵn Windows 11 Home bản quyền\nTặng kèm Microsoft Office Home & Student 2021 vĩnh viễn (Word, Excel, PowerPoint)\n\n🔹 Kết nối & cổng giao tiếp\n2 x Cổng Thunderbolt 4 (USB-C) – hỗ trợ sạc, truyền dữ liệu, xuất màn hình\nKhông có cổng USB-A – cần dùng hub nếu cần\nWi-Fi 6E, Bluetooth 5.3 – kết nối nhanh, ổn định\nWebcam FHD IR hỗ trợ Windows Hello (mở khóa bằng khuôn mặt)\n\n🔹 Pin & thời lượng sử dụng\nPin 3-cell ~55Wh\nThời lượng sử dụng thực tế: 8–12 giờ làm việc văn phòng\nHỗ trợ ExpressCharge – sạc nhanh 80% trong 1 giờ', '[\"http://localhost:3000/uploads/dell-xps-13-9340-ultra-7-hxrgt2-2.jpg\",\"http://localhost:3000/uploads/dell-xps-13-9340-ultra-7-hxrgt2-1.jpg\",\"http://localhost:3000/uploads/dell-xps-13-9340-ultra-7-hxrgt2-3.jpg\",\"http://localhost:3000/uploads/dell-xps-13-9340-ultra-7-hxrgt2-4.jpg\",\"http://localhost:3000/uploads/dell-xps-13-9340-ultra-7-hxrgt2-5.jpg\"]'),
(35, 'Laptop Dell G15 5530 i7 13650HX/16GB/1TB/8GB RTX4060/165Hz/OfficeHS/Win11 (i7HX161W11GR4060)', 35990000, 'Laptop', 'Dell', 'Còn hàng', 'http://localhost:3000/uploads/dell-g15-5530-i7-i7hx161w11gr4060.jpg', 12, '🔹 1. Thiết kế gaming mạnh mẽ\nNgoại hình hầm hố, góc cạnh kiểu \"gaming\" đậm chất Dell G-Series\nTản nhiệt lớn với nhiều khe hút/thoát gió – giữ máy mát khi chơi game nặng\nBàn phím full-size có LED RGB 4 vùng cực ngầu\nChất liệu nhựa cứng cáp, trọng lượng khoảng 2.8 kg – chắc chắn\n\n🔹 2. Màn hình cực mượt cho game & đồ họa\nKích thước: 15.6 inch\nTần số quét: 165Hz – lý tưởng cho game FPS, esport\nTấm nền: IPS, chống chói\nĐộ phân giải: Full HD (1920 x 1080)\nHỗ trợ G-Sync / Adaptive-Sync – giảm xé hình khi chơi game\n\n🔹 3. Hiệu năng vượt trội\nCPU: Intel Core i7-13650HX – 14 nhân (6P + 8E), turbo boost tới 4.9GHz\nRAM: 16GB DDR5 4800MHz – nâng cấp tối đa 32GB\nỔ cứng: 1TB SSD M.2 NVMe – khởi động, load game cực nhanh\nCard đồ họa: NVIDIA GeForce RTX 4060 8GB GDDR6\n➤ Hỗ trợ Ray Tracing, DLSS 3.0 – chơi game AAA & làm đồ họa mượt mà\n\n🔹 4. Hệ điều hành & phần mềm\nCài sẵn Windows 11 Home bản quyền\nTặng kèm Microsoft Office Home & Student 2021 vĩnh viễn\n➤ Gồm Word, Excel, PowerPoint\n\n🔹 5. Cổng kết nối đa dạng\n1 x HDMI 2.1\n1 x USB-C (DisplayPort)\n3 x USB-A 3.2 Gen 1\n1 x LAN RJ-45\n1 x Jack tai nghe 3.5mm\nWi-Fi 6, Bluetooth 5.2 – kết nối nhanh, ổn định\n\n🔹 6. Pin & Tản nhiệt\nPin 6 cell ~86Wh – dùng 4–6 tiếng làm việc văn phòng\nHệ thống Dual Fan Cooling với công nghệ Game Shift giúp tăng hiệu suất khi cần', '[\"http://localhost:3000/uploads/1750320939674-dell-g15-5530-i7-i7hx161w11gr4060-1.jpg\",\"http://localhost:3000/uploads/1750320939706-dell-g15-5530-i7-i7hx161w11gr4060-2.jpg\",\"http://localhost:3000/uploads/1750320939740-dell-g15-5530-i7-i7hx161w11gr4060-3.jpg\",\"http://localhost:3000/uploads/1750320939769-dell-g15-5530-i7-i7hx161w11gr4060-4.jpg\",\"http://localhost:3000/uploads/1750320939802-dell-g15-5530-i7-i7hx161w11gr4060-5.jpg\"]'),
(36, 'Laptop Asus Gaming ROG Strix SCAR 18 G835LW Ultra 9 275HX/64GB/4TB/16GB RTX5080/240Hz/Win11 (SA172W)', 110990000, 'Laptop', 'Asus', 'Còn hàng', 'http://localhost:3000/uploads/asus-rog-strix-scar-16-g635lx-ultra-9-rw179w.jpg', 10, '🔹 1. Thiết kế hầm hố – đậm chất game thủ\nVỏ máy hợp kim cao cấp, họa tiết RGB ấn tượng, nắp lưng logo phát sáng\nDải LED RGB 360° quanh thân máy + bàn phím Per-Key RGB\nHệ thống quạt tản nhiệt 3 quạt + keo tản nhiệt kim loại lỏng\nTrọng lượng ~3.1kg – xứng đáng với cấu hình cực mạnh\n\n🔹 2. Màn hình 18 inch siêu mượt – chuẩn eSport\nKích thước: 18.0 inch QHD+ (2560 x 1600)\nTấm nền: ROG Nebula Display – IPS chống chói\nTần số quét: 240Hz – cực mượt cho mọi thể loại game\nThời gian phản hồi: 3ms\n\nHỗ trợ G-Sync, Dolby Vision, độ phủ màu DCI-P3 100% – tuyệt vời cho cả chơi game & đồ họa\n\n🔹 3. Cấu hình cực khủng – vượt mọi giới hạn\nCPU: Intel Core Ultra 9 275HX – 16 nhân 22 luồng, tốc độ cực cao\nRAM: 64GB DDR5 5600MHz – đa nhiệm cực khủng, nâng cấp được đến 128GB\nỔ cứng: 4TB SSD PCIe Gen 4 (2 x 2TB) – tốc độ cực nhanh, lưu trữ thoải mái\nGPU: NVIDIA GeForce RTX 5080 16GB GDDR6 – top đầu hiện nay\n➤ Hỗ trợ Ray Tracing, DLSS 3.5, AI Upscaling – chơi game, render, dựng phim cực mạnh\n\n🔹 4. Hệ điều hành & phần mềm\nCài sẵn Windows 11 Home bản quyền\nTặng kèm ROG Armoury Crate, điều khiển hiệu suất & ánh sáng RGB\n\n🔹 5. Cổng kết nối siêu đầy đủ\n2 x USB-A 3.2 Gen 2\n2 x USB-C (1 x Thunderbolt 4, 1 x DP + Power Delivery)\n1 x HDMI 2.1\n1 x LAN RJ45\n\n1 x Jack tai nghe 3.5mm\nWi-Fi 7, Bluetooth 5.4 – kết nối siêu nhanh, ổn định\n\n🔹 6. Pin & Tản nhiệt\nPin ~90Wh – tối ưu tốt với CPU & GPU thế hệ mới\nTản nhiệt ROG Intelligent Cooling, keo kim loại lỏng cho CPU & GPU\nChế độ Turbo, Performance, Silent tùy chỉnh qua Armoury Crate', '[\"http://localhost:3000/uploads/1750321242800-asus-rog-strix-scar-16-g635lx-ultra-9-rw179w-1.jpg\",\"http://localhost:3000/uploads/1750321242804-asus-rog-strix-scar-16-g635lx-ultra-9-rw179w-2.jpg\",\"http://localhost:3000/uploads/1750321242806-asus-rog-strix-scar-16-g635lx-ultra-9-rw179w-3.jpg\",\"http://localhost:3000/uploads/1750321242807-asus-rog-strix-scar-16-g635lx-ultra-9-rw179w-4.jpg\",\"http://localhost:3000/uploads/1750321242809-asus-rog-strix-scar-16-g635lx-ultra-9-rw179w-5.jpg\"]'),
(37, 'Máy in laser trắng đen đa năng Brother DCP-L2520D', 4900000, 'Thiết bị in ấn và mạng', 'Brother', 'Còn hàng', 'http://localhost:3000/uploads/may-in-da-chuc-nang-brother-dcp-l2520d-1.jpg', 17, 'Máy in laser trắng đen đa chức năng (3 trong 1: In, Scan, Copy)\r\nTốc độ in 30 trang/phút (A4)\r\nĐộ phân giải in	2400 x 600 dpi (HQ1200)\r\nKết nối	USB 2.0 (không có kết nối mạng LAN/Wi-Fi)', '[\"http://localhost:3000/uploads/may-in-da-chuc-nang-brother-dcp-l2520d-2.jpg\",\"http://localhost:3000/uploads/may-in-da-chuc-nang-brother-dcp-l2520d-3.jpg\"]'),
(38, 'Máy in laser trắng đen đa năng HP LaserJet MFP M236sdw Wifi (9YG09A)', 6999000, 'Thiết bị in ấn và mạng', 'HP', 'Còn hàng', 'http://localhost:3000/uploads/laser-trang-den-hp-1.jpg', 17, 'Màn hình LCD \r\nIn hiệu quả với tốc độ 29 trang/phút, chức năng copy, in 2 mặt tự động, in wifi và scan.\r\nChất lượng in (độ nét): 600 x 600 dpi \r\nKết cấu gọn gàng, dễ dàng bày trí trong phòng', '[\"http://localhost:3000/uploads/laser-trang-den-hp-2.jpg\",\"http://localhost:3000/uploads/laser-trang-den-hp-3.jpg\"]'),
(39, 'Máy in phun màu đa năng HP Smart Tank 580 Wifi (1F3Y2A)', 3000000, 'Thiết bị in ấn và mạng', 'HP', 'Còn hàng', 'http://localhost:3000/uploads/hp-smart-tank-580-wifi-1.jpg', 17, 'Màn hình 1.2 inch \r\nChất lượng in (độ nét): 1200 x 1200 dpi (In trắng đen) - 4800 x 1200 dpi (In màu)\r\nTốc độ in: 22 trang/phút (Đen trắng) - 16 trang/phút (Màu)\r\nBộ nhớ (In được file tối đa):64 MB', '[\"http://localhost:3000/uploads/hp-smart-tank-580-wifi-2.jpg\",\"http://localhost:3000/uploads/hp-smart-tank-580-wifi-3.jpg\"]'),
(40, 'Máy In phun màu đơn năng Canon PIXMA G1010', 2500000, 'Thiết bị in ấn và mạng', 'Canon', 'Còn hàng', 'http://localhost:3000/uploads/may-in-phun-mau-canon-pixma-g1010-1.jpg', 17, 'Có cổng kết nối USB 2.0, máy tương thích hệ điều hành Windows 10, 8.1, 7 SP1. \r\nBản in nét đẹp với độ phân giải 1200 x 4800 dpi.\r\nTốc độ in: 8.8 ảnh/phút (Đen trắng) - 5 ảnh/phút (Màu)\r\nCông suất tối đa:5.000 trang/tháng', '[\"http://localhost:3000/uploads/may-in-phun-mau-canon-pixma-g1010-2.jpg\",\"http://localhost:3000/uploads/may-in-phun-mau-canon-pixma-g1010-3.jpguploads/samsung_s24_4.jpg\"]'),
(41, 'Máy in laser trắng đen đa năng Canon MF241d', 3200000, 'Thiết bị in ấn và mạng', 'Canon', 'Còn hàng', 'http://localhost:3000/uploads/may-in-laser-canon-da-chuc-nang-mf241d-1.jpg', 17, 'Chất lượng in rõ nét với độ phân giải 1200 x 1200 dpi.\r\nTốc độ in nhanh chóng: 27 trang/phút.\r\nTích hợp nhiều tính năng: Scan, copy, in 2 mặt tự động.\r\nCông suất tối đa :15.000 trang/tháng ', '[\"http://localhost:3000/uploads/may-in-laser-canon-da-chuc-nang-mf241d-2.jpg\",\"http://localhost:3000/uploads/may-in-laser-canon-da-chuc-nang-mf241d-3.jpg\"]'),
(42, 'Máy in laser màu HP 150a (4ZB94A)', 3000000, 'Thiết bị in ấn và mạng', 'HP', 'Còn hàng', 'http://localhost:3000/uploads/laser-hp-150a-4zb94a-3-750x500-1.jpg', 17, 'Độ phân giải: 600 x 600 dpi \r\nKết nối: USB 2.0 tốc độ cao\r\nHệ điều hành hỗ trợ: Windows 7, 8, 10 (không hỗ trợ macOS hoặc Linux)\r\nKích thước máy: 382 x 309 x 211 mm\r\nBộ xử lý: 400 MHz', '[\"http://localhost:3000/uploads/laser-hp-150a-4zb94a-3-750x500-2.jpg\",\"http://localhost:3000/uploads/laser-hp-150a-4zb94a-3-750x500-3.jpg\"]'),
(43, 'Router Wifi Chuẩn Wifi 6 Asus AX1800HP V2', 16500000, 'Thiết bị in ấn và mạng', 'Asus', 'Còn hàng', 'http://localhost:3000/uploads/router-wifi-chuan-wifi-6-asus-ax1800hp-v2-1.jpg', 17, 'Chuẩn Wifi: WiFi 6 (802.11ax)\r\nKích thước: Khoảng 205 x 147 x 36 mm\r\nTrọng lượng: Khoảng 374g\r\nTương thích: Windows, macOS, Linux, Android, iOS\r\nSố user truy cập tối đa: 50 user', '[\"http://localhost:3000/uploads/router-wifi-chuan-wifi-6-asus-ax1800hp-v2-2.jpg\",\"http://localhost:3000/uploads/router-wifi-chuan-wifi-6-asus-ax1800hp-v2-3.jpg\"]'),
(44, 'Router Wifi Chuẩn Wifi 6 Asus TUF Gaming AX4200', 5790000, 'Thiết bị in ấn và mạng', 'Asus', 'Còn hàng', 'http://localhost:3000/uploads/router-wifi-chuan-wifi-6-asus-tuf-gaming-1.jpg', 17, 'Chuẩn WiFi: WiFi 6 (802.11ax) – Dual Band\r\nKích thước: 265 x 177 x 186 mm\r\nTrọng lượng: khoảng 720g\r\nTăng hiệu suất và giảm độ trễ khi nhiều thiết bị kết nối cùng lúc\r\nBảo vệ chống tấn công, lọc web độc hại', '[\"http://localhost:3000/uploads/router-wifi-chuan-wifi-6-asus-tuf-gaming-2.jpg\",\"http://localhost:3000/uploads/router-wifi-chuan-wifi-6-asus-tuf-gaming-3.jpg\"]'),
(45, 'Router Wifi Chuẩn N Xiaomi 4C', 300000, 'Thiết bị in ấn và mạng', 'Xiaomi', 'Còn hàng', 'http://localhost:3000/uploads/router-wifi-chuan-n-xiaomi-4c-1.jpg', 17, 'Tốc độ wifi 300 Mbps trên băng tần 2.4 GHz.\r\nXử lý nhiều tác vụ cùng lúc nhanh hơn, vận hành ổn định nhờ bộ nhớ 64 MB.\r\nTrang bị 3 cổng Ethernet (2 x LAN, 1 x WAN) kết nối tốc độ cao.\r\nQuản lý từ xa bằng ứng dụng Mi Wi-Fi.\r\nTăng cường truyền tín hiệu, mở rộng phạm vi phủ sóng với 4 ăng ten 5 dBi.', '[\"http://localhost:3000/uploads/router-wifi-chuan-n-xiaomi-4c-2.jpg\"]'),
(46, 'Loa Bluetooth Xiaomi Sound Outdoor', 1200000, 'Âm thanh và Giải trí', 'Xiaomi', 'Còn hàng', 'http://localhost:3000/uploads/loa-bluetooth-xiaomi-sound-outdoor-1.jpg', 17, 'Loại loa: Loa Bluetooth di động ngoài trời\r\nCông suất đầu ra: 40W RMS (âm thanh mạnh mẽ, phù hợp ngoài trời)\r\nPhiên bản: Bluetooth 5.3\r\nThời gian phát nhạc: Lên đến 12 – 24 giờ (tùy âm lượng)\r\nChống nước/bụi: IP67 – chống bụi hoàn toàn, chống nước ở độ sâu ≤ 1m trong 30 phút', '[\"http://localhost:3000/uploads/loa-bluetooth-xiaomi-sound-outdoor-2\",\"http://localhost:3000/uploads/loa-bluetooth-xiaomi-sound-outdoor-3.jpg\"]'),
(47, 'Bộ loa thanh Samsung HW-Q600C/XV 360W', 5600000, 'Âm thanh và Giải trí', 'Samsung', 'Còn hàng', 'http://localhost:3000/uploads/loa-thanh-samsung-hw-c450-xv-1.jpg', 17, 'Chất lượng âm thanh mạnh mẽ với tổng công suất hoạt động 360W.\r\nÂm thanh vòm sống động đạt chuẩn 3.1.2 kênh.\r\nKết nối Bluetooth hoặc Wifi được với tivi và các thiết bị di động, giúp phát nhạc từ xa nhanh chóng.\r\nTrang bị đầy đủ cổng kết nối có dây như: HDMI, HDMI eARC, Optical,... hỗ trợ xuất hình ảnh và âm thanh đa dạng.\r\nĐiều khiển từ xa nhanh chóng qua One Remote Control.', '[\"http://localhost:3000/uploads/loa-thanh-samsung-hw-c450-xv-2.jpg\",\"http://localhost:3000/uploads/loa-thanh-samsung-hw-c450-xv-3.jpg\"]'),
(48, 'Loa Bluetooth Xiaomi Mini', 500000, 'Âm thanh và Giải trí', 'Xiaomi', 'Còn hàng', 'http://localhost:3000/uploads/loa-bluetooth-xiaomi-mini-1.jpg', 17, 'Loại loa: Loa Bluetooth mini di động\r\nCông suất đầu ra: 2W RMS\r\nTần số đáp ứng: 200Hz – 18kHz\r\nPhiên bản: Bluetooth 4.2\r\nDung lượng pin: 480 mAh\r\nChất liệu: Vỏ nhựa ABS + lưới kim loại', '[\"http://localhost:3000/uploads/loa-bluetooth-xiaomi-mini-2.jpg\",\"http://localhost:3000/uploads/loa-bluetooth-xiaomi-mini-3.jpg\"]'),
(49, 'Loa Bluetooth Harman Kardon Go + Play 3 GRYAS', 6900000, 'Âm thanh và Giải trí', 'Harman Kardon', 'Còn hàng', 'http://localhost:3000/uploads/loa-bluetooth-harman-kardon-go-play-3-1.jpg', 17, 'Loại loa: Loa Bluetooth cao cấp, di động (home/portable speaker) \r\nCông suất tổng: 100W RMS\r\nPhiên bản: Bluetooth 5.3\r\nThời lượng pin: Lên đến 8 giờ phát nhạc\r\nChống nước: IPX4 (chống tia nước nhẹ)\r\n Kích thước: 439 x 240 x 192 mm', '[\"http://localhost:3000/uploads/loa-bluetooth-harman-kardon-go-play-3-2.jpg\",\"http://localhost:3000/uploads/loa-bluetooth-harman-kardon-go-play-3-3.jpg\"]'),
(50, 'Loa Karaoke Dalton K220C', 7800000, 'Âm thanh và Giải trí', 'Dalton', 'Còn hàng', 'http://localhost:3000/uploads/loa-karaoke-xach-tay-dalton-k220c-1.jpg', 17, 'Cấu hình: 2 đường tiếng (bass + treble) \r\nTổng công suất: 600–750 W (tùy nguồn)\r\nPin tích hợp: Cho phép dùng 3–7 giờ (tùy âm lượng) \r\nTrọng lượng: khoảng 22.5 kg\r\nChất liệu: Thùng gỗ bọc da cao cấp, khung sắt kim loại + màng vải', '[\"http://localhost:3000/uploads/1750385873420-1750385857015-loa-karaoke-xach-tay-dalton-k220c-1.jpg\",\"http://localhost:3000/uploads/1750385887548-loa-karaoke-xach-tay-dalton-k220c-2.jpg\"]'),
(51, 'Loa kéo karaoke Nanomax S-5000 1350W', 11000000, 'Âm thanh và Giải trí', 'Nanomax ', 'Còn hàng', 'http://localhost:3000/uploads/loa-karaoke-nanomax-s-5000-1.jpg', 17, 'Cấu trúc âm thanh: 3 đường tiếng (Bass, Mid, Treble)\r\nTổng công suất: 1350 W\r\nThời gian sử dụng (pin): 4–7 giờ\r\nBộ khuếch đại: Công nghệ Class‑D (hiệu suất cao) \r\nBluetooth: 5.0, tầm kết nối khoảng 10–15 m', '[\"http://localhost:3000/uploads/loa-karaoke-nanomax-s-5000-2.jpg\",\"http://localhost:3000/uploads/loa-karaoke-nanomax-s-5000-3.jpg\"]'),
(52, 'Loa kéo karaoke Dalton TS-15A6500', 16500000, 'Âm thanh và Giải trí', 'Dalton ', 'Còn hàng', 'http://localhost:3000/uploads/loa-karaoke-xach-tay-dalton-k220c-1.jpg', 17, 'Công suất 1800W, 2 đường tiếng mang đến chất âm mạnh mẽ, vang dội.\r\nThời gian sử dụng 3 - 5 tiếng, sạc khoảng 5 - 6 tiếng.\r\nKết nối Bluetooth 5.2  cho khoảng cách kết nối tối đa 12m.\r\n2 micro không dây đi kèm, hát karaoke mọi lúc mọi nơi. \r\nThùng gỗ MDF, sơn nước chống trầy kết hợp mặt lưới kim loại sơn tĩnh điện.', '[\"http://localhost:3000/uploads/loa-karaoke-xach-tay-dalton-k220c-2.jpg\",\"http://localhost:3000/uploads/loa-karaoke-xach-tay-dalton-k220c-3.jpg\"]'),
(53, 'Loa Bluetooth Sony SRS-XB100', 1000000, 'Âm thanh và Giải trí', 'Sony ', 'Còn hàng', 'http://localhost:3000/uploads/loa-bluetooth-sony-srs-xb100-1.jpg', 17, 'Bluetooth: phiên bản 5.3, hỗ trợ A2DP, AVRCP, HFP, SBC, AAC \r\n P67: chống nước (ngâm ≤1 m/30 phút) + bụi cứng \r\nThời lượng sử dụng: ~16 giờ\r\nCông suất tiêu thụ hoạt động: khoảng 2.5 W\r\nSiêu di động ( chỉ ~274 g, đường kính <8 cm)', '[\"http://localhost:3000/uploads/loa-bluetooth-sony-srs-xb100-2.jpg\",\"http://localhost:3000/uploads/loa-bluetooth-sony-srs-xb100-3.jpg\"]'),
(54, 'Loa Bluetooth JBL Clip 5', 1490000, 'Âm thanh và Giải trí', 'JBL', 'Còn hàng', 'http://localhost:3000/uploads/loa-bluetooth-jbl-clip-5-1.jpg', 17, 'Kích thước: Khoảng 86 × 46 × 134 mm (3.4 × 1.8 × 5.3 inches)\r\nKích thước: Khoảng 86 × 46 × 134 mm (3.4 × 1.8 × 5.3 inches)\r\nCông suất đầu ra: 7 W RMS\r\nThời lượng phát nhạc: 12 giờ; thêm 3 giờ khi bật Playtime Boost ', '[\"http://localhost:3000/uploads/loa-bluetooth-jbl-clip-5-2.jpg\",\"http://localhost:3000/uploads/loa-bluetooth-jbl-clip-5-3.jpg\"]'),
(55, 'Loa Bluetooth Sony ULT10 Field 1', 2200000, 'Âm thanh và Giải trí', 'Sony ', 'Còn hàng', 'http://localhost:3000/uploads/loa-bluetooth-sony-ult-field-1.jpg', 17, 'Bluetooth: Phiên bản 5.3, hỗ trợ codec SCP, AAC; cho phép Stereo Pair (ghép đôi 2 loa) \r\n Thời gian phát nhạc lên đến 12 giờ \r\nSạc qua USB‑C, mất khoảng 5 giờ để sạc đầy\r\nChuẩn IP67 – chống nước, bụi, rỉ sét và va đập (shockproof)\r\nThiết kế nhỏ gọn, có stráp/móc xách đa hướng', '[\"http://localhost:3000/uploads/loa-bluetooth-sony-ult-field-2.jpg\",\"http://localhost:3000/uploads/loa-bluetooth-sony-ult-field-3.jpg\"]'),
(56, 'Loa Bluetooth JBL Partybox 120', 1000000, 'Âm thanh và Giải trí', 'JBL', 'Còn hàng', 'http://localhost:3000/uploads/loa-bluetooth-jbl-partybox-120-1.jpg', 17, 'Công suất đầu ra: 160 W RMS (theo chuẩn IEC 60268)\r\n Thời gian phát nhạc: lên đến 12 giờ (tuỳ mức âm lượng) \r\nThời gian sạc: ~3.5 giờ khi speaker tắt \r\nChất liệu: Vỏ nhựa cứng, tay cầm gập tiện lợi\r\nKháng nước: IPX4 (chống giọt bắn) ', '[\"http://localhost:3000/uploads/loa-bluetooth-jbl-partybox-120-2.jpg\"]'),
(57, 'Máy chơi game Sony PlayStation 5 Slim ASIA-00479', 15000000, 'Âm thanh và Giải trí', 'Sony', 'Còn hàng', 'http://localhost:3000/uploads/sony-playstation-5-slim-asia-00479-1.jpg', 17, 'CPU: AMD Ryzen “Zen 2”, 8 nhân / 16 luồng, lên đến 3.5 GHz\r\n GPU: AMD Radeon RDNA 2, hỗ trợ ray tracing, tốc độ đỉnh ~2.23 GHz, 10.3 TFLOPS \r\nRAM: 16 GB GDDR6, băng thông 448 GB/s\r\nSSD nội bộ: 1 TB PCIe 4.0 NVMe (thực dùng ~667 GB sau hệ điều hành)\r\nKích thước (không kể chân đế): 358 × 96 × 216 mm ', '[\"http://localhost:3000/uploads/sony-playstation-5-slim-asia-00479-2.jpg\",\"http://localhost:3000/uploads/sony-playstation-5-slim-asia-00479-3.jpg\"]'),
(58, 'Máy chơi game cầm tay MSI Claw A1M-049VN', 13000000, 'Âm thanh và Giải trí', 'MSI', 'Còn hàng', 'http://localhost:3000/uploads/msi-claw-a1m-049vn-core-ultra-7-1.jpg', 17, 'CPU: Intel Core Ultra 7 155H (16 nhân – 6 P + 8 E + 2 low‑power E, boost đến 4.8 GHz)\r\n GPU: Intel Arc Graphics tích hợp (8 Xe cores) \r\nLưu trữ: 512 GB NVMe PCIe Gen4 SSD (khe M.2 mở rộng) \r\nRAM: 16 GB LPDDR5‑6400 (onboard) \r\nMàn hình: 7″ FHD (1920×1080), IPS, cảm ứng, tần số quét 120 Hz, gam màu 100% sRGB ', '[\"http://localhost:3000/uploads/msi-claw-a1m-049vn-core-ultra-7-2.jpg\",\"http://localhost:3000/uploads/msi-claw-a1m-049vn-core-ultra-7-3.jpg\"]'),
(59, 'Máy chơi game Sony PlayStation 5 Slim CFI-2018 A01 ', 1000000, 'Âm thanh và Giải trí', 'Sony', 'Còn hàng', 'http://localhost:3000/uploads/sony-playstation-5-slim-cfi-2018-a01-1.jpg', 17, 'CPU: AMD Ryzen “Zen 2” — 8 nhân / 16 luồng, tốc độ đến 3.5 GHz \r\n GPU: AMD Radeon RDNA 2 — hỗ trợ ray tracing, xung nhịp lên đến ~2.23 GHz, đạt ~10.3 TFLOPS \r\nRAM: 16 GB GDDR6, băng thông 448 GB/s  \r\nKích thước: 358 × 96 × 216 mm\r\nHộp gồm: Console, 1 tay DualSense, cáp nguồn, HDMI, cáp USB-C, stand ngang, trò chơi Astros Playroom ', '[\"http://localhost:3000/uploads/sony-playstation-5-slim-cfi-2018-a01-2.jpg\"]');

--
-- Triggers `product`
--
DROP TRIGGER IF EXISTS `trg_before_insert_product`;
DELIMITER $$
CREATE TRIGGER `trg_before_insert_product` BEFORE INSERT ON `product` FOR EACH ROW BEGIN
    IF NEW.quantity = 0 THEN
        SET NEW.status = 'Hết hàng';
    ELSE
        SET NEW.status = 'Còn hàng';
    END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trg_before_update_product`;
DELIMITER $$
CREATE TRIGGER `trg_before_update_product` BEFORE UPDATE ON `product` FOR EACH ROW BEGIN
    IF NEW.quantity = 0 THEN
        SET NEW.status = 'Hết hàng';
    ELSE
        SET NEW.status = 'Còn hàng';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `address` varchar(10000) NOT NULL,
  `phone` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `address`, `phone`) VALUES
(1, 'admin', 'a1@gmail.com', '123', 'admin', 'fdfs', '0'),
(2, 'Ngô Hùng Khương', 'khuong@gmail.com', '$2b$10$uCYe/3wqIgaNZcZk6.KjYeYS09eZDcDhpTComVmyMnPCQYLC3ztuy', 'customer', '123 HVT', '0397357620'),
(3, 'Vuong', 'ngokhuong060@gmail.com', '$2b$10$Q4QnLrsa4aOqD7esfG.3juZyF15qjS47Q23Kn7yzyIYRY/VDqkVF.', 'customer', '12 Ngô Mây', ''),
(4, 'hhh', 'h@gmail.com', '$2b$10$vbSjnca/s9nJWL2dBf712uRaNpsYqlPlN46iF6b2hZl8JUyWwwsVa', 'customer', '123 HVT', ''),
(5, 'NHK', 'n@gmail.com', '$2b$10$igKgAFCYYC.dUNABcPyRA..gKTirriWgk4XLPLlCErYOd0jjxK1Wq', 'customer', '12 Ngô Mây', ''),
(13, 'Ngô Khương', 'ngokhuong04@gmail.com', '$2b$10$2xN.rI31x2VXgHYB7z7OZeVPDVv0LEtM7z8NoHhBwOOeoR6Odd2qq', 'customer', '123 Hoàng Văn Thụ, TP Quy Nhơn', ''),
(14, 'Khương', '0397357620', '$2b$10$b5QQVQPjAU2ddxoR.eccyeIK55A/CQKK.zQRpT2U2vvXQRZFBKN/.', 'customer', '123 HVT', ''),
(16, 'Ngô Hùng Khương', 'hungkhuong32@gmail.com', '$2b$10$EHgOHR.wjyuRkNo/KFMIxOKo031mY8TYL7PLtfegl68uRu/bAA2Ei', 'customer', '345 HVT', ''),
(17, 'dd', '0123456789', '$2b$10$kojh2XNfObHvA6IrG4XoV.Gtq0AL9u9bOM8R/Z3JWrAr7/x1HZP0G', 'customer', 'kkk', ''),
(18, 'ddcxx', '0123456789', '$2b$10$6XMH.CghA961KnQx6JsY2OAU0zYDemQlltRzLGn.ZseWXprV2eMQ6', 'customer', '345 HVT', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
