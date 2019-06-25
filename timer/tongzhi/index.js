const schedule = require('node-schedule');
const transaction = require('../../sk/chongzhi/index');
const player_address = require('../../model/db_model/player_address');
const eth_transaction = require('../../model/db_model/eth_transaction');
var CryptoJS = require('crypto-js');


const tongzhi_url = "http://127.0.0.1:8080/api/v1/yqb/recharge?sign=";
const secrect  = "";//接口私钥

var option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}
//,body: JSON.stringify({ key: value，key1：value1...... 


/*  author:mc
    qq:776355102
    2019/6/13
    eth公链的充值,推送
*/
const scheduleCronstyle = () => {
    //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('50 * * * * *', () => {
        eth_transaction.findAll({ where: { "status": 1 } }).then(trans => {
            trans.forEach(tran => {
                player_address.findOne({ where: { "eth_address": tran.to } }).then(isChongZhi => {
                    if (isChongZhi) {
                        //参数处理
                        var body = {
                            id = tran.id,
                            userId = isChongZhi.player_id,
                            timeStamp = tran.timeStamp,
                            hash = tran.hash,
                            to = tran.to,
                            value = Number(tran.value) / Number(tran.tokenDecimal),
                            symbol = tran.symbol,
                            blockNumber = tran.blockNumber,
                            from = tran.from
                        };
                        tongzhi_url += CryptoJS.SHA1(CryptoJS.MD5(body)+secrect).toString().toLocaleLowerCase();
                        return body;
                    }
                    return false;
                }).then(fet => {
                    if (fet) {
                        option.body = JSON.stringify(body);
                        fetch(tongzhi_url, option).then(function (res) {
                            if (res.ok) {
                                eth_transaction.update({ "status": 3 }, {
                                    where: {
                                        "hash": fet.hash
                                    }
                                });
                            } else {
                                //更改状态,充值通知失败
                                eth_transaction.update({ "status": 2 }, {
                                    where: {
                                        "hash": fet.hash
                                    }
                                });
                            }
                        })
                    }
                });

            });
        });
    });
}