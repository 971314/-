/**
 * Created by xiajing on 2016/9/29.
 */
//获取东证的公告
var newsListData = {type: 'mu', groupIDs: ['511702'], doc: 'json', count: '10'};
pbEngine.queryInfoListWithJson(JSON.stringify(newsListData));

function callback(message) {
    var msg = JSON.parse(message);
    if (msg.moduleId == 90004) {
        //获取东证的头条信息
        var dzTtileInfo = msg.jData.Indexes.slice(0, 10);
        ReactDOM.render(<NewsList dzTtileInfo={dzTtileInfo}/>, document.getElementById('dzNewsList'));
    }
}
    var NewsList = React.createClass({
    render:function(){
        return(
            <div className="newsList">
                <ul className="newsListUl">
                    {
                        this.props.dzTtileInfo.map(function(dataValue){
                            var url='pobo:info/news-detail.html?pageId=904002&newsId='+dataValue.ID;
                            var time = dataValue.Pubtime.split(' ');
                            return (
                                <a href={url}>
                                    <li className="newsListLi">
                                            <div className="newsTitleInfo">{dataValue.Title}</div>
                                            <div className="newsDate">{time[0]}</div>
                                    </li>
                                </a>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
})


