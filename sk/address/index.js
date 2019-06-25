const coinjs = require('coinjs-lib');
const config = require('../../app_need/config');


/* 
    author:mc
    qq:776355102
    date:2019/6/13
    主要是生成地址
        使用的协议：bip44
        生成策略：根据用户自增id
*/
const mnemonic = config.mnemonic;

// validate mnemonic seed
console.log(coinjs.bip39.validateMnemonic(mnemonic));
// => true

// mnemonic to seed
const seed = coinjs.bip39.mnemonicToSeed(mnemonic);

const rootNode = coinjs.HDNode.fromSeedBuffer(seed);

const ethbip44 = 60;
const btcbip44 = 0;
const ltcbip44 = 2;
const ethchild = rootNode.derivePath(`m/44'/${ethbip44}'/0'/0/1`);
const btcchild = rootNode.derivePath(`m/44'/${btcbip44}'/0'/0/1`);
const ltcchild = rootNode.derivePath(`m/44'/${ltcbip44}'/0'/0/1`);
const ethaddress = ethchild.getAddress('eth');
const btcaddress = btcchild.getAddress();
const ltcaddress = ltcchild.getAddress('ltc');
console.log(ethaddress);
console.log(btcaddress);
console.log(ltcaddress);

/* coinType:
    1:btc
    2:ltc
    3:eth
 */
function getAddress(userId,coinType){
    var account = Math.floor(userId/10000)
    var index = userId%10000
    var symbol = 'eth';
    switch (coinType) {
        case 1:
            coinType = btcbip44;
            symbol = '';
            break;
        case 2:
            coinType = ltcbip44;
            symbol = 'ltc';
            break;
        default:
            coinType = ethbip44;
            symbol = 'eth';
            break;
    }
    const address = rootNode.derivePath(`m/44'/${coinType}'/${account}'/0/${index}`).getAddress(symbol);
    console.log(address);
    return address;
}

module.exports = getAddress;