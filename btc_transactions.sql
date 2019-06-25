/*
SQLyog Ultimate
MySQL - 5.7.25-log 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `btc_transactions` (
	`id` int (11),
	`tx_hash` varchar (300),
	`tx_hash_big_endian` varchar (300),
	`tx_output_n` int (11),
	`script` varchar (450),
	`value` varchar (60),
	`value_hex` varchar (60),
	`confirmations` int (11),
	`tx_index` varchar (30),
	`status` int (11)
); 
