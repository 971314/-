/**
 * Created by xiajing on 2016/7/28.
 */
//����Ϣ
export function setCookie(cname,cvalue,exdays){
    var date=new Date();
    date.setTime(date.getTime()+ 30*60*1000); //����dateΪ��ǰʱ��+30��
    var expires="expires="+date.toGMTString(); //��date��ֵ��expires
    document.cookie = cname+"="+cvalue+"; "+expires;
}
//��ȡ�������Ϣ
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
//�������cookie
export function clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
}
//��ʼ���������
export function initKeyBoard(){
        $('#passWord').keyboard();
}