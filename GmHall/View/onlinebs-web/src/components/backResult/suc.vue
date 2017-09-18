<template>
    <div class="panel panel-default allDivWidth" style="height: 417px;">
          <div class="panel-body">
               <div class="sucInfo out">
                 <span class="sucInfoImg"><img src="../../image/index/sucInfo.png"> </span> 您的申请已提交成功，我们会尽快为您办理！
                   <!--<a href="../../../dist/components/index.html">返回首页>></a>-->
                   <a   @click="back">返回首页>></a>
               </div>
           </div>
    </div>
</template>
<script>
    export default{
       methods:{
           back: function(){
//               router.go(window.history.back())
               router.go({path:'/main/'})
           }
       }
    }
</script>
