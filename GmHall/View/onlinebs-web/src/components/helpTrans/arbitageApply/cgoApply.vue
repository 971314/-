<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">套期保值服务</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo">
        <div class="panel-body">
            <table class="table table-bordered temp">
                <tbody>
                <tr><td colspan="3" class="text-center" nowrap=""> 所有品种 </td></tr>
                <tr>
                    <td class="tdTitle">项目</td>
                    <td>一般月份</td>
                    <td>交割月份</td>
                </tr>
                <tr>
                    <td class="tdTitle">使用时间</td>
                    <td>自合约挂牌至交割月前一个月第15个日历</td>
                    <td>交割月前一个月第16个日历日和至交割月份合约最后交易日</td>
                </tr>
                <tr>
                    <td class="tdTitle">申请时间</td>
                    <td>合约交割月前一个月的第5个日历日之前的交易日下午四点之前提出</td>
                    <td>合约交割月前二个月的第20个日历日至交割月前一个月第5个日历日下午四点之前提出</td>
                </tr>
                <tr>
                    <td class="tdTitle" rowspan="5">所需材料</td>
                    <td> <a href="http://itf.com.cn/uploadfile/2016/0718/20160718034145743.doc">1.《郑州商品交易所一般月份套期保值持仓额度申请（审批表》</a> </td>
                    <td> <a href="http://itf.com.cn/uploadfile/2016/0718/20160718034339463.doc">1.《郑州商品交易所临近交割月份套期保值持仓额度申请（审批）表》</a> </td>
                </tr>
                <tr>
                    <td> 2.企业营业执照副本（复印件）（年度首次申请套期保值额度）； </td>
                    <td > 2.企业营业执照副本（复印件）（年度首次申请套期保值额度）； </td>
                </tr>
                <tr>
                    <td><a href="http://itf.com.cn/uploadfile/2016/0719/20160719095911991.xlsx">3.《郑商所套保申请系统填写表格》；</a> </td>
                    <td >3.企业现货经营情况及套期保值交易方案 </td>
                </tr>
                <tr>
                    <td> </td>
                    <td >4.仓单或购销合同
                    </td>
                 </tr>
                <tr>
                    <td> </td>
                    <td ><a href="http://itf.com.cn/uploadfile/2016/0719/20160719095935285.xlsx">5.《郑商所套保申请系统填写表格》；</a> </td>
                </tr>
                <tr>
                    <td class="tdTitle">可否重复使用</td>
                    <td></td>
                    <td>自交割月第1个交易日起（含该日）不得重复使用</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import {flagLogin} from '../../../util/errorMsg.js'
    export default{
        ready:function(){
            flagLogin()//判断登录状态
        }
    }
</script>
