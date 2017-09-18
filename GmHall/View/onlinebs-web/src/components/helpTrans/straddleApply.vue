<template>
    <div class="panel panel-default top10 titleWidth">
        <div class="panel-body panel-title" >
            <img src="../../image/index/round.png" class="round-icon"><span class="round-title">套利服务</span>
        </div>
    </div>
    <div class="panel panel-default allDivWidth linkmanInfo" style="height: 428px;">
        <div class="panel-body">
            <div class="arbitDiv">
                <ul class="arbitApplyDetail">
                    <li>
                        <a v-link="{path:'/main/decApply'}">大商所套利额度申请</a>
                        <span>2016-07-21</span>
                    </li>
                    <li>
                        <a v-link="{path:'/main/cgoApplyStraddle'}">郑商所套利额度申请</a>
                        <span>2016-07-21</span>
                    </li>
                    <li>
                        <a v-link="{path:'/main/shfeApply'}">上期所套利额度申请</a>
                        <span>2016-07-21</span>
                    </li>
                    <li>
                        <a v-link="{path:'/main/capitalApply'}">中金所套利额度申请</a>
                        <span>2016-07-21</span>
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