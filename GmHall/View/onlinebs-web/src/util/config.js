/**
 * Created by xiajing on 2016/5/13.
 */
//声明变量
//export var  onlineGlobal ='https://pbnetserver.pobo.net.cn:8443/GmHall/hall';
//export var  onlineGlobalOne = 'https://pbnetserver.pobo.net.cn:8443/GmHall'

//export var  onlineGlobal ='http://pbnetserver.pobo.net.cn:8888/GmHall/hall';
//export var  onlineGlobalOne = 'http://pbnetserver.pobo.net.cn:8888/GmHall'

//测试站地址
//export var  onlineGlobal ='http://61.172.197.205:28080/GmHall/hall';
//export var  onlineGlobalOne = 'http://61.172.197.205:28080/GmHall'

//国贸内部测试站地址
//export var  onlineGlobal ='http://192.168.1.203:8080/GmHall/hall';
//export var  onlineGlobalOne = 'http://192.168.1.203:8080/GmHall'

//国贸的生产地址
export var  onlineGlobal ='http://110.87.99.2/GmHall/hall';
export var  onlineGlobalOne = 'http://110.87.99.2/GmHall';

//当日资金和五日明细
export var currentBill = 0;
export var fiveDayBill = 4;
//登录编码
export var loginCode = 6011;
export var loginType = 1;
//账户退出编码
export var outlogin = 1099;
export var outLoginType = 0;
//客户信息查询
export var customerInfo = 2001;
export var customerType = 2;
//客户流程办理进度查询
export var loadSearchCode = 2101;
//客户联系方式变更
export var linkModifyCode = 2110;
//客户通讯地址变更
export var infoAddressCode = 2111;
//客户交易系统切换
export var transSwitchCode = 2112;
//客户休眠账户激活
export var sleepAccountCode = 2113;
//客户身份证有效期变更
export var cardNoCode = 2114;
//客户密码重置
export var resetPassCode = 2115;
//资金明细
export var detailBill = 3001;
//业务流水
export var tranSeq = 1;
//正在办理的业务
export var loadTrans = 0;
//当日资金
export var currentMoneyInfo =6012;
//当日持仓
export var currentPosit =6014;
//当日委托
export var currentTrust = 6019;
//当日成交
export var curretnTrans =6013;
//修改密码
export var modifyPass = 6023;
//查询银行账号
export var searchCardNo = 6200;
//验证保底税取消权限
export var limitCancel = 2131;
//保底取消限制
export var saveLimitCancel = 2130;
//重置密码
export var resetPass = 2117;
//查询是否有取消休眠账户的权限
export var accountCancel = 2116;
//查询银行余额
export var bankBlance = 6203;
//证券（期货)转银行
export var  securityTurnBank = 6201;
//银行转证券
export var bankTurnSecurity = 6202;

//获取上传图片的格式
export function getFileType(filename){
    var extStart  = filename.lastIndexOf(".")+1;
    return filename.substring(extStart,filename.length).toUpperCase();
}
//图片限制格式
export var fileType  = ["JPG","GIF","PNG","BMP"];
//图片格式提示
export var fileTypeMsg ='请上传图片格式为：JPG、GIF、PNG、BMP的文件！';

//预登陆
export var prepareLoginType = 1001;
//检查登录状态
export var LoginState = 1002;
//校验验证码获取
export var  checkMsgCode =  1011;
//生成手机验证码
export var initMsgCode = 1012;
//校验断短信验证码是否正确
export var checkSendMsgCode = 1013;
//查询银证转账的流水
export var bankTransSeq = 6205;
//记录上次登录时间
export var lastLoginTimeCode = 2011;




