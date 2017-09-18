/**
 * Created by xiajing on 2016/8/23.
 */

export default{
    childRoutes: [
        {
            path:'/',
            indexRoute: {component:require('../../components/news/news-list').default}//默认路由
        },
    ]
}