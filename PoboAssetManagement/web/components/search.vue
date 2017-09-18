<template>
    <div class="title">
        姓名<input type="text" class="n" v-model="name"/>
        联系方式 <input type="text" v-model="phone"/>
        <button type="button" class="btn-blue" @click="search()">搜索</button>
    </div>
</template>
<script>
     module.exports = {
         props:[],
         data(){
             var query = this.$route.query;
             return {
                 name: query.name||"",
                 phone: query.phone||""
             }
         },
         methods: {
              search() {
                  var t = this;
                  t.$router.go({query:{name:$.trim(t.name), phone:$.trim(t.phone)}});
              }
         },
         watch: {
             $route({query}) {
                 this.name = query.name||"";
                 this.phone = query.phone||"";     
             }
         }
     }
</script>