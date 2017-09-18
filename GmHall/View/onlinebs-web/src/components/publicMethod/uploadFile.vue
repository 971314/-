<template>
    <div class="divCardImgOne">
        <img  :src="cardFront"  class="cardFront">
        <!--   <img src="../../../image/index/cardFront.png" class="cardFront"> -->
    </div>
    <div class="divCardImgTwo">
        <img :src="cardUnfront" class="cardFront">
    </div>
    <div class="uploadDiv">
         <span class="spanCardOne">
             <input type="file" class="upFile" @change="uploadCardFront" id="cardFront">
             <button type="button" style="margin-top: -50px;" class="btn-style uploadBtn btn-submit"  data-toggle="button">上传</button>
         </span>
         <span class="spanCardUploadTwo">
           <input type="file"  class="upFile" @change="uploadCardUnFront" id="cardUnFront">

           <button type="button" class="btn-style uploadBtn  btn-submit"  style="margin-top: -55px;" data-toggle="button">上传</button>
         </span>
    </div>
</template>
<script>
    export default{
        data:function(){
        return{
            cardFronts:'',
            cardUnFronts:'',
            cardFront: './dist/image/index/cardFront.png',
            cardUnfront: './dist/image/index/cardFront.png',
            props:['cardFront','cardUnfront']

        }
    },
    methods:{
        //上传身份证正面
        uploadCardFront:function(e){
            this.errorMsg =""
            var _this=this;
            var file=e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                _this.cardFront = e.target.result;
            }
        },
        //上传身份证反面
        uploadCardUnFront:function(e){
            this.errorMsg =""
            var _this=this;
            var file=e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                _this.cardUnfront = e.target.result;
            }
        },
    },

    }
</script>