<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">结算账户变更</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo">
        <div class="panel-body"  style="height: 428px;">
            敬请期待。。。。。
            <!--<table class="table table-bordered table-div" style="margin-top: 14px;">-->
                <!--<tr class="table-tr-bg tableTh">-->
                    <!--<th>银行名称</th>-->
                    <!--<th>银行账户</th>-->
                    <!--<th>状态</th>-->
                    <!--<th>备注</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr>-->
                    <!--<td>交通银行</td>-->
                    <!--<td>232222222222223332323</td>-->
                    <!--<td>已开通</td>-->
                    <!--<td>-->
                        <!--<button type="button" class="btn-style  btn-submit" data-toggle="button">删除</button>-->
                    <!--</td>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<td>交通银行</td>-->
                    <!--<td>232222222222223332323</td>-->
                    <!--<td>已开通</td>-->
                    <!--<td>-->
                        <!--<button type="button" class="btn-style  btn-submit" data-toggle="button">删除</button>-->
                    <!--</td>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<td>交通银行</td>-->
                    <!--<td>232222222222223332323</td>-->
                    <!--<td>已开通</td>-->
                    <!--<td>-->
                        <!--<button type="button" class="btn-style  btn-submit" data-toggle="button">删除</button>-->
                    <!--</td>-->
                <!--</tr>-->
                <!--</tbody>-->
            <!--</table>-->
            <!--<div class="addAccountBillInfo">-->
                <!--<button type="button" v-link="{path:'/changeValidity'}" class="btn-style  btn-submit addAccountFont" data-toggle="button" style="width:123px">添加结算账户</button>-->
            <!--</div>-->
        </div>
    </div>
    <div class="panel panel-default allDivWidth">
        <div class="panel-body panel-bgcolor">
            <p>业务须知：</p>
            <p>1、本业务暂时不支持线上办理。如需办理该业务，请到最近营业部办理。</p>
            <p>2、需本人签署《结算账户变更登记表》、银期协议等材料。</p>
            <p> 3、提供身份证银行卡复印件，银行卡扫描件（若是变更，旧卡的银期关系需先注销）。</p>
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