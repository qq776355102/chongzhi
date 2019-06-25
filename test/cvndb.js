'use strict';
//创造transaction表的映射
const Sequelize = require('sequelize');
const definddb = require('../app_need/db');
var attr = {//填充额外属性
    address: Sequelize.STRING(200),
    amount: Sequelize.INTEGER(20)
}
var db_cvntx = definddb('tests', attr);
module.exports = db_cvntx;