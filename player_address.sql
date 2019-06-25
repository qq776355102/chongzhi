/*
SQLyog Ultimate
MySQL - 5.7.25-log 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `player_address` (
	`id` int (11),
	`player_id` int (11),
	`btc_address` varchar (150),
	`ltc_address` varchar (150),
	`usdt_address` varchar (150),
	`sk_address` varchar (150),
	`eth_address` varchar (150)
); 
