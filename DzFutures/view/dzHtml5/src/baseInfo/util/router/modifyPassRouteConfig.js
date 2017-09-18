/**
 * Created by xiajing on 2016/8/23.
 */

export default{
    childRoutes: [
        {
            path:'/',
            indexRoute: {component:require('../../components/modifyPass/modifyPassOne').default}//默认路由
        },
        {path:'modifyPassTwo', component:require('../../components/modifyPass/modifyPassTwo').default },
    ]
}