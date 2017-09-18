/**
 * Created by xiajing on 2016/11/10.
 */
//204
export var userHttpUrl ='/managerUser';//login
export var queryHttpUrl ='/query';//概要信息
export var appVersionHttpUrl ='/appVersion';//原生版本管理
export var editHttpUrl ='/edit';//创建新版本
export var upResourceHttpUrl ='/appSourceUpload';//创建新版本
export var validateHttpUrl ='/validate';//创建新版本
export var downHttpUrl ='/downloadAppSource';//创建新版本
export var webSocketlogin ='/websocket';



//export var httpUrl ='http://192.168.6.52:8080/AppUpdate/managerUser';
//export var userHttpUrl ='http://192.168.6.52:8080/AppUpdate/managerUser';//login
//export var queryHttpUrl ='http://192.168.6.52:8080/AppUpdate/query';//概要信息
//export var appVersionHttpUrl ='http://192.168.6.52:8080/AppUpdate/appVersion';//原生版本管理
//export var editHttpUrl ='http://192.168.6.52:8080/AppUpdate/edit';//创建新版本
//export var upResourceHttpUrl ='http://192.168.6.52:8080/AppUpdate/appSourceUpload';//创建新版本
//export var validateHttpUrl ='http://192.168.6.52:8080/AppUpdate/validate';//创建新版本
//export var downHttpUrl ='http://192.168.6.52:8080/AppUpdate/downloadAppSource';//创建新版本

export var loginType = 1000;//登录 login
export var modifyPwd = 1002;//修改密码 modify password
export var outLogin = 1024;//退出  outLogin
export var summaryInfo = 1025;//概要信息 summaryInfo
export var nativeVersion = 1007;//原生版本管理  nativeVerManage
export var pageNum = 1;//当前页码
export var pageSize = 10;//每页显示的条数
export var resourceNum = 1010;//查询资源和应用统计信息
export var historyPvw = 1004;//历史版本浏览
export var historyType =1;//历史版本的type=1默认1004接口用
export var queryNewVersion = 1011;//初始化版本/获取版本信息
export var createNewVer = 1012;//创建新版本
export var queryUserManage =1027;//查询用户管理 query user manage
export var addUserManage = 1026;//新增用户 add user
export var queryConfigFile = 1015;//获取指定模块文件
export var delType = 2;//删除
export var model = 'main';//模块
export var delAppliactionVer = 1008;//删除应用版本
export var addAlllicationVer = 1009;//新增应用版本
export var typeZero = 0;
export var typeTwo = 2;
export var typeOne =1;
export var typeFive =5;
export var queryDir = 1014;//获取目录结构和图片列表
export var upFile = 1017;//上传
export var delLisIimg = 1029;//删除图片列表中的信息
export var updateConfig = 1016;//更新配置文件
export var fileImg = 1020; // 获取图片预览
export var upResourceFiled = 1019;//上传资源包
export var upAssignFile = 1017;//上传文件到指定路径
export var fetchSourceModule =1028;//获取资源文件模块列表验证/发布
export var verifyInfo = 1021;//校验
export var releaseInfo = 1022;//发布
export var previewInfo = 1023;//预览
export var downFile = 1005;//下载资源文件
export var configUpdate = 1030;
export var channelCode = 1032;//查询渠道号
export var channelAddOrDel = 1031;//添加或者删除渠道号
export var productTypeIOS = 1;//1：ios 2：android
export var productTypeAndroid = 2;
export var productTypeAll = 3;//苹果和安卓
export var productNone = 1033;//未发布的平台
export var summaryDel = 1013;//概要信息的删除
