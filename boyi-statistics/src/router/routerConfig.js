/**
 * Created by xiajing on 2016/10/31.
 */
export default  [
        {path:'/',indexRoute:{component:require('../component/login.jsx').default}},//默认路由
        {path:'index',component:require('../component/index.jsx').default,
           childRoutes:[
               {path:'/outline',component:require('../component/outline.jsx').default},
               {path:'/historical',component:require('../component/historical.jsx').default},
               {path:'/details',component:require('../component/details.jsx').default},
               {path:'/version',component:require('../component/version.jsx').default}
           ]
        }
]
