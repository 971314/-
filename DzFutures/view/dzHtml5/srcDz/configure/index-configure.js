var iconInit = {}, content = [], ver = "", verCheck = "", time="";  //iconInit是写入配置文件的对象，content、ver、verCheck、time分别对应contents, version, checkedVer, updateDate字段的内容
ver = "0.10", verCheck = "0.07", time="2016-11-10";  //东证
content = [
    {
        "title": "开户",
        "checked": "1", //区分已添加和未添加
        "image1": "kaihu.png",
        "url": "pobo:user/openAccount.html?pageId=900005",
        "id": "kaihu"
    },

    {
        "title": "财经日历",
        "checked": "1",
        "image1": "caijing.png",
        "url": "pobo:pageId=904001",
        "id": "caijing"
    },

    {
        "title": "问答",
        "checked": "1",
        "image1": "wenda.png",
        "url": "pobo:http://chat8.live800.com/live800/chatClient/chatbox.jsp?companyID=70649&configID=83625&jid=6826038593&pageId=900004&title=问答",
        "id": "wenda"
    },
    {
        "title": "服务",
        "checked": "1",
        "image1": "kefu.png",
        "url": "pobo:info/reportInfo-list.html?pageId=900005",
        "id": "kefu"
    },
    {
        "title": "行情",  //功能模块的名称
        "checked": "1",  //是否添加
        "image1": "wai.png",
        "url": "pobo:pageId=801000",
        "id": "wai"
    },
    {
        "title": "理财",
        "checked": "1",
        "image1": "ziguan.png",
        "url": "pobo:fuwu.html?pageId=900004&title=理财",
        "id": "ziguan"
    },
    {
        "title": "期货课堂",
        "checked": "1",
        "image1": "qihuoClass.png",
        "url": "pobo:info/reportInfo-list.html?pageId=900005",
        "id": "qihuoClass"
    }

];

iconInit['contents'] = content;
iconInit['version'] = ver;  //大版本号，图标改动很多、增添模块、删减模块
iconInit['checkedVer'] = verCheck;  //小版本号，图标数目不变，每个模块id不变
iconInit['updateDate'] = time;  //改动日期，作为参考