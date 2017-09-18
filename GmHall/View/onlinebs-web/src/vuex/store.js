/**
 * Created by xiajing on 2016/4/29.
 */
import Vue from 'vue'
import Vuex from 'vuex' 


Vue.use(Vuex)
//应用初始化状态  存放数据
const state = {
    baseInfo: {},
    transSeqData:{},
    detailInfo:{},
    fiveDayInfo:{},
    saveInfo:{},
    transSeq:{ },
    loadTrans:{},
    //前5条的数据
    loadFiveTrans:{},
    currentBill:{},
    currentPosit:{},
    currentTrust:{},
    currentTrans:{},
    fiveCurrentPosit:{},
    fiveCurrentTrust:{},
    fiveCurrentTrans:{},
    billAccountChange:{},
    searchBillNo:{},
    //业务流水
    fiveTransSeq:{},
    //业务流水的总记录数
    numSizeTransSeq:"",
    //正在办理的总记录数
    numSizeLoadTrans:""
}
//定义所需的Mutations
const mutations  = {
    //获取列表信息  并存放给state
    //查询账户的基本信息
    MY_INFO_LIST (state, data){
        state.baseInfo = data
    },
    //业务流水
    TRANS_SEQ_INFO(state, data){ 
        state.transSeqData = data
    },
    //获取当日资金明细
    DETAIL_INFO(state, data){
        state.detailInfo = data
    },
    //获取5天的资金明细
    FIVE_DAY_INFO(state, data){
      state.fiveDayInfo = data
    },
    //保存重置密码的信息
    SVAE_INFO(state, data){
        state.saveInfo = data
    },
    //获取首页中的业务流水信息
    TRANS_SEQ(state, data){
        console.log( data.data)
        state.transSeq = data
   },

//获取业务流水的所有记录数
    NUM_SIZE_TRANS_SEQ(state, data){
        let num =  data.data.length;
        state.numSizeTransSeq = num;
    },
//获取首页正在办理的所有记录数
    NUM_SIZE_LOAD_TRANS(state, data){
        let num =  data.data.length;
        state.numSizeLoadTrans = num;
    },
    //取出业务流出返回的前5条数据
    FIVE_TRANS_SEQ(state,data){
        //这里首先取出返回数据的前五条
        var transSeqArray = [];
        var transObj = {};
        for(let i=0;i<data.data.length;i++){
            if(i == 0 ){transSeqArray.push(data.data[0])}
            if(i == 1 ){transSeqArray.push(data.data[1])}
            if(i == 2 ){transSeqArray.push(data.data[2])}
            if(i == 3 ){transSeqArray.push(data.data[3])}
            if(i == 4 ){transSeqArray.push(data.data[4])}
        }
        transObj.transSeqArray = transSeqArray;
        state.fiveTransSeq = transObj;
    },
    //取出业务流出返回的前5条数据
    FIVE_LOAD_TRANS(state,data){
        //这里首先取出返回数据的前五条
        var transSeqArray = [];
        var transObj = {};
        for(let i=0;i<data.data.length;i++){
            if(i == 0 ){transSeqArray.push(data.data[0])}
            if(i == 1 ){transSeqArray.push(data.data[1])}
            if(i == 2 ){transSeqArray.push(data.data[2])}
            if(i == 3 ){transSeqArray.push(data.data[3])}
            if(i == 4 ){transSeqArray.push(data.data[4])}
        }
        transObj.transSeqArray = transSeqArray;
        state.loadFiveTrans = transObj;
    },
   //获取首页中 正在办理的业务流水
    LOAD_TRANS(state, data){
        state.loadTrans = data
    },
    //当日资金
    CURRENT_BILL(state, data){
        state.currentBill = data
    },
    //当日持仓
    CURRENT_POSIT(state, data){
        state.currentPosit = data
    },
    //当日委托
    CURRENT_TRUST(state, data){
        state.currentTrust = data
    },
    //当日成交
    CURRENT_TRANS(state, data){
        console.log(data.data)
        //alert(data.data[0]['114'])
        //alert(data.data[0]['116'])
        state.currentTrans = data
    },
    //获取前5天当日持仓
    FIVE_CURRENT_POSIT(state, data){
        //这里首先取出返回数据的前五条
        var transSeqArray = [];
        var transObj = {};
        for(let i=0;i<data.data.length;i++){
            if(i == 0 ){transSeqArray.push(data.data[0])}
            if(i == 1 ){transSeqArray.push(data.data[1])}
            if(i == 2 ){transSeqArray.push(data.data[2])}
            if(i == 3 ){transSeqArray.push(data.data[3])}
            if(i == 4 ){transSeqArray.push(data.data[4])}
        }
        transObj.transSeqArray = transSeqArray;
        state.fiveCurrentPosit = transObj
    },
    //获取前5天当日委托
    FIVE_CURRENT_TRUST(state, data){
        //这里首先取出返回数据的前五条
        var transSeqArray = [];
        var transObj = {};
        for(let i=0;i<data.data.length;i++){
            if(i == 0 ){transSeqArray.push(data.data[0])}
            if(i == 1 ){transSeqArray.push(data.data[1])}
            if(i == 2 ){transSeqArray.push(data.data[2])}
            if(i == 3 ){transSeqArray.push(data.data[3])}
            if(i == 4 ){transSeqArray.push(data.data[4])}
        }
        transObj.transSeqArray = transSeqArray;
        state.fiveCurrentTrust = transObj
    },
    //获取前5天当日成交
    FIVE_CURRENT_TRANS(state, data){
        //这里首先取出返回数据的前五条
        var transSeqArray = [];
        var transObj = {};
        for(let i=0;i<data.data.length;i++){
            if(i == 0 ){transSeqArray.push(data.data[0])}
            if(i == 1 ){transSeqArray.push(data.data[1])}
            if(i == 2 ){transSeqArray.push(data.data[2])}
            if(i == 3 ){transSeqArray.push(data.data[3])}
            if(i == 4 ){transSeqArray.push(data.data[4])}
        }
        transObj.transSeqArray = transSeqArray;
        console.log(transObj)
        state.fiveCurrentTrans = transObj
    },
    //结算账户变更的列表信息
    BILL_ACCOUNT_CHANGE(state, data){
        state.billAccountChange = data
    },
    //查询银行账号
    SEARCH_CARD_NO(state, data){
        state.searchBillNo = data
    }
}

//创建store实例
export default new Vuex.Store({
    state,
    mutations,
})
