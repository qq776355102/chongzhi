'use strict';


var request = require('sync-request');
var transfer = require('../web3/web3.js');
const db_transaction = require('../model/db_model/eth_tixian.js');

var config = require('../app_need/config');
var CryptoJS = require("crypto-js");
var address = require("../sk/address/index");
var player_address = require('../model/db_model/player_address');

var index = {};

//提现
index.insert = async function (ctx, next) {
   // var sign = ctx.query.sign;

    //  let url = ctx.url;

    let req_query = ctx.request.body;
    // if (CryptoJS.SHA1(JSON.stringify(req_query).concat('3A4mrxQfmoxfhxqjKnR2Ah4sES5EB1KtrM')) != sign) {
    //     ctx.body = { 'status': 0, 'message': "签名出错" };
    //     return;
    // };
    // if (new Date().getTime() - req_query.t * 1000 >= 10 * 60 * 1000) {
    //     ctx.body = { 'status': 0, 'message': "签名过期" };
    //     return;
    // };

    // let req_queryString = request.query;
    if (req_query.coinType == "usdt" || req_query.coinType == "sk") {
        return new Promise(function (resolve, reject) {
            if (Number(req_query.amount) > config.cvn_tixian.tixian_upper_limit) {
                ctx.body = { 'status': 0, 'message': "体现超过上限值：" + config.cvn_tixian.tixian_upper_limit };
                resolve(next());
            } else {
                if (config.cvn_tixian.tixian_rate.count == 0) {
                    ctx.body = { 'status': 0, 'message': "系统提现端口关闭,开放日期已通知时间为准" };
                    resolve(next());
                }
                else if (config.cvn_tixian.tixian_rate.count < 0 && new Date().getTime() >= config.cvn_tixian.start_time) {
                    db_transaction.findOne({
                        where: {
                            'logId': req_query.log_id
                        }
                    }).then(function (oldData) {
                        if (oldData) {
                            ctx.body = { 'status': 1, 'txid': oldData.txHash };
                            resolve(next());
                        } else {
                            transfer(
                                req_query.to,
                                req_query.amount,
                                req_query.userId,
                                req_query.coinType
                            ).then(function (data) {
                                ctx.body = data;
                                resolve(next());
                            });
                        }
                    });
                } else if (new Date().getTime() >= config.cvn_tixian.start_time) {
                    db_transaction.findAll({
                        where: {
                            'userId': req_query.userId,
                            'createdAt': {
                                $lt: new Date().getTime(),
                                $gte: (new Date().getTime() - Number(config.cvn_tixian.tixian_rate.day * 24 * 60 * 60 * 1000))
                            }
                        }
                    }).then(function (data) {
                        if (data.length <= 0) {
                            transfer(
                                req_query.to,
                                req_query.amount,
                                req_query.userId,
                                req_query.coinType,
                                req_query.log_id
                            ).then(function (data) {
                                ctx.body = data;
                                resolve(next());
                            });
                        } else {
                            if (data.length >= config.cvn_tixian.tixian_rate.count) {
                                ctx.body = { 'status': 0, 'message': "你已经超过" + config.cvn_tixian.tixian_rate.day + "天" + config.cvn_tixian.tixian_rate.count + "次的提现上限了" }
                                resolve(next());
                            } else {
                                var b = true;
                                for (var i = 0; i <= data.length; i++) {
                                    if (req_query.log_id == data[i].logId) {
                                        b = false;
                                        ctx.body = { 'status': 1, 'txid': data[i].txHash };
                                        resolve(next());
                                        return;
                                    };
                                };
                                if (b) {
                                    transfer(
                                        req_query.to,
                                        req_query.amount,
                                        req_query.userId,
                                        req_query.coinType,
                                        req_query.log_id
                                    ).then(function (data) {
                                        ctx.body = data;
                                        resolve(next());
                                    });
                                };

                            }
                        }
                    });
                } else {
                    ctx.body = { 'status': 0, 'message': "提现将于" + getLocalTime(config.cvn_tixian.start_time) + "开通" }
                    resolve(next());
                }
            }
        });
    }
}


//查询交易状态
index.getTransactionId = async function (ctx, next) {
    var logId = ctx.request.query.txid;
    if (ctx.request.query.debug && ctx.request.query.debug == "1") {
        ctx.body = {
            receiptStatus: ctx.request.query.receiptStatus,
            status: 1
        };
        return;
    };
    return new Promise(function (resolve, reject) {
        db_transaction.findOne({
            where: {
                'logId': logId
            }
        }).then(function (data) {
            if (data == null) {
                ctx.body = {
                    receiptStatus: 3,
                    status: 1
                };
                resolve(next());
            } else {
                var res = request('post', 'https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=' + data.txHash + '&apikey=HGVXFH1UH2EZ9ENTV5QKHR2TSTR211U7RR', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                ctx.body = {
                    receiptStatus: JSON.parse(res.getBody('utf8')).status,
                    status: 1
                };
                resolve(next());
            }
        });
    })
}

//查询币价
index.getCvnPrice = async function (ctx, next) {
    ctx.body = {
        status: 1,
        unit: "USDT",
        cvntPrice: "0.013"
    };
}

//获取充值地址
index.getAdress = async function (ctx, next) {
    console.log(JSON.stringify(ctx.request.body));
    var userId = ctx.request.body.userId;
    var coinType = ctx.request.body.coinType;
    var addr = address(Number(userId), Number(coinType));
    var btc_address = "";
    var ltc_address = "";
    var eth_address = "";
    var symbol = "";
    switch (Number(coinType)) {
        case 1:
            btc_address = addr;
            symbol = "btc";
            break;
        case 2:
            ltc_address = addr;
            symbol = "ltc";
            break;
        default:
            eth_address = addr;
            symbol = "";
            break;
    }

    player_address.upsert({
        player_id: userId,
        btc_address: btc_address,
        ltc_address: ltc_address,
        eth_address: eth_address
    }, {
            where: {
                player_id: userId
            }
        });

    ctx.body = {
        status: 1,
        info: "",
        data: {
            userId: userId,
            address: addr,
            symbol: symbol
        }
    };

}


function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

index.sk_usdt_tixian = async function (ctx, next) {
    ctx.body = {
        status: 1,
        unit: "USDT",
        cvntPrice: "0.013"
    };
}

module.exports = index;


