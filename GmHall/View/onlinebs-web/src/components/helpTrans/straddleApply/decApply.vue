<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../../image/index/round.png" class="round-icon"><span class="round-title">套利服务</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo">
        <div class="panel-body">
            <table class="table table-bordered temp">
                <tbody>
                <tr><td colspan="3" class="text-center" nowrap=""> 所有品种 </td></tr>
                <tr>
                    <td > </td>
                    <td>一般月份</td>
                    <td>交割月份</td>
                </tr>
                <tr>
                    <td class="tdTitle">定义</td>
                    <td>自合约上市之日起至交割月份前第一个月最后一个交易日</td>
                    <td>交割月份</td>
                </tr>
                <tr>
                    <td class="tdTitle">申请截止日</td>
                    <td></td>
                    <td>套利持仓中近月合约交割月份前第一个月的最后交易日</td>
                </tr>
                <tr>
                    <td class="tdTitle" rowspan="3">所需材料</td>
                    <td> （一）增加套利持仓额度申请表，主要包括申请人基本信息、申请品种、数量，套利交易策略及交易所要求的其他信息；</td>
                    <td> （一）增加套利持仓额度申请表，主要包括申请人基本信息、申请品种、合约、数量，套利交易策略及交易所要求的其他信息； </td>
                </tr>
                <tr>
                    <td> （二）交易所要求的其他材料。 </td>
                    <td > （二）申请合约价差偏离情况分析； </td>
                </tr>
                <tr>
                    <td>  </td>
                    <td>（三）交易所要求的其他材料。</td>
                </tr>
                <tr>
                    <td class="tdTitle">组合指令 </td>
                    <td >有 </td>
                    <td >有 </td>
                 </tr>
                <tr>
                    <td class="tdTitle">保证金优惠</td>
                    <td>套利持仓交易保证金单边收取，按照套利持仓组合内交易保证金较高的合约收取</td>
                    <td>套利持仓交易保证金单边收取，按照套利持仓组合内交易保证金较高的合约收取</td>
                </tr>
                <tr>
                    <td class="tdTitle">审批日期</td>
                    <td>5个工作日内</td>
                    <td>套利持仓近月合约交割月前第一个月的第一个交易日起进行审核，并在5个交易日内</td>
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