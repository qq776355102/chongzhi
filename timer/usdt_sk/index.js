const schedule = require('node-schedule');
const transaction = require('../../sk/chongzhi/index');
const player_address = require('../../model/db_model/player_address');
const eth_transaction = require('../../model/db_model/eth_transaction');



/*  author:mc
    qq:776355102
    2019/6/13
    eth公链：usdt和sk的充值记录，并把记录插入数据库;状态为1
*/
const  scheduleCronstyle = ()=>{
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('30 * * * * *',()=>{

        player_address.count().then(count=>{
            for (let index = 0; index <= count; index++) {
                player_address.find({where:{"id":index}}).then(row=>{
                    var usdt_and_sk_trans = [];
                    //sk代币的交易记录
                    if(row&&row.eth_address){
                        var skTrans = transaction.findSkTransToHistery(row.eth_address);
                        if(skTrans&&skTrans.status=="1"){
                            usdt_and_sk_trans.concat(skTrans.result);
                        }
                        var usdtTrans = transaction.findUsdtTransToHistery(row.eth_address);
                        if(usdtTrans&& usdtTrans.status == "1"){
                            usdt_and_sk_trans.concat(usdtTrans.result);                            
                        }
                    }   
                    //usdt的交易记录                 
                    // if(row&&row.usdt_address){
                    // }

                    usdt_and_sk_trans.forEach(tran => {
                        eth_transaction.findOrCreate({
                            "hash":tran.hash,
                            "blockNumber":tran.blockNumber,
                            "nonce":tran.nonce,
                            "blockHash":tran.blockHash,
                            "from":tran.from,
                            "contractAddress":tran.contractAddress,
                            "to":tran.to,
                            "value":tran.value,
                            "tokenName":tran.tokenName,
                            "tokenSymbol":tran.tokenSymbol,
                            "tokenDecimal":tran.tokenDecimal,
                            "transactionIndex":tran.transactionIndex,
                            "gas":tran.gas,
                            "gasPrice":tran.gasPrice,
                            "gasUsed":tran.gasUsed,
                            "input":tran.input,
                            "confirmations":tran.confirmations,
                            "createdAt":tran.createdAt,
                            "updatedAt":tran.updatedAt,
                            "status":1
                        },{where:{"hash":tran.hash}});
                    });
                })
            }
        })
    }); 
}

scheduleCronstyle();