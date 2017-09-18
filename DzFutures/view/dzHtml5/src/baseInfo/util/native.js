/**
 * Created by xiajing on 2016/8/24.
 */
//获取原生设备的信息
//IP信息
export var devicdId = '127.0.0.1';//先给个默认值
//OS  系统名称
export var OS = 'IOS';
//version  版本号(1.0.0.0)
export var version = '1.0.1';
//orgNumber 券商编号
export var orgNumber = '789';

//存储信息
export function saveStorageInfo(userName,obj){
    if(window.pbEngine){
        pbEngine.storePrivateData(userName,JSON.stringify(obj));
    }else{
        sessionStorage.setItem(userName, JSON.stringify(obj))
    }
}

//获取保存的信息
export function getStorageInfo(userName){
    if(window.pbEngine){
       return pbEngine.getPrivateData(userName)
    }else{
       return  sessionStorage.getItem(userName)
    }
}

//获取原生首页3合约配置文件
export function homeThreeInfo(){
    if(window.pbEngine){
      return  pbEngine.readConfig('PbHomeThreeContracts.json');
    }
}

//原生的回调方法
export function callback(message){
    return message;
}
//调用原生转圈圈的展示方法
export function showCircleView(name){
    if(window.pbEngine) {
      return  pbEngine.showCircleView('Pbkey_Default_Circle',JSON.stringify({'Pbkey_Circle_MSG': name}))
    }
}
//调取原生转圈圈的消失方法
export function hideCircleView(){
    if(window.pbEngine){
       return pbEngine.hideCircleView('Pbkey_Default_Circle')
    }
}

//获取原生的设备信息
export function getDeviceJsonInfo(){
    if(window.pbEngine){
        var deviceInfo  = pbEngine.getDeviceJsonInfo();
        if (deviceInfo) {
            var deviceData = JSON.parse(deviceInfo);
            if (deviceData['71']) {
                devicdId = deviceData['71'];  //客户端本机ip地址
            }
            if(deviceData['255']){
                var platNum = deviceData['255'];
                if(platNum == '2'){
                    OS = 'IOS';
                }else{
                    OS = 'Android';
                }
            }
            if (deviceData['73']) {
                version = deviceData['73'];  //版本号
            }
            if (deviceData['jgid']) {
                orgNumber = deviceData['jgid'];  //机构代码/券商编号
            }
        }
    }
}

//原生登录或者注册成功之后调用的方法并传的参数
export function getSendMessageToNative(obj){
    if(window.pbEngine){
      return  pbEngine.sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(obj));
    }
}

//退出登录到app的首页
export function storePublicData(value){
    if(window.pbEngine){
        return pbEngine.storePublicData('PbKey_Home_Verify',value);
    }
}

//获取认证的信息 手机号
export function getAppCertifyInfo(){
    if(window.pbEngine){
        return  pbEngine.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName')
    }
}

//获取认证的信息 token
export function getAppToken(){
    if(window.pbEngine){
        return  pbEngine.getAppCertifyInfo('PbKey_H5_Home_Auth_Token')
    }
}

//获取认证的信息 userId
export function getAppUserId(){
    if(window.pbEngine){
        return  pbEngine.getAppCertifyInfo('PbKey_H5_Home_Auth_UserId')
    }
}
//获取东证公告的新闻组号：511701
export function getDzNewList(){
    if(window.pbEngine){
        var newsListData = {type: 'mu', groupIDs: ['511701'], doc: 'json', count: '10'};
        return  pbEngine.queryInfoListWithJson(JSON.stringify(newsListData));
    }
}




