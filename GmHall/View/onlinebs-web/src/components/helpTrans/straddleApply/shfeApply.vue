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
                    <td></td>
                    <td>一般月份</td>
                    <td>交割月份</td>
                </tr>
                <tr>
                    <td class="tdTitle">定义</td>
                    <td>铜、铝、锌、铅、螺纹钢、线材、黄金、白银、天然橡胶和石油沥青为自合约挂牌至交割月前第二月的最后一个交易日，
                        燃料油为自合约挂牌至交割月前第三月的最后一个交易日</td>
                    <td>铜、铝、锌、铅、螺纹钢、线材、黄金、白银、天然橡胶和石油沥青为交割月前第一月和交割月份，燃料油为交割月前第二月和交割月前第一月</td>
                </tr>
                <tr>
                    <td class="tdTitle">申请时效</td>
                    <td></td>
                    <td>套利所涉合约交割月前第二月的第一个交易日（燃料油为交割月前第三月的第一个交易日）至交割月前第一月的最后一个交易日（燃料油为交割月前第二月的最后一个交易日）之间提出</td>
                </tr>
                <tr>
                    <td class="tdTitle" rowspan="4">所需材料</td>
                    <td>（一）《上海期货交易所一般月份套利交易头寸申请（审批）表》；</td>
                    <td>（一）《上海期货交易所临近交割月份套利交易头寸申请（审批）表》；</td>
                </tr>
                <tr>
                    <td>（二）套利交易策略（包括资金来源和规模说明、跨期套利交易或者跨品种套利交易）；</td>
                    <td>（二）套利交易策略（包括资金来源和规模说明、跨期套利交易或者跨品种套利交易、建仓和减仓安排、交割意向等）；</td>
                </tr>
                <tr>
                    <td>（三）交易所要求的其他材料。</td>
                    <td>（三）申请合约价差偏离情况分析； </td>
                </tr>
                <tr>
                    <td> </td>
                    <td>（四）交易所要求的其他材料。</td>
                </tr>
                <tr>
                    <td  class="tdTitle">组合指令</td>
                    <td>无</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td class="tdTitle">保证金优惠</td>
                    <td>实行单向大边保证金制度</td>
                    <td>实行单向大边保证金制度</td>
                </tr>
                <tr>
                    <td class="tdTitle">有效期</td>
                    <td>获批的一般月份套利交易头寸对该申请品种一直有效</td>
                    <td></td>
                </tr>
                <tr>
                    <td  class="tdTitle">审批日期</td>
                    <td>5个交易日内</td>
                    <td>5个交易日内</td>
                </tr>
                <tr><td class="text-center" rowspan="3"> 单向大边保证金制度</td>
                    <td colspan="2">1. 同一交易编码、同一品种、买卖方向分别统计，收取保证金多的一边；不区分投保；</td>
                </tr>
                <tr>
                    <td colspan="2">2.最后交易日前（含最后交易日）5日内的合约交易中不参与优惠； </td>
                </tr>
                <tr>
                    <td colspan="2">3. 最后交易日前（含最后交易日）6日内的合约结算中不参与优惠。</td>
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