<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">套期保值服务</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo" style="height: 428px;">
        <div class="panel-body">
            <div class="arbitDiv">
                <ul class="arbitApplyDetail">
                    <li>
                        <a v-link="{path:'/main/chainApply'}">中国金融期货交易所套保额度申请</a>
                        <span>2016-07-21</span>
                    </li>
                    <li>
                        <a v-link="{path:'/main/cgoApply'}">郑州商品期货交易所套期保值申请</a>
                        <span>2016-04-20</span>
                    </li>
                    <li>
                        <a v-link="{path:'/main/daLianApply'}">大连商品期货交易所套期保值申请</a>
                        <span>2016-04-20</span>
                    </li>
                    <li>
                        <a v-link="{path:'/main/shanghaiApply'}">上海期货交易所套期保值申请</a>
                        <span>2016-04-18</span>
                    </li>
                </ul>
            </div>
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