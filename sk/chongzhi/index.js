var request = require('sync-request');


var transaction = {};

//以太坊SK代币充值；精度8
transaction.findSkTransToHistery = function (to) {
    var rs = request('post', "https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x636435371cd3d7f6e18a03f7428eb51b9cabfc89&address=" + to + "&page=1&offset=100&sort=asc&apikey=HGVXFH1UH2EZ9ENTV5QKHR2TSTR211U7RR", {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // console.log(rs.body.toString());
    return JSON.parse(rs.body);

}

//以太坊usdt充值;精度6
transaction.findUsdtTransToHistery = function (to) {
    var rs = request('post', "https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xdac17f958d2ee523a2206206994597c13d831ec7&address=" + to + "&page=1&offset=100&sort=asc&apikey=HGVXFH1UH2EZ9ENTV5QKHR2TSTR211U7RR", {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // console.log(rs.body.toString());
    return JSON.parse(rs.body);

}


//btc充值;精度8
transaction.findBtcTransHistory = function (to) {
    var rs = request('get', `https://blockchain.info/unspent?active=${to}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );
    return JSON.parse(rs.body);
}

/* { unspent_outputs:
    [ { tx_hash:tions: 2,
         '0dc0fb07f2c59212da7bca8e6c1f6b5753a9ed40f88cbd5eecef649275119682',
        tx_hash_big_endian:\sk\btc_ltc_chongzhi>
         '829611759264efec5ebd8cf840eda953576b1f6c8eca7bda1292c5f207fbc00d',
        tx_output_n: 1,
        script: '76a914ac8246243b4ef42e777702d69f2b2bae788ce50d88ac',
        value: 10000,
        value_hex: '2710',
        confirmations: 5,
        tx_index: 458454996 } ] } */



module.exports = transaction;
var rs = transaction.findSkTransToHistery("0x6479a261685A096812e23bA2A0E8065636d2f7C8");
console.log(rs);


// transaction.findUsdtTransToHistery("0x8804e72b3bc82bce353dc0fe933e78458e250444")