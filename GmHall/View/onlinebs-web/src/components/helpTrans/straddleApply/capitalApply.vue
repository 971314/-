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
                    <td>产品额度</td>
                    <td>临近交割月份合约额度（国债）</td>
                </tr>
                <tr>
                    <td class="tdTitle">定义</td>
                    <td>同一产品各合约同一方向的套利最大持仓数量</td>
                    <td>采用实物交割方式产品的某一合约在临近交割月份某一方向的套利最大持仓数量</td>
                </tr>
                <tr>
                    <td class="tdTitle" rowspan="5">所需材料</td>
                    <td>1、《中国金融期货交易所套期保值与套利额度申请表》；</td>
                    <td>1、《中国金融期货交易所套期保值与套利额度申请表》；</td>
                </tr>
                <tr>
                    <td><p>2、身份证明文件（再次申请不需要提交）</p>
                        <p>自然人：身份证复印件（签字）</p>
                        <p>一般法人、特殊法人：组织机构代码证及营业执照复印件；</p></td>
                    <td><p>2、身份证明文件（再次申请不需要提交）</p>
                        <p>自然人：身份证复印件（签字）</p>
                        <p>一般法人、特殊法人：组织机构代码证及营业执照复印件；</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>3、套利交易方案（期货公司加盖公章，申请人签字或盖章）； </p>
                        <p>套利交易方案内容包括但不限于：套利交易策略、资产规模与套利额度需求测算、交割月份额度管理、交易系统情况等。</p>
                    </td>
                    <td>
                        <p>3、套利交易方案（期货公司加盖公章，申请人签字或盖章）； </p>
                        <p>套利交易方案内容包括但不限于：套利交易策略、资产规模与套利额度需求测算、交割月份额度管理、交易系统情况等。</p>
                    </td>
                </tr>
                <tr>
                    <td>4、申请调整额度或续期时，应当提交前一阶段套利历史交易情况说明（期货公司加盖公章，申请人签字或盖章）； </td>
                    <td>4、申请调整额度或续期时，应当提交前一阶段套利历史交易情况说明（期货公司加盖公章，申请人签字或盖章）；</td>
                </tr>
                <tr>
                    <td>5、交易所要求的其他材料。 </td>
                    <td>5、交易所要求的其他材料。</td>
                </tr>
                <tr>
                    <td  class="tdTitle">组合指令</td>
                    <td>无</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td class="tdTitle">保证金优惠</td>
                    <td>实行单向大边制度</td>
                    <td>实行单向大边制度</td>
                </tr>
                <tr>
                    <td class="tdTitle">有效期</td>
                    <td>获批之日期12个月内有效，续期需要在有效期到</td>
                    <td>合约交割月前一个月下旬的第一个交易日至该合约最后交易日期间有效</td>
                </tr>
                <tr>
                    <td  class="tdTitle" rowspan="2">审批日期</td>
                    <td>期日前10个交易日之前提出申请</td>
                    <td>5个交易日内 </td>
                </tr>
                <tr>
                    <td> </td>
                    <td>5个交易日内 </td>
                </tr>
                <tr><td class="text-center"> 单向大边保证金制度</td>
                    <td colspan="2">同一客户在同一会员处的同品种双向持仓（实物交割合约在交割月份前一交易日收盘后除外）,按照交易保证金单边较大者进行收取</td>
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