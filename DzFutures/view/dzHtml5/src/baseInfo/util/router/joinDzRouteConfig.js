/**
 * Created by xiajing on 2016/8/23.
 */

export default{
    childRoutes: [
        {
            path:'/',
            indexRoute: {component:require('../../components/myInfo/joinDZ').default}//默认路由
        },
        {path:'applyStepOne', component:require('../../components/applyAgent/applyStepOne').default },
        {path:'applyStepTwo', component:require('../../components/applyAgent/applyStepTwo').default },
        {path:'applyStepThree', component:require('../../components/applyAgent/applyStepThree').default },
        {path:'applyBillStepOne', component:require('../../components/applyBillPeople/applyStepOne').default },
        {path:'applyBillStepTwo', component:require('../../components/applyBillPeople/applyStepTwo').default },
        {path:'applyBillStepThree', component:require('../../components/applyBillPeople/applyStepThree').default },
    ]
}