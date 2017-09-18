/**
 * Created by xiajing on 2016/10/31.
 */
import {getStorage} from '../util/storageData.js';
const checkStatus = (nextState, replace,next) =>{
    var tokenInfo = getStorage("tokenInfo");
    if(tokenInfo) {
        next()//如果有值直接下一步
    }else{
        replace("/")//如果token信息为空就直接到登录页面
        next();
    }
}
export default[
        { path:'/',indexRoute:{component:require('../component/login.jsx').default}},//默认路由
        {
            path:'index',onEnter:checkStatus, component:require('../component/index.jsx').default,//首页主页面
            childRoutes:[
                {
                    path:'/summaryInfo',onEnter:checkStatus, component:require('../component/summaryInfo/summaryInfo.jsx').default
                },
                {
                    path:'/appConfig/:id',onEnter:checkStatus,component:require('../component/appConfig/appConfig.jsx').default
                },
                {
                    path:'/indexEdit/:id',onEnter:checkStatus,component:require('../component/edit/indexEdit.jsx').default
                },
                {
                    path:'/nativeVerManage',onEnter:checkStatus,component:require('../component/version/nativeVerManage.jsx').default
                },
                {
                    path:'/historyVerPvw',onEnter:checkStatus,component:require("../component/version/historyVerPvw.jsx").default
                },
                {
                    path:'/historyPvw/:id',onEnter:checkStatus,component:require('../component/version/historyPvw.jsx').default
                },
                {
                    path:'/platFormEdit/:id',onEnter:checkStatus,component:require('../component/edit/platformEdit.jsx').default
                },
                {
                    path:'/InitNewVersion',onEnter:checkStatus,component:require('../component/version/initNewVersion.jsx').default
                },
                {
                    path:'/VerifyRelease/:id',onEnter:checkStatus,component:require('../component/edit/verifyRelease.jsx').default
                },
                {
                    path:'/VerifyUserManage',onEnter:checkStatus,component:require('../component/version/verifyUserManage.jsx').default
                },
                {
                    path:'/channelManage',  onEnter:checkStatus,component:require('../component/version/channelManage.jsx').default
                },
                {
                    path:'/EditType/:id',onEnter:checkStatus,component:require('../component/edit/editType.jsx').default
                },
                {
                    path:'/ResourceEdit/:id',onEnter:checkStatus,component:require('../component/edit/resourceEdit.jsx').default
                },
                {
                    path:'/ModifyPwd/:id',onEnter:checkStatus,component:require('../component/edit/modifyPwd.jsx').default
                }
            ]
        }
]