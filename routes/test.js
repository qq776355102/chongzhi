const router = require('koa-router')();


var CryptoJS = require("crypto-js");




const AES_KEY = "666666777777444"; //16位
const AES_IV = "1234567890123456";  //16位
function aes_encrypt(plainText) {
    // var encrypted = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Utf8.parse(AES_KEY), {iv:  CryptoJS.enc.Utf8.parse(AES_IV)});
    // return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    return CryptoJS.SHA1("3A4mrxQfmoxfhxqjKnR2Ah4sES5EB1KtrM"+JSON.stringify({"t":"1546065010","to":"0x958c64579b9375e6b426d7dd7cbf59b4805d2993","userId":"5164708","amount":"10","coinType":"CVNT","cvn_log_id":"440"}));

    //  CryptoJS.HmacSHA256("","54321");
}


function aes_decrypt(ciphertext) {
    var decrypted = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(AES_KEY), {iv: CryptoJS.enc.Utf8.parse(AES_IV)});
    return decrypted.toString(CryptoJS.enc.Utf8);
}

    // decrypt_data = aes_decrypt(encrypt_data);
    // console.log(decrypt_data);

    var data = JSON.stringify({"t":"1545984993","to":"0x958c64579b9375e6b426d7dd7cbf59b4805d2993","userId":"5164708","amount":"1","coinType":"CVNT","cvn_log_id":"412"});
    console.log(aes_encrypt(data));

router.get('/test', function (ctx, next) {



    // var data = JSON.stringify({"t":"1545984993","to":"0x958c64579b9375e6b426d7dd7cbf59b4805d2993","userId":"5164708","amount":"1","coinType":"CVNT","cvn_log_id":"412"});
    // console.log(aes_encrypt(data));
    
    ctx.body = {
        "b": "",
        'c': aes_encrypt("").toString()
    }


});








module.exports = router;
