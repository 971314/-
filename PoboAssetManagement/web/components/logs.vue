<template>
    <div class="mask" v-bind:class="{show:showLog}">
        <div class="popup">
            <div class="con">
                <div v-for="a in logs"><span>{{a.time}}</span>{{a.record}}</div>
                <div v-if="logs.length==0" class="center">没有相关的操作记录</div>
            </div>
            <a class="icon close" v-on:click="showLog=false"></a>
        </div>
    </div>
</template>
<script>
     module.exports = {
         data(){
             return {
                 showLog:false,
                 logs:[]
             }
         },
         methods: {
             load (url, id) {
                 utils.post(url, {id}, res=>{
                     this.logs = res[0].records;
                     this.showLog = true;
                 })
             }   
         }
     }
</script>