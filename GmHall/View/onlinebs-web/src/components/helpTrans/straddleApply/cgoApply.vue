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
                    <td class="tdTitle">套利持仓限仓 </td>
                    <td>
                        <p>1、客户所拥有的一般月份或交割月前一个月份投机持仓与套利持仓之和，不得超过同期投机持仓限仓标准的2倍，其中投机持仓不得超过相应投机持仓限仓标准。</p>
                        <p>2、客户所拥有的交割月份投机持仓与套利持仓之和，不得超过交割月投机持仓限仓标准。</p>
                    </td>
                </tr>
                <tr>
                    <td class="tdTitle">所需材料</td>
                    <td>无需申请</td>
                </tr>
                <tr>
                    <td class="tdTitle">组合指令</td>
                    <td>有</td>
                </tr>
                <tr>
                    <td class="tdTitle">保证金优惠</td>
                    <td>套利持仓交易保证金单边收取，按照套利持仓组合内交易保证金较高的合约收取；</td>
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