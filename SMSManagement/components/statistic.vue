<template>
    <div class="statisticView">
        <div class="search">
            机构 <CustomSelect name="orgID" all="1" type="org"></CustomSelect>
            开始日期 <input type="text" ref="beginDate" v-show="dateType==10"/><input type="text" ref="beginMonth" v-show="dateType!=10"/>
            结束日期 <input type="text" ref="endDate" v-show="dateType==10"/><input type="text" ref="endMonth" v-show="dateType!=10"/>
            日期类型 <select v-model="dateType">
                <option value="10">按日统计</option>
                <option value="7">按月统计</option>
            </select>
            <a class="btn1" @click="submit()">搜索</a>
        </div>
        <table class="list">
            <tr>
                <th>机构</th>
                <th>日期</th>
                <th>成功数</th>
                <th>失败数</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.orgID}}</td>
                <td>{{d.time.substr(0, dateType2)}}</td>
                <td>{{d.success}}</td>
                <td>{{d.failure}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
     module.exports = {
         mixins: [utils.listView2],
         data(){
             this.func = 561;
             var date = new Date();
             var endTime = utils.date(date, "");
             var month = date.getMonth(), year = date.getFullYear();
             if(month == 0) {
                 month = 12;
                 --year;
             }
             date.setTime(date.getTime()-86400000);
             this.endDate = utils.date(date);
             date.setTime(date.getTime()-86400000*30);
             this.beginDate = utils.date(date);
             this.beginMonth = (month==12 ? year+"-01" : year-1+"-"+utils.f2(month+1));
             this.endMonth = year+"-"+utils.f2(month);
             
             return {
                 data:{
                     orgID:0,
                     beginTime: this.beginDate.replace(/\-/g, ""),
                     endTime
                 },
                 dateType:10,
                 dateType2:10
             }
         },
         methods:{
             submit(){
                 var d1, d2;
                 if(this.dateType==10){
                     this.func = 561;
                     d1 = this.$refs.beginDate;
                     d2 = this.$refs.endDate;
                 }else {
                     this.func = 562;
                     d1 = this.$refs.beginMonth;
                     d2 = this.$refs.endMonth;
                 }
                 this.data.beginTime = d1.value.replace(/\-/g, "");
                 this.data.endTime = "";
                 d2 = d2.value;
                 if(d2) {
                     if(this.dateType==10) {
                         d2 = utils.parseDate(d2);
                         d2.setTime(d2.getTime()+86400000);
                         this.data.endTime = utils.date(d2, "");
                     }else {
                         d2 = d2.split("-");
                         this.data.endTime = (d2[1]==12 ? ++d2[0]+"01":d2[0]+utils.f2(++d2[1]));
                     }
                 }
                 this.data.orgID -= 0;
                 this.dateType2 = this.dateType;
                 this.loadData();
             }
         },
         mounted(){
             $(this.$refs.beginDate).val(this.beginDate).datepicker({format: "yyyy-mm-dd",autoclose:true,endDate:"-1d"});
             $(this.$refs.endDate).val(this.endDate).datepicker({format: "yyyy-mm-dd",autoclose:true,endDate:"-1d"});
             $(this.$refs.beginMonth).val(this.beginMonth).datepicker({format: "yyyy-mm",autoclose:true,minViewMode:1,endDate:"-1m"});
             $(this.$refs.endMonth).val(this.endMonth).datepicker({format: "yyyy-mm",autoclose:true,minViewMode:1,endDate:"-1m"});
         }
     }
</script>