/**
 * Created by xiajing on 2016/9/21.
 */
export function  configRouter(router) {
    router.map({
        '/': {
            component: require('./component/login.vue')
        },
        'orgManageList':{
            component: require('./component/orgManageList.vue')
        },
        'detailOrgInfo':{
            component: require('./component/detailOrgInfo.vue')
        },
        'orgDetailManageList':{
            component: require('./component/orgDetailManageList.vue')
        }
    })
    //router.beforeEach(function(transition) {
    //    if (transition.to.path === '/orgManageList') {
    //        router.app.authenticating = true
    //    } else {
    //        transition.next()
    //    }
    //})
}
