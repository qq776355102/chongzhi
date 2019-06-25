'use strict';
//创造transaction表的映射
const Sequelize = require('sequelize');
const definddb = require('../../app_need/db');
var attr = {//填充额外属性
    player_id: Sequelize.INTEGER(20),
    btc_address: Sequelize.STRING(50),
    ltc_address: Sequelize.STRING(50),
    // usdt_address: Sequelize.STRING(50),
    // sk_address: Sequelize.STRING(50),
    eth_address:Sequelize.STRING(50)
}
var db_player_address = definddb('player_address', attr);
module.exports = db_player_address;