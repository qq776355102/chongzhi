const eth_transaction = require('../model/db_model/eth_transaction');


eth_transaction.find({where:{"hash":"23232323"}}).then(data=>{
    if(!data){
        console.log(1);
    }else{

        console.log(2);
    }
})