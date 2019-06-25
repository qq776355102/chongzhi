'use strict';
/**
 * 开发环境配置文件
 */
var config = {
    env: 'development', //环境名称
    port: 3001,         //服务端口号
    mysql_config: {
        //mysql数据库配置
        db_name: 'cvn_wallet',//数据库名称
        db_user: 'root',//数据库使用者名称
        db_password: 'yyets@12345678',//使用者密码
        db_host: '127.0.0.1',//地址
        db_port: '3306',//端口号
        db_prefix: '',//表前缀,
        dialectOptions: {
            socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
        }
    },


    private_key: "c9e61d9cde31968fe881b0f6f9f6eabfed69a56f17f82da5d50d42016aaaf7a6",

    from_address: "0xeD4249236aa4ba1fD52f0643F0998324E73D719b",

    //cvn提现配置
    cvn_tixian: {
        //单次提现金额上限
        tixian_upper_limit: 100,
        //体现频率,默认1天1次; count=0,禁止体现; count < 0,提现不受限制
        tixian_rate: {
            day: 1,
            count: -1
        },
        //开通提现时间戳,默认2019-01-01 00:00:00
        start_time: 1546272
    },
    
    mnemonic:"abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

};
module.exports = config;