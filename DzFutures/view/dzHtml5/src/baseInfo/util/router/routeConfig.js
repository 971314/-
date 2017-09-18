/**
 * Created by xiajing on 2016/8/12.
 */

export default{
    childRoutes: [
        {
            path:'/',
            indexRoute: {component:require('../../components/register/registerStepOne').default}//默认路由
        },
        {path:'login', component:require('../../components/login').default },
        {path:'registerStepOne', component:require('../../components/register/registerStepOne').default },
        {path:'registerStepTwo', component:require('../../components/register/registerStepTwo').default },
        {path:'registerStepThree', component:require('../../components/register/registerStepThree').default },
        {path:'registerStepFour', component:require('../../components/register/registerStepFour').default },
    ]
}