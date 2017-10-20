/**
 * Created by pobo on 2016/11/7.
 */
export function initDate() {
    $("#datetimepicker1").datepicker("remove"), $("#datetimepicker2").datepicker("remove"), $("#datetimepicker1").datepicker({
        format: "yyyy/mm/dd",
        language: "ch",
        autoclose: !0
    }).on("changeDate", function (e) {
        var n = setDate(getLastYearYestdy(new Date)).replace(/-/g, ""),
            i = setDate(e.date.toLocaleDateString()).replace(/\//g, ""),
            r = setDate((new Date).toLocaleDateString()).replace(/\//g, "");
        i < n && (alert("只能查询一年内的数据"), $("#datetimepicker1").datepicker("setDate", r))
    }), $("#datetimepicker2").datepicker({
        format: "yyyy/mm/dd",
        language: "ch",
        autoclose: !0
    }).on("changeDate", function (e) {
        var n = setDate((new Date).toLocaleDateString()).replace(/\//g, ""),
            i = setDate(e.date.toLocaleDateString()).replace(/\//g, "");
        i > n && (alert("不能超出当前日期范围！"), $("#datetimepicker2").datepicker("setDate", n))
    })
}

export function versionDate() {
    $("#datetimepicker1").datepicker("remove"), $("#datetimepicker2").datepicker("remove"), $("#datetimepicker1").datepicker({
        format: "yyyy/mm/dd",
        language: "ch",
        autoclose: !0
    }).on("changeDate", function (e) {
        var i = setDate(getLastMonthYestdy(new Date)).replace(/-/g, ""),
            r = setDate(e.date.toLocaleDateString()).replace(/\//g, ""),
            o = setDate((new Date).toLocaleDateString()).replace(/\//g, "");
        i > r && (alert("只能查询当前日期前一个月！"), $("#datetimepicker1").datepicker("setDate", o))
    }), $("#datetimepicker2").datepicker({
        format: "yyyy/mm/dd",
        language: "ch",
        autoclose: true
    }).on("changeDate", function (e) {
        var n = setDate((new Date).toLocaleDateString()).replace(/\//g, ""),
            i = setDate(e.date.toLocaleDateString()).replace(/\//g, "");
        i > n && (alert("不能超出当前日期范围！"), $("#datetimepicker2").datepicker("setDate", n))
    })
}

export function getLastMonthYestdy(t) {
    var e = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]),
        n = t.getFullYear(), i = t.getDate(), r = t.getMonth() + 1;
    n % 4 == 0 && n % 100 != 0 && (e[2] = 29), r - 1 == 0 ? (n -= 1, r = 12) : r -= 1, i = e[r] >= i ? i : e[r];
    var o = n + "-" + r + "-" + i;
    return o
}

export function setDate(t) {
    var e = new Date(t);
    return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()
}

export function monthlyStatistics() {
    $("#datetimepicker1").datepicker("remove"), $("#datetimepicker2").datepicker("remove"), $("#datetimepicker1").datepicker({
        startView: 1,
        maxViewMode: 1,
        minViewMode: 1,
        format: "yyyy/mm",
        language: "ch",
        autoclose: !0
    }), $("#datetimepicker2").datepicker({
        startView: 1,
        maxViewMode: 1,
        minViewMode: 1,
        format: "yyyy/mm",
        language: "ch",
        autoclose: !0
    })
}

export function getLastYearYestdy(date) {
    var strYear = date.getFullYear() - 1;
    var strDay = date.getDate();
    var strMonth = date.getMonth() + 1;
    if (strMonth < 10) {
        strMonth = "0" + strMonth;
    }
    if (strDay < 10) {
        strDay = "0" + strDay;
    }
    var datastr = strYear + "-" + strMonth + "-" + strDay;

    return datastr;
}

export function day(str) {
    str = str.substring(0, 4) + '/' + str.substring(4, 6) + '/' + str.substring(6, 8)
    return str;
}

export function month(str) {
    str = str.substring(0, 4) + '/' + str.substring(4, 6)
    return str;
}

export function sort(arr) {
    // arr = JSON.parse(arr);
    arr = arr.sort(function (a, b) {
        a = a.time.replace(/-/g, '');
        b = b.time.replace(/-/g, '');
        return a - b;
    });
    return arr;
}

export function setDateDate(data) {
    return 1 == data.length ? data = 1 == data ? "0" + data : "0" + (data - 1) : (data -= 1, 1 == data.toString().length && (data = "0" + data)), data
}

export function setDateHis(t) {

    return 1 == t.length && (t = "0" + t), t
}

export function setMonthDeta(t) {

    return 1 == t.length && (t = 1 == t ? "0" + t : 0 == t ? "12" : "0" + t), t
}

// export var url = 'http://192.168.6.118:8080';

