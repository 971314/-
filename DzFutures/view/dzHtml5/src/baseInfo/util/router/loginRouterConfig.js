/**
 * Created by xiajing on 2016/8/12.
 */
export default{
    childRoutes: [
        {
            path:'/',
            indexRoute: {component:require('../../components/login').default}//默认路由
        },
        {path:'registerStepOne', getComponents(location,callback){
            require.ensure([],(require) =>{
                callback(null,require('../../components/register/registerStepOne').default)
            })
          }
        },
        {path:'registerStepTwo',getComponents(loaction,callback){
            require.ensure([], (require) =>{
                callback(null,require('../../components/register/registerStepTwo').default)
            })
        }
        },
        //{path:'registerStepThree', getComponents(location, callback){
        //    require.ensure([],(require)=>{
        //        callback(require('../../components/register/registerStepThree').default)
        //    })
        // }
        //},
        {path:'registerStepThree', component:require('../../components/register/registerStepThree').default },
        {path:'registerStepFour', component:require('../../components/register/registerStepFour').default }
    ]
}