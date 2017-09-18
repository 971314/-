/**
 * Created by xiajing on 2016/8/29.
 */
module.exports = {
    //获取地址栏的url参数
     GetUrlArgStr(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
     }
}