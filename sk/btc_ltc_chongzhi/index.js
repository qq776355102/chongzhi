var request = require('sync-request');


var rs = request('get', "https://blockchain.info/unspent?active=1Gj9HbEzfxdNwBEZY5XRue2pPX1Swb1hTe"
    , {
    headers: {
        'Content-Type': 'application/json'
    }
}
);
console.log(JSON.parse(rs.body).unspent_outputs);
//console.log(JSON.stringify(rs));
