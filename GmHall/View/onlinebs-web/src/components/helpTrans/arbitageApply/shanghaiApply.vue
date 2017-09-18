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
                <tr><td colspan="3" class="text-center" nowrap=""> 铜、铝、锌、铅、镍、锡、螺纹钢、线材、热轧卷板、黄金、白银、天然橡胶和石油沥青 </td></tr>
                <tr>
                    <td class="tdTitle">项目</td>
                    <td style="width: 400px;">一般月份</td>
                    <td>临近交割月份</td>
                </tr>
                <tr>
                    <td class="tdTitle">申请时间</td>
                    <td>应当在该套期保值所涉合约交割月前第二月的最后一个交易日之前提出</td>
                    <td>交割月前第三月的第一个交易日至交割月前第一月的最后一个交易日之间提出</td>
                </tr>
                <tr>
                    <td class="tdTitle">使用时间</td>
                    <td>合约挂牌至交割月前第二月的最后一个交易日</td>
                    <td>交割月前第一月和交割月份</td>
                </tr>
                <tr>
                    <td class="tdTitle" rowspan="6">所需材料</td>
                    <td>1.<a href="http://itf.com.cn/uploadfile/2016/0719/20160719101006941.doc">《上海期货交易所一般月份套期保值交易头寸申请（审批）表》</a></td>
                    <td>1.<a href="http://itf.com.cn/uploadfile/2016/0719/20160719101022490.doc">《上海期货交易所临近交割月份套期保值交易头寸申请（审批）表》</a></td>
                </tr>
                <tr>
                    <td>2.企业营业执照副本复印件；(首次申请或变更需要提供)</td>
                    <td>2.企业营业执照副本复印件；(首次申请或变更需要提供)</td>
                </tr>
                <tr>
                    <td>3.上一年度现货经营业绩及当年或下一年度现货经营计划（可不提供）</td>
                    <td>3.上一年度现货经营业绩及当年或下一年度现货经营计划（可不提供）</td>
                </tr>
                <tr>
                    <td>4.与申请套期保值交易头寸相对应的购销合同、仓单或其他有效凭证；</td>
                    <td>4.与申请套期保值交易头寸相对应的购销合同、仓单或其他有效凭证；</td>
                </tr>
                <tr>
                    <td>5.套期保值交易方案（主要内容包括风险来源分析、保值目标、预期的交割或平仓的数量）；</td>
                    <td>5.套期保值交易方案（主要内容包括风险来源分析、保值目标、预期的交割或平仓的数量）；</td>
                </tr>
                <tr>
                    <td>6.交易所要求的其他证明材料。</td>
                    <td>6.交易所要求的其他证明材料。</td>
                </tr>
                <tr>
                    <td  class="tdTitle">自动获批</td>
                    <td></td>
                    <td>未获临近交割月份套期保值交易头寸的非期货公司会员或客户，其一般月份套期保值交易头寸在进入合约交割月前第一月和交割月份时，将参照已获一般月份套期保值交易头寸和该期货品种限仓制度规定额度中的较低标准执行，并按此标准转化为临近交割月份套期保值交易头寸。</td>
                </tr>
                <tr>
                    <td  class="tdTitle">可否重复使用</td>
                    <td></td>
                    <td>自交割月份第一交易日起不得重复使用</td>
                </tr>
                <tr><td colspan="3" class="text-center" nowrap=""> 燃料油</td></tr>
                <tr>
                    <td class="tdTitle">项目</td>
                    <td>一般月份</td>
                    <td>临近交割月份</td>
                </tr>
                <tr>
                    <td class="tdTitle">申请时间</td>
                    <td>应当在该套期保值所涉合约交割月前第三月的最后一个交易日之前提出</td>
                    <td>交割月前第四月的第一个交易日至交割月前第二月的最后一个交易日</td>
                </tr>
                <tr>
                    <td class="tdTitle">使用时间</td>
                    <td>合约挂牌至交割月前第三月的最后一个交易日</td>
                    <td>交割月前第二月和交割月前第一月</td>
                </tr>
                <tr>
                    <td class="tdTitle">所需材料</td>
                    <td>同上表</td>
                    <td>同上表</td>
                </tr>
                <tr>
                    <td class="tdTitle">自动获批</td>
                    <td></td>
                    <td>燃料油未获临近交割月份套期保值交易头寸的非期货公司会员或客户，其一般月份套期保值交易头寸在进入合约交割月前第二月和交割月前第一月时，将参照已获一般月份套期保值交易头寸和该期货品种限仓制度规定额度中的较低标准执行，并按此标准转化为临近交割月份套期保值交易头寸。</td>
                </tr>
                <tr>
                    <td class="tdTitle">可否重复使用</td>
                    <td></td>
                    <td>自交割月前第一月第一交易日起不得重复使用</td>
                </tr>
                <tr>
                    <td class="tdTitle">备注</td>
                    <td colspan="2">应当在该套期保值所涉合约最后交易日前第三个交易日收市前，按批准的交易部位和头寸建仓。</td>
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