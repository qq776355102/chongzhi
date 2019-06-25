'use strict';
//创造transaction表的映射
const Sequelize = require('sequelize');
const definddb = require('../../app_need/db');
var attr = {//填充额外属性
    tx_hash: Sequelize.STRING(100),
    tx_hash_big_endian: Sequelize.STRING(100),
    tx_output_n: Sequelize.INTEGER(10),
    script: Sequelize.STRING(150),
    value: Sequelize.STRING(20),
    value_hex:Sequelize.STRING(20),
    confirmations:Sequelize.INTEGER(10),
    tx_index:Sequelize.STRING(10),
    status:Sequelize.INTEGER(10)
}
var btc_transaction = definddb('btc_transaction', attr);
module.exports = btc_transaction;