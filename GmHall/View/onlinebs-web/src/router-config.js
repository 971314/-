/**
 * Created by xiajing on 2016/4/23.
 */
export function  configRouter(router) {
    router.map({
        '/':{
            component: require('./components/login.vue')
            //component: require('./components/publicMethod/fuwu.vue')

        },
        'main' :{
            component: require('./components/main.vue'),
            subRoutes: {
                '/' :{
                    component: require('./components/myInfo/myAccount.vue')
                },
                'myAccount' :{
                    component: require('./components/myInfo/myAccount.vue')
                },
                'bankFuture':{
                    component: require('./components/billManage/bankFuture.vue')
                },
                'futureBank':{
                    component: require('./components/billManage/futureBank.vue')
                },
                'linkManModify':{
                    component: require('./components/myInfo/linkManModify.vue')
                },
                'stepFirst':{
                    component: require('./components/myInfo/cardNoInfo/stepFirst.vue')
                },
                'stepTwo' : {
                    component: require('./components/myInfo/cardNoInfo/stepTwo.vue')
                },
                'stepThree' :{
                    component: require('./components/myInfo/cardNoInfo/stepThree.vue')
                },
                'comAdsChange':{
                    component: require('./components/myInfo/comAdsChange.vue')
                },
                'billAccountChange':{
                    component: require('./components/billManage/billAccountChange.vue')
                },
                'modifyPass': {
                    component: require('./components/myInfo/passManage/modifyPass.vue')
                },
                'detailBill':{
                    component: require('./components/billManage/detailBill.vue')
                },
                'limitCancel':{
                    component: require('./components/billManage/limitCancel.vue')
                },
                'accountActivat':{
                    component: require('./components/billManage/accountActivat.vue')
                },
                'switchTrans':{
                    component: require('./components/helpTrans/switchTrans.vue')
                },
                'changeValidity':{
                    component: require('./components/billManage/addBillAccount/changeValidity.vue')
                },
                'uploadPaperWork':{
                    component: require('./components/billManage/addBillAccount/uploadPaperWork.vue')
                },
                'singAgreement':{
                    component: require('./components/billManage/addBillAccount/singAgreement.vue')
                },
                'phoneConfirm':{
                    component: require('./components/billManage/addBillAccount/phoneConfirm.vue')
                },
                'arbitrageApply':{
                    component: require('./components/helpTrans/arbitrageApply.vue')
                },
                'pledgeService':{
                    component: require('./components/helpTrans/pledgeService.vue')
                },
                'straddleApply':{
                    component: require('./components/helpTrans/straddleApply.vue')
                },
                'businessSeq':{
                    component: require('./components/myInfo/searchMoreInfo/businessSeq.vue')
                },
                'leftMenu':{
                    component: require('./components/publicMethod/leftMenu.vue')
                },
                'curBusSearch':{
                    component: require('./components/myInfo/searchMoreInfo/curBusSearch.vue')
                },
                'chainApply' :{
                    component :require('./components/helpTrans/arbitageApply/chainApply.vue')
                },
                'cgoApply' :{
                    component :require('./components/helpTrans/arbitageApply/cgoApply.vue')
                },
                'daLianApply' :{
                    component :require('./components/helpTrans/arbitageApply/daLianApply.vue')
                },
                'shanghaiApply' :{
                    component :require('./components/helpTrans/arbitageApply/shanghaiApply.vue')
                },
                'decApply' :{
                    component :require('./components/helpTrans/straddleApply/decApply.vue')
                },
                'shfeApply' :{
                    component :require('./components/helpTrans/straddleApply/shfeApply.vue')
                },
                'cgoApplyStraddle' :{
                    component :require('./components/helpTrans/straddleApply/cgoApply.vue')
                },
                'capitalApply' :{
                    component :require('./components/helpTrans/straddleApply/capitalApply.vue')
                }
            }
        },
        'resetPassInfo' :{
            component: require('./components/myInfo/passManage/resetPassInfo.vue'),
            subRoutes:{
                '/' : {
                    component: require('./components/myInfo/passManage/resetPassOne.vue')
                },
                'resetPassTwo' : {
                    component: require('./components/myInfo/passManage/resetPassTwo.vue')
                },
                'resetPassThree' : {
                    component: require('./components/myInfo/passManage/resetPassThree.vue')
                }
            }
        }
    })
    //router.redirect({
    //    '*': '/'
    //})
}