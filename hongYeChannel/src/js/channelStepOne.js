/**
 * Created by xiajing on 2016/10/14.
 */
$(function () {

    var isReady = false;
    var channelid;
    var userName;
    var UUID;

    function getRandomCode() {
        $.ajax({
            url: serverIP + channelUrl,
            type: 'POST',
            data: JSON.stringify({
                func: randomCode,
                data: {}
            }),
            contentType: 'application/json',
            crossDomain: true,
            success: function (data) {
                if (data.retHead == 0) {
                    $('#randomCodeImg').attr('src','data:image/jpg;base64,' + data.data.image);
                    UUID = data.data.UUID;
                }
            }, error: function (data) {
                console.error('服务器异常！');
            }
        });
    }
    getRandomCode();
    $('#randomCodeImg').click(getRandomCode);


    //根据姓名或者员工号首先查询到渠道号，如果有重复的名字就要选择对应的部门
    function checkChannel() {
        var name = $("#nameNo").val().trim();
        var randomCode = $("#randomCode").val().trim();
        if (!name) {
            $("#errorMsg").css('display', 'block');
            $("#errorMsg").html("请输入渠道号");
            return;
        }
        if (!randomCode) {
            $("#errorMsg").css('display', 'block');
            $("#errorMsg").html("请输入验证码");
            return;
        }

        $.ajax({
            url: serverIP + channelUrl,
            type: 'POST',
            data: JSON.stringify({
                func: fetchChannelCode,
                data: {
                    recommenderName: name,
                    UUID: UUID,
                    code: randomCode
                }
            }),
            contentType: 'application/json',
            crossDomain: true,
            success: function (data) {
                if (data.retHead == 0) {
                    if (data.data.result.length > 0) {
                        channelid = data.data.result[0].CHANNEL_ID;
                        userName = data.data.result[0].CHANNEL_NAM;
                        isReady = true;

                        window.location.href = 'view/createQrCode.html?userName=' + encodeURIComponent(userName) + '&channelID=' + channelid;
                    }
                } else {
                    $('#dialogContent').html(data.desc);
                    $('#flagUserDialog').modal(flagUserDialog);
                    getRandomCode();
                    $("#randomCode").val('');
                    //channelid = data.data.result.item.CHANNEL_ID;
                    //isReady = true;
                }
            }, error: function (data) {
                console.log("服务器异常！");
            }
        })
    }

    $("#nextBtn").click(function () {checkChannel();})


    $("#nextBtn").blur(function () {
        $("#errorMsg").css('display', 'none');
    })

    $("#sysTitle").html(companyName + "渠道管理系统");
})
