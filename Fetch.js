import Config from './Config'
import Cipher from './Cipher'
import ServerResponseException from './ServerResponseException'
import fetch from 'node-fetch'
import FormData from 'form-data'

// const FormData = require('form-data')
class Fetch {
    constructor(config)
    {
        this.config = config;
    }

    getResponse(ws, ret)
    {
        let config = this.config
        const form = new FormData();
        form.append('ws', ws);
        fetch(config.SERVER_ADDRESS, { method: 'POST', body: form})
            .then(res => res.text())
            .then(body => {
                if (body.length > 0) {
                    let find_sep_index = body.indexOf(config.SERVER_RESPONSE_TAG)
                    if (find_sep_index >= 0) {
                        let retstring = body.substring(find_sep_index + config.SERVER_RESPONSE_TAG.length)
                        retstring = Cipher.hexStr2Str(retstring)
                        ret(retstring)
                    } else {
                        throw new ServerResponseException("err data:" + body)
                    }
                } else {
                    throw new ServerResponseException("return empty")
                }
            })
    }

    sendRequest(api, workerName, params, ret)
    {
        let dataMap = {}
        dataMap.type = "array"

        let authSign = {}

        let config = this.config

        authSign.AUTH_SERVER_OPKEY = config.AUTH_SERVER_OPKEY
        authSign.USER_AUTH_KEY = config.USER_AUTH_KEY
        authSign.USER_ACCESS_TOKEN = config.USER_ACCESS_TOKEN

        let map = {}
        map.class = api
        map.method = workerName

        if (params && params.length > 0) {
            map.param = JSON.stringify(params)
        } else {
            map.param = "[\"\"]"
        }

        map.authSign = authSign
        map.CLIENT_SERVER = "GETCODER-NODEJS-SDK-20191108";

        dataMap.data = map
        
        let sendJsonString = JSON.stringify(dataMap)
        sendJsonString = Cipher.urlencode(sendJsonString)
        // console.log(sendJsonString)
        let ws = Cipher.str2HexStr(sendJsonString)

		return this.getResponse(ws, function(data) {
            if (ret) {
                ret(data)
            }
        })
    }
    
    getObject(api, workerName, params, ret)
    {
        return this.sendRequest(api, workerName, params, function (data) {
            let jObject = JSON.parse(data)
            if (jObject.type == 'object') {
                
                if (ret) {
                    ret(jObject.data)
                }
               
            } else {
                throw new ServerResponseException("type check error, 'object' expected but "
                + jObject["type"] + " provided," + data);
            }
        })
    }

    getArray(api, workerName, params, ret)
    {
        return this.sendRequest(api, workerName, params, function (data) {
            let jObject = JSON.parse(data)
            if (jObject.type == 'array') {
                if (ret) {
                    ret(jObject.data)
                }
            } else {
                throw new ServerResponseException("type check error, 'array' expected but "
                + jObject["type"] + " provided," + data);
            }
        })
    }

    getInt(api, workerName, params, ret)
    {
        return this.sendRequest(api, workerName, params, function (data) {
            let jObject = JSON.parse(data)
            if (jObject.type == 'int') {
                if (ret) {
                    ret(parseInt(jObject.data))
                }
            } else {
                throw new ServerResponseException("type check error, 'int' expected but "
                + jObject["type"] + " provided," + data);
            }
        })
    }

    getDouble(api, workerName, params, ret)
    {
        return this.sendRequest(api, workerName, params, function (data) {
            let jObject = JSON.parse(data)
            if (jObject.type == 'float') {
                if (ret) {
                    ret(parseFloat(jObject.data));
                }
            } else {
                throw new ServerResponseException("type check error, 'float' expected but "
                + jObject["type"] + " provided," + data);
            }
        })
    }

    getFloat(api, workerName, params, ret)
    {
        return this.getDouble(api, workerName, params, ret);
    }

    getBool(api, workerName, params, ret)
    {
        return this.sendRequest(api, workerName, params, function (data) {
            let jObject = JSON.parse(data)
            if (jObject.type == 'bool') {
                if (ret) {
                    ret(Boolean(jObject.data));
                }
            } else {
                throw new ServerResponseException("type check error, 'bool' expected but "
                + jObject["type"] + " provided," + data);
            }
        })
    }

}

export {Config, ServerResponseException}
export default Fetch