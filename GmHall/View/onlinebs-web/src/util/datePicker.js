/**
 * Created by xiajing on 2016/5/20.
 */

//将时间戳转换为日期格式
export function getDateTime(time){
    return new Date(parseInt(time)).toLocaleDateString()
}
   //加载日历控件
   export function initDatePicker(){
    function get_time() {
        return new Date().getTime();
    }
    $("#startDate").datepicker({
        onSelect:function(dateText,inst){
            $("#endDate").datepicker("option","minDate",dateText);
        }
    });
    $("#endDate").datepicker({
        onSelect:function(dateText,inst){
            $("#startDate").datepicker("option","maxDate",dateText);
        }
    });
    var dates = $("#startDate,#endDate");
    dates.datepicker({
        onSelect: function(selectedDate){
            var option = this.id == "start" ? "minDate" : "maxDate";
            dates.not(this).datepicker("option", option, selectedDate);
        }
    });
      // //开始时间
      // $('#startDate').datepicker({
      //     defaultDate: "+1w",
      //     numberOfMonths: 1,
      //     maxDate: new Date(),
      //     onClose: function( selectedDate ) {
      //         $( "#endDate" ).datepicker( "option", "minDate", selectedDate );
      //         var arr=selectedDate.split("-");
      //         var crrent=new Date(arr[0],arr[1]-1,arr[2]);
      //         //最大90天
      //         crrent.setTime(crrent.getTime()+(90*3600*1000*24));
      //         //if (crrent.getTime()>get_time()){
      //         //    crrent.setTime(get_time());
      //         //}
      //         $( "#endDate" ).datepicker( "option", "maxDate", crrent );
      //     }
      // });
      ////结束时间
      // $('#endDate').datepicker({
      //     defaultDate: "+1w",
      //     numberOfMonths: 1,
      //     maxDate: new Date(),
      //     onClose: function( selectedDate ) {
      //         $( "#startDate" ).datepicker( "option", "maxDate", selectedDate );
      //         var arr=selectedDate.split("-");
      //         var crrent=new Date(arr[0],arr[1]-1,arr[2]);
      //         //最大90天
      //         crrent.setTime(crrent.getTime()-(90*3600*1000*24));
      //         $( "#startDate" ).datepicker( "option", "minDate", crrent);
      //     }
      // });

    //初始化选中本月
    initDate();
    function initDate() {
        if ($('#startDate').val() == "" && $('#endDate').val() == "") {
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var firstDay = year + "-" + month + "-" + "01";
            var today = new Date();
            var today_f = formatDate(today);
            $("#startDate").val(firstDay);
            $("#endDate").val(today_f);
        }
    }
    //格式化日期
    function formatDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var formatedDate = "";
        formatedDate += year + "-";
        if (month >= 10) {
            formatedDate += month + "-";
        } else {
            formatedDate += "0" + month + "-";
        }
        if (day >= 10) {
            formatedDate += day;
        } else {
            formatedDate += "0" + day;
        }
        return formatedDate;
    }
   }