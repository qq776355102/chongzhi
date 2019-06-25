'use strict';
//创造transaction表的映射
const Sequelize = require('sequelize');
const definddb = require('../../app_need/db');
var attr = {//填充额外属性
    blockNumber: Sequelize.STRING(20),
    timeStamp: Sequelize.STRING(10),
    hash: Sequelize.STRING(100),
    nonce: Sequelize.INTEGER(10),
    blockHash: Sequelize.STRING(100),
    from: Sequelize.STRING(50),
    contractAddress: Sequelize.STRING(50),
    to: Sequelize.STRING(50),
    value: Sequelize.STRING(30),
    tokenName: Sequelize.STRING(20),
    tokenSymbol: Sequelize.STRING(5),
    tokenDecimal:Sequelize.INTEGER(20),
    transactionIndex:Sequelize.INTEGER(10),
    gas:Sequelize.STRING(10),
    gasPrice:Sequelize.STRING(10),
    gasUsed:Sequelize.STRING(10),
    input:Sequelize.STRING(200),
    confirmations:Sequelize.INTEGER(11),
    status:Sequelize.INTEGER(10)
        
}
var eth_transaction = definddb('eth_transaction', attr);
module.exports = eth_transaction;