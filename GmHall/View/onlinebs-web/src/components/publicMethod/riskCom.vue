<template>
    <div>
        <div class="risk">
            <!--<input type="checkbox" @click="validClick">-->
            <img :src="orValidSrc" class="validInfo" @click="readClick">
            <a @click="riskClick">{{msgTip}} </a>
            <ul style="margin-top: 10px;"><li><span id="readCheckedMsg" class="error-msg text-align"></span></li></ul>
        </div>

        <div class="modal fade modal-top" id="riskComModal" tabindex="-1" role="dialog" style="top:217px"
             aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title text-center" id="myModalLabel">
                            风险揭示
                        </h3>
                    </div>
                    <div class="modal-body" style="text-indent: 2em; height: 413px; overflow-y: auto;">

                        <component :is="riskContent"  keep-alive></component>

                    </div>
                    <div class="modal-footer rsikfooter" style="text-align: center">
                        <button type="button" class="btn-style  btn-submit textindent"
                                data-dismiss="modal">确定
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import valid from '../../image/valid.png';
    import orvalid from '../../image/orvalid.png';
    import mobileChange from './mobileChange.vue';
    import postAddress from './postAddress.vue';
    import idCard from './idCard.vue';
    import ctpUse from './ctpUse.vue';

    export default{
        props: ['readChecked','riskContent','msgTip'],
        computed: {
            //利用vue 中的computed 计算函数处理是否显示
            orValidSrc: function () {
                if (this.readChecked) {
                    return orvalid
                } else {
                    return valid
                }

            }
        },
        components:{
            mobileChange:mobileChange,
            postAddress:postAddress,
            idCard:idCard,
            ctpUse:ctpUse

        },
        watch:{
            readChecked: function(){
                this.checkReadChecked();
            }
        },
        methods: {

            riskClick: function () {
                  $('#riskComModal').modal(riskComModal);
            },
            readClick: function () {
                this.readChecked = !this.readChecked
            },
            checkReadChecked: function () {
                $('#readCheckedMsg')
                        .html(this.readChecked ? '' : '请阅读协议信息');
            },

        },
        events:{
            'parent-submit':function () {
                this.checkReadChecked();
            }
        }
    }
</script>
