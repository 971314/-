/**
 * Created by xiajing on 2016/11/14.
 */
//根据索引删除对应的记录
export function delData(arr,index){
  arr.splice(index, 1)
}
//添加数组
export function addInfo(arr,args){
  arr.push(args)
}
//修改数组
export function modifyInfo(arr,index,value){
   arr.splice(index-1,1,value)
}
//递归生成菜单树
export var menuListInfo= function(menuListObj){
    var str="";
    for(var i=0;i<menuListObj.length;i++){
        var urlStr = "";
        try{
            if(typeof menuListObj[i]["filePath"] == "undefined"){
                urlStr = "<div><span>"+ menuListObj[i]["fileName"] +"</span><ul>";
            }else{
                urlStr = "<div><span>"+menuListObj[i]["fileName"]+"</span><ul>";
            }
            str += urlStr;
            if(menuListObj[i]["childs"] != null){
                menuListInfo(menuListObj[i]["childs"]);
            }
            str += "</ul></div>";
        }catch(e){}
    }
    return str;
}
//校验是否是json格式
export var isJsonFormat = function(obj){
    try{
        var isJson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
        return isJson;
    }catch(e){
        alert("JSON数据格式不正确:\n"+e.message);
    }
}
//排序
export var orderBy = function(name,minor){
    return function(o,p){
        var a,b;
        if(o && p && typeof o === 'object' && typeof p ==='object'){
            a = o[name];
            b = p[name];
            if(a === b){
                return typeof minor === 'function' ? minor(o,p):0;
            }
            if(typeof a === typeof b){
                return a < b ? -1:1;
            }
            return typeof a < typeof b ? -1 : 1;
        }else{
            throw("error");
        }
    }
}
export function formatJson(json, options){
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    '; // one can also use '\t' or a different number of spaces
    // optional settings
    options = options || {};
    // remove newline where '{' or '[' follows ':'
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    // use a space after a colon
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    // begin formatting...
    if (typeof json !== 'string') {
        // make sure we start with the JSON as a string
        json = JSON.stringify(json);
    } else {
        // is already a string, so parse and re-stringify in order to remove extra whitespace
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }

    // add newline before and after curly braces
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');

    // add newline before and after square brackets
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');

    // add newline after comma
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');

    // remove multiple newlines
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');

    // remove newlines before commas
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');

    // optional formatting...
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    }

    $.each(json.split('\r\n'), function(index, node) {
        var i = 0,
            indent = 0,
            padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}
