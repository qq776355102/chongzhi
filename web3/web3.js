var Web3 = require('web3');
var request = require('sync-request');
var Tx = require('ethereumjs-tx');
var CryptoJS = require("crypto-js");

//const Sequelize = require('sequelize');

//var Queue = require('../queue/index.js');

const db_transaction = require('../model/db_model/eth_tixian.js');

var config = require('../app_need/config');

// 合约地址
var skcontractAddress = "0x636435371cd3d7f6e18a03f7428eb51b9cabfc89"; //SK合约地址
var usdtcontractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7" //usdt合约地址

var skabi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "withdrawEther", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "unpause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "paused", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "pause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }];
var usdtabi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
var fromAddress = config.from_address;
var private_key = config.private_key;
var privKey = new Buffer.from(private_key, 'hex');
var gasLimit = 90000;
// 创建web3对象
var web3 = new Web3();
// 连接到主网
web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io/v2/11d78a7c90094677b48c5200d7253459"));

// var queue = Queue.getInstance();
var contractAddress;
var coinContract;

async function transfer(to, amount, userId, coinType, logId, retry, c_nonce) {
    if(coinType=="sk"){
        contractAddress = skcontractAddress;
        coinContract = web3.eth.contract(skabi).at(contractAddress);
    }else if(coinType=="usdt"){
        contractAddress = usdtcontractAddress;
        coinContract = web3.eth.contract(usdtabi).at(contractAddress);
    }
    try {
        var gasPrice = 1.5 * web3.eth.gasPrice;
       

        var data = await db_transaction.findOne({ 'order': "nonce DESC", 'limit': 1 });

        var count = web3.eth.getTransactionCount(fromAddress);
        if (data&&data.nonce) {
           // if (data.nonce && count < data.nonce + 1 && count + 50 > data.nonce + 1 ) {
                count = data.nonce + 1;
           // }
        }

        await db_transaction.create({
           // 'txHash': tx_hash,
            'amount': amount,
            'coinType': coinType,
            'userId': userId,
            'to': to,
            'from': fromAddress,
            //'gaslimit': gasLimit,
           // 'gasPrice': gasPrice.toString(10),
            'nonce': count,
            'contractAddress': contractAddress,
            'logId': logId,
            'txReceiptStatus': 3
        });
        // if (c_nonce != undefined || c_nonce != null) {
        //     if (c_nonce > count) {
        //         count = c_nonce;
        //     }
        // };

        console.log('count=' + count);

        console.log('gasPrice=' + gasPrice.toString(10));

        // 查询余额
        var tokenBalance = coinContract.balanceOf(fromAddress);
        console.log('tokenBalance=' + tokenBalance.toString(10));
        // 转账
        var transactionData ;
            if(coinType=="sk"){
                transactionData = coinContract.transfer.getData(to,
                    Number(amount) * 100000000);
            }else if(coinType=="usdt"){
                transactionData = coinContract.transfer.getData(to,
                    Number(amount) * 1000000);
            }

        var rawTransaction = {
            "from": fromAddress,
            "nonce": web3.toHex(count),
            "gasPrice": web3.toHex(gasPrice),
            "gasLimit": web3.toHex(gasLimit),
            "to": contractAddress,
            "value": "0x0",
            "data": transactionData,
        };
        // 读取私钥，这里不包含‘0x’两个字符
        var tx = new Tx(rawTransaction);
        // 用私钥签名交易信息
        tx.sign(privKey);
        var serializedTx = tx.serialize();
        // 发送交易
        var rawTransaction_hex = '0x' + serializedTx.toString('hex');
        //   var rs = request('post', 'https://api.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=' + rawTransaction_hex + '&apikey=HGVXFH1UH2EZ9ENTV5QKHR2TSTR211U7RR', {
        //    headers: {
        //        'Content-Type': 'application/json'
        //    }
        //  });

        var tx_hash = await web3.eth.sendRawTransaction(rawTransaction_hex);

        //  var result = JSON.parse(rs);

        // console.log("result=" + JSON.stringify(result));
        if(tx_hash){
            await db_transaction.update({
                'txHash': tx_hash,
                'gaslimit': gasLimit,
                'gasPrice': gasPrice.toString(10),
                'txReceiptStatus': 4
            },{where:{"logId":logId}});
        }

        return { 'status': 0, 'message': err.toString() }
        // if (tx_hash) {
        //     await db_transaction.update({
        //         'txHash': tx_hash,
        //         'gaslimit': gasLimit,
        //         'gasPrice': gasPrice.toString(10),
        //         'txReceiptStatus': 4
        //     },{where:{"logId":logId}});
        //     var logData = await db_transaction.findOne({
        //         where: { 'logId': logId }
        //     });
        //     if (logData == null) {


        //     } else {
        //         await db_transaction.update({
        //             'txHash': tx_hash,
        //             'amount': amount,
        //             'coinType': coinType,
        //             'userId': userId,
        //             'to': to,
        //             'from': fromAddress,
        //             'gaslimit': gasLimit,
        //             'nonce': count,
        //             'gasPrice': gasPrice.toString(10),
        //             'contractAddress': contractAddress,
        //             'txReceiptStatus': 4
        //         }, {
        //                 where: { 'logId': logId }
        //             });
        //     };
        //     try {
        //         var param = {
        //             cvn_log_id: logId,
        //             receiptStatus: 2,
        //             txHash: tx_hash,
        //             time: '',
        //             t: new Date().getTime() / 1000
        //         };
        //         var sign = CryptoJS.SHA1(JSON.stringify(param).concat('3A4mrxQfmoxfhxqjKnR2Ah4sES5EB1KtrM'));
        //         request('POST', push_txstate_url + '&sign=' + sign, {
        //             headers: {
        //                 'Content-Type': 'application/json;charset=utf-8'
        //             },
        //             // json: param,
        //             body: JSON.stringify(param)
        //         });
        //     } catch (error) {
                
        //     };
        //     return { 'status': 1, 'txid': tx_hash }

        // } else {
        //     if (retry == null || retry == undefined) {
        //         var logData = await db_transaction.findOne({
        //             where: { 'logId': logId }
        //         });

        //         if (logData == null) {
        //             await db_transaction.create({
        //                 'message': 'chu cuo le ',
        //                 'amount': amount,
        //                 'coinType': coinType,
        //                 'userId': userId,
        //                 'to': to,
        //                 'from': fromAddress,
        //                 'gaslimit': gasLimit,
        //                 'gasPrice': gasPrice.toString(10),
        //                 'contractAddress': contractAddress,
        //                 'logId': logId,
        //                 'txReceiptStatus': 2
        //             });
        //         } else {
        //             await db_transaction.update({
        //                 'message': 'chu cuo le ',
        //                 'amount': amount,
        //                 'coinType': coinType,
        //                 'userId': userId,
        //                 'to': to,
        //                 'from': fromAddress,
        //                 'gaslimit': gasLimit,
        //                 'gasPrice': gasPrice.toString(10),
        //                 'contractAddress': contractAddress,
        //                 'txReceiptStatus': 2
        //             }, {
        //                     where: { 'logId': logId }
        //                 });
        //         }
        //         try {
        //             var param = {
        //                 cvn_log_id: logId,
        //                 receiptStatus: 2,
        //                 txHash: '',
        //                 time: '',
        //                 t: new Date().getTime() / 1000
        //             };
        //             var sign = CryptoJS.SHA1(JSON.stringify(param).concat('3A4mrxQfmoxfhxqjKnR2Ah4sES5EB1KtrM'));
        //             request('POST', push_txstate_url + '&sign=' + sign, {
        //                 headers: {
        //                     'Content-Type': 'application/json;charset=utf-8'
        //                 },
        //                 // json: param,
        //                 body: JSON.stringify(param)
        //             });
        //         } catch (error) {
                    
        //         }
     
        //     };
        //     return { 'status': '0', 'message': 'chu cuo le ' };
        // }
    } catch (err) {
        // console.log("出錯了");
        // var logData = await db_transaction.findOne({
        //     where: { 'logId': logId }
        // });
        // if (logData == null) {
        //     await db_transaction.create({
        //         'message': 'web3.js tranfer error',
        //         'amount': amount,
        //         'coinType': coinType,
        //         'userId': userId,
        //         'to': to,
        //         'from': fromAddress,
        //         'contractAddress': contractAddress,
        //         'logId': logId,
        //         'txReceiptStatus': 6
        //     });
        // };
        // var param = {
        //     cvn_log_id: logId,
        //     receiptStatus: 2,
        //     txHash: '',
        //     time: '',
        //     t: new Date().getTime() / 1000
        // };
        // var sign = CryptoJS.SHA1(JSON.stringify(param).concat('3A4mrxQfmoxfhxqjKnR2Ah4sES5EB1KtrM'));
        // request('POST', push_txstate_url + '&sign=' + sign, {
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     // json: param,
        //     body: JSON.stringify(param)
        // });
         return { 'status': 0, 'message': err.toString() }
    };
}


module.exports = transfer;