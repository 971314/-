<template>
    <div class="panel panel-default allDivWidth" style="height: 417px;">
          <div class="panel-body">
               <div class="sucInfo outLine">
                 <span class="sucInfoImg"><img src="../../image/index/sucInfo.png"> </span> 您的申请已提交成功，我们会尽快为您办理
                   ，您可以到 <a   @click="back">出入金明细中</a>查看结果。
               </div>
           </div>
    </div>
</template>
<script>
    export default{
       methods:{
           back: function(){
//               router.go(window.history.back())
               router.go({path:'/main/detailBill'})
           }
       }
    }
</script>
