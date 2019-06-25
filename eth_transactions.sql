/*
SQLyog Ultimate
MySQL - 5.7.25-log 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `eth_transactions` (
	`id` int (11),
	`blockNumber` varchar (60),
	`hash` varchar (300),
	`nonce` int (11),
	`blockHash` varchar (300),
	`from` varchar (150),
	`contractAddress` varchar (150),
	`to` varchar (150),
	`value` varchar (90),
	`tokenName` varchar (60),
	`tokenSymbol` varchar (15),
	`tokenDecimal` int (20),
	`transactionIndex` int (11),
	`gas` varchar (30),
	`gasPrice` varchar (30),
	`gasUsed` varchar (30),
	`input` varchar (600),
	`confirmations` int (11),
	`createdAt` bigint (20),
	`updatedAt` bigint (20),
	`status` int (11)
); 
