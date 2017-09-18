//读取接口数据测试
init();
function init() {
    $.ajax({
        url: 'http://192.168.6.124:8080/pobocertification_WebService/protocol_4',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            arg2: 'koant',
            arg3: 3,
            arg4: 'Koant163com',
            arg5: 1,
            arg6: '192.168.6.113',
            arg9: 'W7'
        },
        jsonp: 'jsonpCallback',
        success: function(data) {
            console.log(data.protocol4);
            var template = $$('#test-temp').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            $$("#test-context").html(html);
        }, error: function(data) {
            console.log("服务器异常");
        }
    })
}

