<template>
    <a :class="[$route.query.orderfield==type?$route.query.ordertype:'', init&&!$route.query.orderfield?init:'']" v-on:click="change()">{{name}}<i class="icon"></i></a>
</template>
<script>
     module.exports = {
         props:["name", "type", "init"],
         data(){
             var query = this.$route.query;
             if(this.init && !query.orderfield) {
                 query.orderfield = this.type;
                 query.ordertype = this.init;
             }
             return {};  
         },
         methods: {
              change() {
                  var query = this.$route.query;
                 if(query.orderfield == this.type){
                     query.ordertype = (query.ordertype == "a" ? "de" : "a");
                 }else {
                     query.ordertype = "de";  
                     query.orderfield = this.type;
                 }
                 query.currentindex = 1;
                 this.$router.go({query});  
             }
         },
         watch: {
             $route({query}) {
                 if(this.init && !query.orderfield) {
                     query.orderfield = this.type;
                     query.ordertype = this.init;
                 }
             }
         }
     }
</script>