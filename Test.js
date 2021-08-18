import Fetch, {Config, ServerResponseException} from './Fetch'
import Cipher from './Cipher'

try {
    // let config  = new Config("http://192.168.2.168/task/server/arws.php", "seraagaldnialaldshgadl12312lasdfaaa")
    let config  = new Config("https://www.coopcoder.com/coop_server", "seraagaldnialaldshgadl12312lasdfaaa")
    // let config  = new Config("http://localhost/task/server/arws.php", "seraagaldnialaldshgadl12312lasdfaaa")
    
    config.setUserAuthKey("from cpp client init 1.3")
    // return

    config.USER_ACCESS_TOKEN = Cipher.randomString(10)
    let cp_fetch = new Fetch(config)
   
    window.fetch = cp_fetch

    // cp_fetch.getArray("server.ctl.main.Test", "t1", ['nffsdfsd你的哦的'], function (data) {
    //     console.log(data)
    // })
    
   


     // decodeURI
    //  console.log(Cipher.urlencode('中国'))

    //  console.log(unescape('nfffss%u4E0D%u77E5%u540D%u670D%u52A1'))
     
    //  console.log(Cipher.str2HexStr('aa大'))
    //  console.log(Cipher.hexStr2Str('61615927'))

    // window.fetch.sendRequest("server.ctl.dama.Dama", "getNeedToDamaList", [], function (data) {
    //     // 返回字符串
    //     console.log(data)
    // })

    // window.fetch.getObject("server.ctl.dama.Dama", "getNeedToDamaList", [], function (data) {
    //     console.log(11111)
    //     // 返回对象
    //     console.log(data.errMsg)
    // })


} catch (e) {
    console.log("catch err:" + e.message)
}

