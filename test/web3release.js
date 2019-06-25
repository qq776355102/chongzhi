var Web3 = require('web3');




    //var private_key = "";

   // var privKey = new Buffer.from(private_key, 'hex');

    // 创建web3对象
    var web3 = new Web3();
    // 连接到主网
    web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io/v2/11d78a7c90094677b48c5200d7253459"));
    // 合约地址
    var contractAddress = "0x5b233CBd8930D2BAeF5e58E7968603E5f7E84747";
    var abi = [{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"release","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"releaseTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"beneficiary","type":"address"},{"name":"releaseTime","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];
    var coinContract = web3.eth.contract(abi).at(contractAddress);
	var data = coinContract.release.getData("");
    console.log(data);

	