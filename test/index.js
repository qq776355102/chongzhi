const db_transaction = require('./cvndb.js');
var Web3 = require('web3');
var request = require('sync-request');
var Tx = require('ethereumjs-tx');


function  transfer(to, amount,count) {

    var fromAddress = "0x429e4712856E72B73198c38448e3f7db1b6D2Bb4";

    var private_key = "66758b28e0b22507b0a030c1e99af52ed8136863b4338625feec9869dd43fccc";

    var privKey = new Buffer.from(private_key, 'hex');

    // 创建web3对象
    var web3 = new Web3();
    // 连接到主网
    web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/11d78a7c90094677b48c5200d7253459"));
    // 合约地址
    var contractAddress = "0x6400B5522f8D448C0803e6245436DD1c81dF09ce";
    var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
    var coinContract = web3.eth.contract(abi).at(contractAddress);
    var toAddress = to;
   // var count = 
    //web3.eth.getTransactionCount(fromAddress);
    console.log('count=' + count);
    var gasPrice =  5000000000;

    // web3.eth.gasPrice*1.5;
    console.log('gasPrice=' + gasPrice.toString(10));
    var gasLimit = 90000;
    var s = "000000000000000000000000000000"+(toAddress.slice(2));
    var l = s.length;
    var a = s.slice(l-64);
    console.log(a);

    var s2 = "0000000000000000000000000000000000000000000000000000000000000"+((web3.toHex(Number(amount) * 100000000)).slice(2));
    var l2 = s2.length;
    var a2 = s2.slice(l2-64);
    console.log(a2);
    // 转账
    // var data = coinContract.transfer.getData(toAddress,
    //     Number(amount) * 100000000);
        
    var rawTransaction = {
        "from": fromAddress,
        "nonce": web3.toHex(count),
        "gasPrice": web3.toHex(gasPrice),
        "gasLimit": web3.toHex(gasLimit),
        "to": contractAddress,
        "value": "0x0",
        "data": "0xa9059cbb"+a+a2,
    };
    // // 读取私钥，这里不包含‘0x’两个字符
     var tx = new Tx(rawTransaction);
    // // 用私钥签名交易信息
     tx.sign(privKey);
     var serializedTx = tx.serialize();
    // // 发送交易
    var rawTransaction_hex = '0x' + serializedTx.toString('hex');




   


    var rs = request('post', 'https://api.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=' + rawTransaction_hex + '&apikey=HGVXFH1UH2EZ9ENTV5QKHR2TSTR211U7RR', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(rs.body.toString());


    console.log("==========================================================================================================");
}




async function a(){
    for(var i = 641;i<=654;i++){
      var  oldData =  await db_transaction.findOne({
            where: {
                'id': i
            }
        });
        console.log(oldData.address+"--"+oldData.amount);
        transfer(oldData.address,oldData.amount,oldData.id);
        
        // .then(function (oldData) {
        

        
        
        //  });
    }
}

a();



