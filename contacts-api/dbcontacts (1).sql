-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2024 at 05:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbcontacts`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblcontacts`
--

CREATE TABLE `tblcontacts` (
  `contact_id` int(11) NOT NULL,
  `contact_userId` int(11) NOT NULL,
  `contact_name` varchar(100) NOT NULL,
  `contact_phone` varchar(15) NOT NULL,
  `contact_email` varchar(100) NOT NULL,
  `contact_address` varchar(100) NOT NULL,
  `contact_group` int(11) NOT NULL,
  `contact_image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblcontacts`
--

INSERT INTO `tblcontacts` (`contact_id`, `contact_userId`, `contact_name`, `contact_phone`, `contact_email`, `contact_address`, `contact_group`, `contact_image`) VALUES
(14, 2, 'Kulasa D. Makakiyomaluya', '666-666-666', 'kulasa@gmail.com', 'Simaya', 3, ''),
(18, 3, 'Pablo Penduko', '1234567890', 'pedro@gmail.com', 'BUkidnon', 6, ''),
(19, 2, 'KULASA DIMAGIBA', '444555666777', 'awawa666@gmail.com', 'Malaybalay City', 6, ''),
(27, 1, 'Marco Aranton', '666-777-888', 'marco@gmail.com', 'Medina', 2, ''),
(28, 2, 'Diwata Torre', '12345677', 'ambot@gmail.com', 'Davao', 1, ''),
(31, 1, 'DONALD TRUMP', '584764346', 'donald@gmail.com', 'USA', 5, '');

-- --------------------------------------------------------

--
-- Table structure for table `tblgroups`
--

CREATE TABLE `tblgroups` (
  `grp_id` int(11) NOT NULL,
  `grp_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblgroups`
--

INSERT INTO `tblgroups` (`grp_id`, `grp_name`) VALUES
(1, 'Family'),
(2, 'Friends'),
(3, 'Classmates'),
(4, 'Colleagues'),
(5, 'Enemies'),
(6, 'Crushes');

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `usr_id` int(11) NOT NULL,
  `usr_username` varchar(30) NOT NULL,
  `usr_password` varchar(30) NOT NULL,
  `usr_fullname` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblusers`
--

INSERT INTO `tblusers` (`usr_id`, `usr_username`, `usr_password`, `usr_fullname`) VALUES
(1, 'pitok', '12345', 'Pitok Batolata'),
(2, 'kulas', '54321', 'Kulas D. Malas'),
(3, 'binimae', '12345', 'Princess Bini Mae'),
(30, 'kitty', '12345', 'Kitty Duterte'),
(31, 'cat', '54321', 'Cathy Mac'),
(32, 'hans', '123', 'Hans Ford'),
(33, 'tokpi', 'tokpi', 'Tokpi B.'),
(34, 'mickey', 'mouse', 'Mickey Mouse'),
(35, 'willie', '12345', 'Free Willie'),
(36, '123', '123', '123 123'),
(37, 'elsa', '12345', 'elsa frozen'),
(39, 'elsa01', '12345', 'elsa frozen'),
(43, 'alexp', '12345', 'Alex Pereira'),
(45, 'james', '12345', 'James Magsalay'),
(46, 'ashlee', '12345', 'Ashlee Tabz'),
(47, 'mar', '123', 'mar mar'),
(48, 'shan', '123', 'Shan'),
(49, 'jasolan', '123', 'Mae Jasolan'),
(50, 'kamala', '12345', 'Kamala Harris');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblcontacts`
--
ALTER TABLE `tblcontacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `ndxUserId` (`contact_userId`),
  ADD KEY `ndGroup` (`contact_group`);

--
-- Indexes for table `tblgroups`
--
ALTER TABLE `tblgroups`
  ADD PRIMARY KEY (`grp_id`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`usr_id`),
  ADD UNIQUE KEY `ndxUsername` (`usr_username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblcontacts`
--
ALTER TABLE `tblcontacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tblgroups`
--
ALTER TABLE `tblgroups`
  MODIFY `grp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblcontacts`
--
ALTER TABLE `tblcontacts`
  ADD CONSTRAINT `tblcontacts_ibfk_1` FOREIGN KEY (`contact_userId`) REFERENCES `tblusers` (`usr_id`),
  ADD CONSTRAINT `tblcontacts_ibfk_2` FOREIGN KEY (`contact_group`) REFERENCES `tblgroups` (`grp_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
