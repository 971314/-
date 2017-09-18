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
                <tr><td colspan="3" class="text-center" nowrap=""> 套期保值交易资格认定申请材料 </td></tr>
                <tr><td colspan="3" class="text-center" nowrap=""> （一）<a href="http://itf.com.cn/uploadfile/2016/0719/20160719100235810.docx">  套期保值交易资格申请表</a>，主要包括申请人基本信息、申请品种及交易所要求的其他信息； </td></tr>
                <tr><td colspan="3" class="text-center" nowrap=""> （二）  企业营业执照副本复印件； </td></tr>
                <tr><td colspan="3" class="text-center" nowrap=""> （三）  首次申请需要提交<a href="http://itf.com.cn/uploadfile/2016/0719/20160719100253963.doc">《承诺函》</a>，通过其它公司提交，我司无需再提交；  </td></tr>
                <tr><td colspan="3" class="text-center" nowrap=""> （四）  交易所要求的其他材料。 </td></tr>
                <tr><td colspan="3" class="text-center" nowrap=""> 所有品种 </td></tr>
                <tr>
                    <td class="tdTitle">项目</td>
                    <td>一般月份</td>
                    <td>交割月份</td>
                </tr>
                <tr>
                    <td class="tdTitle">申请时间</td>
                    <td>套期保值合约上市日起至交割月份前第二个月的最后交易日之前提出</td>
                    <td>套期保值合约交割月份前第一个月的第一个交易日至最后交易日之前提出</td>
                </tr>
                <tr>
                    <td class="tdTitle">使用时间</td>
                    <td>自合约上市之日起至交割月份前第一个月第九个交易日</td>
                    <td>交割月份前第一个月第十个交易日至交割月份</td>
                </tr>
                <tr>
                    <td class="tdTitle" rowspan="5">所需材料</td>
                    <td>（一）首次申请需要提交<a href="http://itf.com.cn/uploadfile/2016/0719/20160719100314326.doc">《承诺函》</a>，通过其它公司提交，我司无需再提交； </td>
                    <td>（一）首次申请需要提交<a href="http://itf.com.cn/uploadfile/2016/0719/20160719100418287.doc">《承诺函》</a>，通过其它公司提交，我司无需再提交； </td>
                </tr>
                <tr>
                    <td>（二）增加《套期保值持仓额度申请表》，主要包括申请人基本信息、申请品种和数量及交易所要求的其他信息。 </td>
                    <td>（二）增加《套期保值持仓额度申请表》，主要包括申请人基本信息、申请品种和数量及交易所要求的其他信息。 </td>
                </tr>
                <tr>
                    <td> （三）<a href="http://itf.com.cn/uploadfile/2016/0719/20160719100339739.docx">《企业现货经营业绩及计划》</a>；</td>
                    <td>（三）已持有的及拟持有的现货证明材料及用途说明； </td>
                </tr>
                <tr>
                    <td>（四）交易所要求的其他材料。 </td>
                    <td> （四）<a href="http://itf.com.cn/uploadfile/2016/0719/20160719100353232.docx">《企业现货经营业绩及计划》</a>；</td>
                </tr>
                <tr>
                    <td> </td>
                    <td>（五）交易所要求的其他材料。 </td>
                </tr>
                <tr>
                    <td class="tdTitle">自动获批</td>
                    <td></td>
                    <td>非期货公司会员和客户一般月份套期保值持仓进入交割月份时，交易所将按其一般月份套期保值持仓数量与该品种交割月份投机持仓限额中的较低标准，转化为交割月份套期保值持仓增加额度。</td>
                </tr>
                <tr>
                    <td class="tdTitle">可否重复使用</td>
                    <td>有效期内可重复使用</td>
                    <td>有效期内可重复使用</td>
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