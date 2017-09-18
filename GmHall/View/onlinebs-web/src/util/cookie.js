/**
 * Created by xiajing on 2016/7/28.
 */
//存信息
export function setCookie(cname,cvalue,exdays){
    var date=new Date();
    date.setTime(date.getTime()+ 30*60*1000); //设置date为当前时间+30分
    var expires="expires="+date.toGMTString(); //将date赋值给expires
    document.cookie = cname+"="+cvalue+"; "+expires;
}
//获取缓存的信息
export function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}
//清空所有cookie
export function clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
}
//初始化虚拟键盘
export function initKeyBoard(){
        $('#passWord').keyboard();
}