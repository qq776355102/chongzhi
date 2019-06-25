const schedule = require('node-schedule');
const transaction = require('../../sk/chongzhi/index');
const player_address = require('../../model/db_model/player_address');
const btc_transaction = require('../../model/db_model/btc_transaction.js');
/*  author:mc
    qq:776355102
    2019/6/14
    btc公链充值
*/
const  scheduleCronstyle = ()=>{
    //每10分钟的定时执行一次:
      schedule.scheduleJob('* 10 * * * *',()=>{
          player_address.count().then(count=>{
              for (let index = 0; index <= count; index++) {
                  player_address.find({where:{"id":index}}).then(row=>{
                     if(row&&row.btc_address){
                         var outs = transaction.findBtcTransHistory(row.btc_address);
                         if(outs&&outs.unspent_outputs){
                            outs.unspent_outputs.forEach(unspent => {
                                 btc_transaction.findOrCreate({
                                     "tx_hash":unspent.tx_hash,
                                     "tx_hash_big_endian:":unspent.tx_hash_big_endian,
                                     "tx_output_n":unspent.tx_output_n,
                                     "script":unspent.script,
                                     "value":unspent.value,
                                     "value_hex":unspent.value_hex,
                                     "confirmations":unspent.confirmations,
                                     "tx_index":unspent.tx_index,
                                     "status":1
                                 },{
                                     where:{"tx_hash":unspent.tx_hash}
                                 })
                             });
                         }                        
                     }
                  })
                }
            })
        })
    }