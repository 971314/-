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
                    <td></td>
                    <td>产品额度</td>
                    <td>临近交割月份合约额度</td>
                </tr>
                <tr>
                    <td class="tdTitle">定义</td>
                    <td>同一产品各合约同一方向的套期保值最大持仓数量</td>
                    <td>采用实物交割方式产品的某一合约在临近交割月份某一方向的套期保值最大持仓数量</td>
                </tr>
                <tr>
                    <td class="tdTitle">申请时效</td>
                    <td>产品额度申请时间无限制，可随时申请。</td>
                    <td>合约交割月前两个月的第一个交易日至交割月前一个月下旬前的第五个交易日期间向交易所提出申请</td>
                </tr>
                <tr>
                    <td class="tdTitle">所需材料</td>
                    <td>
                        <p> 1、《中国金融期货交易所套期保值与套利额度申请表》；</p>
                        <p>
                            <a href="http://itf.com.cn/uploadfile/2016/0721/20160721101049664.docx">中国金融期货交易所套期保值与套利额度申请表（股指）.docx</a>
                        </p>
                        <p> <a href="http://itf.com.cn/uploadfile/2016/0721/20160721101117816.docx">中国金融期货交易所套期保值与套利额度申请表（国债）.docx</a></p>
                        <p> 2、身份证明文件（再次申请不需要提交）
                        <p> 自然人：身份证复印件（签字）</p>
                        <p>一般法人、特殊法人：组织机构代码证及营业执照复印件；</p>
                        <p> 3、套期保值方案（期货公司加盖公章，申请人签字或盖章）；套期保值交易方案内容包括但不限于：套期保值交易策略类型、资产规模与套期保值额度需求测算、交割月份额度管理、期现资产关联度分析等。</p>
                        <p>4、申请调整额度或续期时，应当提交前一阶段套期保值历史交易情况说明（期货公司加盖公章，申请人签字或盖章）；</p>
                        <p>5、资产证明材料（第三方出具并盖章，期货公司加盖公章）</p>
                        <p>6、期现匹配承诺函（首次申请股指期货套期保值额度）</p>
                        <p>7、交易所要求的其他材料。</p></td>
                    <td> <p>1、《中国金融期货交易所套期保值与套利额度申请表》；</p>
                        <p> <a href="http://itf.com.cn/uploadfile/2016/0721/20160721101135226.docx">中国金融期货交易所套期保值与套利额度申请表（股指）.docx</a></p>
                        <p> <a href="http://itf.com.cn/uploadfile/2016/0721/20160721101147277.docx">中国金融期货交易所套期保值与套利额度申请表（国债）.docx</a></p>
                        <p>  2、身份证明文件（再次申请不需要提交）</p>
                        <p>  自然人：身份证复印件（签字）</p>
                        <p>  一般法人、特殊法人：组织机构代码证及营业执照复印件；</p>
                        <p> 3、套期保值方案（期货公司加盖公章，申请人签字或盖章）；套期保值交易方案内容包括但不限于：套期保值交易策略类型、资产规模与套期保值额度需求测算、交割月份额度管理、期现资产关联度分析等。</p>
                        <p> 4、申请调整额度或续期时，应当提交前一阶段套期保值历史交易情况说明（期货公司加盖公章，申请人签字或盖章）；</p>
                        <p> 5、资产证明材料（第三方出具并盖章，期货公司加盖公章）</p>
                        <p> 6、期现匹配承诺函（首次申请股指期货套期保值额度）</p>
                        <p>7、交易所要求的其他材料。</p></td>
                </tr>
                <tr>
                    <td class="tdTitle">有效期</td>
                    <td>获批之日期12个月内有效，续期需要在有效期到期日前10个交易日之前提出申请</td>
                    <td>合约交割月前一个月下旬的第一个交易日至该合约最后交易日期间有效</td>
                </tr>
                <tr>
                    <td class="tdTitle">审批日期</td>
                    <td>5个交易日内</td>
                    <td>5个交易日内</td>
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