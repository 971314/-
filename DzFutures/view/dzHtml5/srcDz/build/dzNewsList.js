/**
 * Created by xiajing on 2016/9/29.
 */
//var data =
//{"Code":null,"GroupID":null,"Indexes":[
//    {"ID":"302504","Pubtime":"2016-09-1 09:41","Title":"【谈金说银】2016年9月1日【谈金说银】2016年9月1日","Type":null},
//    {"ID":"302504","Pubtime":"2016-09-23 10:35","Title":"【谈金说银】 ","Type":null},
//    {"ID":"302504","Pubtime":"2016-09-1 09:41","Title":"【谈金说银】 ","Type":null},
//    {"ID":"302504","Pubtime":"2016-09-1 09:41","Title":"【谈金说银】2016年9月4日","Type":null},
//    {"ID":"296104","Pubtime":"2016-09-07 08:56","Title":"【交易策略】2016年9月7日","Type":null}],"Industry":null,"Market":null}
//console.log(data);
//console.log(data.Indexes[0].Title);
//var DzNewsList = React.createClass({
//    render:function(){
//        return(
//            <div className="newsList">
//                <ul className="newsListUl">
//                    {
//                        this.props.data.map(function(dataValue){
//                            var time = dataValue.Pubtime.split(' ');
//                            return (
//                                <a>
//                                <li className="newsListLi">
//                                    <div className="newsTitleInfo">{dataValue.Title}</div>
//                                    <div className="newsDate">{time[0]}</div>
//                                </li>
//                                </a>
//                            )
//                        })
//                    }
//                </ul>
//            </div>
//        )
//    }
//})
//ReactDOM.render(<DzNewsList data={data.Indexes}/>, document.getElementById('dzNewsList'));

//获取东证的公告
var newsListData = { type: 'mu', groupIDs: ['511701'], doc: 'json', count: '10' };
pbEngine.queryInfoListWithJson(JSON.stringify(newsListData));

function callback(message) {
    var msg = JSON.parse(message);
    if (msg.moduleId == 90004) {
        //获取东证的头条信息
        var dzTtileInfo = msg.jData.Indexes.slice(0, 10);
        ReactDOM.render(React.createElement(NewsList, { dzTtileInfo: dzTtileInfo }), document.getElementById('dzNewsList'));
    }
}
var NewsList = React.createClass({
    displayName: 'NewsList',

    render: function () {
        return React.createElement(
            'div',
            { className: 'newsList' },
            React.createElement(
                'ul',
                { className: 'newsListUl' },
                this.props.dzTtileInfo.map(function (dataValue) {
                    var url = 'pobo:info/news-detail.html?pageId=904002&newsId=' + dataValue.ID;
                    var time = dataValue.Pubtime.split(' ');
                    return React.createElement(
                        'a',
                        { href: url },
                        React.createElement(
                            'li',
                            { className: 'newsListLi' },
                            React.createElement(
                                'div',
                                { className: 'newsTitleInfo' },
                                dataValue.Title
                            ),
                            React.createElement(
                                'div',
                                { className: 'newsDate' },
                                time[0]
                            )
                        )
                    );
                })
            )
        );
    }
});
