<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">仓单服务</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo" style="height: 267px;">
        <div class="panel-body">
            <p>1、	服务内容：仓单注册、仓单转让、期转现、仓单注销/提货。</p>
            <p>2、	仓单注册：填写《仓单交割预报表》并提交给期货公司→期货公司受理→按《入库通知单》要求完成货品入库，并交纳相关费用→仓库入库确认→交易所确认→仓库<br/>
                    仓单申请确认→期货公司确认→交易所审批→注册仓单成功。</p>
            <p>3、	仓单转让：填写《仓单转让授权书》并提交给期货公司→期货公司受理。</p>
            <p>4、	期转现：在申请日之前建立对应方向的仓位→填写《期转现授权委托书》并提交给期货公司→期货公司受理→申请日期转现对应仓位做平仓处理→下一交易日划转货款→办理交割发票相关事宜。</p>
            <p>5、	仓单注销/提货：填写《仓单注销授权书》并提交给期货公司→期货公司受理→注销仓单成功→凭《提货通知单》提货。</p>
        </div>
    </div>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">质押服务</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo" style="height: 428px;">
        <div class="panel-body">
            <p>1、	服务内容：有价证券（仓单）充抵/解除充抵保证金。</p>
            <p>2、	流程：授权期货公司办理有价证券充抵业务→期货公司受理→充抵成功后当日结算时生效。</p>
        </div>
    </div>
</template>
<script>
    import {flagLogin} from '../../util/errorMsg.js'
    export default{
        ready:function(){
            flagLogin()//判断登录状态
        }
    }
</script>