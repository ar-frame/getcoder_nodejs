class Cipher
{
    static str2HexStr(str)
    {
        if(str === "")
    　　　　return "";
    　　var hexCharCode = [];
    　　for(var i = 0; i < str.length; i++) {
    　　　　hexCharCode.push((str.charCodeAt(i)).toString(16));
    　　}
    　　return hexCharCode.join("").toUpperCase();
    }

    static hexStr2Str(hexCharCodeStr)
    {
       var rawStr = hexCharCodeStr.trim();
    　　var len = rawStr.length;
    　　if(len % 2 !== 0) {
            console.log("Illegal Format ASCII Code!");
            return "";
    　　}
    　　var curCharCode;
    　　var resultStr = [];
    　　for(var i = 0; i < len;i = i + 2) {
    　　　　curCharCode = parseInt(rawStr.substr(i, 2), 16);
    　　　　resultStr.push(String.fromCharCode(curCharCode));
    　　}
    　　return resultStr.join("");
    }

    static randomString(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
        var i = 0;
    　　for (i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    }
    
    static urlencode(str) {
        let strArr = [];
        let output = '';
        strArr = Array.from(str);
        for (let v of strArr) {
            let regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
            output += v.match(regRule) ? encodeURIComponent(v) : this.encodeNoEmoji(v);
        }
        return output;
    }
        
    static encodeNoEmoji(str) {
        var output = '';
        var x = 0;
        str = this.utf16to8(str.toString());
        var regex = /(^[a-zA-Z0-9-_.]*)/;
        while (x < str.length) {
            var match = regex.exec(str.substr(x));
            if (match !== null && match.length > 1 && match[1] !== '') {
                output += match[1];
                x += match[1].length;
            } else {
                if (str[x] === ' ')
                    output += '+';
                else {
                    var charCode = str.charCodeAt(x);
                    var hexVal = charCode.toString(16);
                    output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
                }
                x++;
            }
        }
        return output;
    }
        
    static utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }
}

export default Cipher
