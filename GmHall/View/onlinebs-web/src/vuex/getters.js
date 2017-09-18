/**
 * Created by xiajing on 2016/4/29.
 */
export function getTransSeqData(state){
        return state.transSeqData;
}
//账户基本信息
export function getBaseInfo(state){
        return state.baseInfo; 
}
//获取当日资金明细
export function getDetailInfo(state){
        return state.detailInfo
}
//获取5天的资金明细
export function getFiveDayInfo(state){
        return state.fiveDayInfo
}
//保存重置密码的信息
export function getSaveInfo(state){
        return state.saveInfo
}
//业务流水 首页中
export function getTransSeq(state){
        return state.transSeq
}
//首页正在办理的业务流水 前5条数据
export function getFiveLoadTrans(state){
        return state.loadFiveTrans
}
//首页正在办理的业务流水
export function getLoadTrans(state){
        return state.loadTrans
}
//当日资金查询
export function getCurrentBill(state){
        return state.currentBill
}
//当日持仓查询
export function getCurrentPosit(state){
        return state.currentPosit
}
//当日委托查询
export function getCurrentTrust(state){
        return state.currentTrust
}
//当日成交查询
export function getCurrentTrans(state){
        return state.currentTrans
}
//结算账户变更查询的列表
export function getBillAccountChange(state){
        return state.billAccountChange
}
//查询银行账号
export function getFundCardIno(state){
        return state.searchBillNo
}
//取出业务流水的前5条数据
export function getFiveTransSeq(state){
        return state.fiveTransSeq
}
//取出业务流水的总记录数
export function getNumSizeTransSeq(state){
        return state.numSizeTransSeq
}
//取出正在办理的总记录数
export function getNumSizeLoadTrans(state){
        return state.numSizeLoadTrans
}
//获取5当日持仓查询
export function getFiveCurrentPosit(state){
        return state.fiveCurrentPosit
}
//获取5当日委托查询
export function getFiveCurrentTrust(state){
        return state.fiveCurrentTrust
}
//获取5当日成交查询
export function getFiveCurrentTrans(state){
        return state.fiveCurrentTrans
}