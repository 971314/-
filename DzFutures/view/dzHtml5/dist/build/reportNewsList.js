function callback(e){var t=JSON.parse(e);if(90004==t.moduleId){var a=t.jData.Indexes.slice(0,10);ReactDOM.render(React.createElement(NewsList,{dzTtileInfo:a}),document.getElementById("dzNewsList"))}}var newsListData={type:"mu",groupIDs:["511702"],doc:"json",count:"10"};pbEngine.queryInfoListWithJson(JSON.stringify(newsListData));var NewsList=React.createClass({displayName:"NewsList",render:function(){return React.createElement("div",{className:"newsList"},React.createElement("ul",{className:"newsListUl"},this.props.dzTtileInfo.map(function(e){var t="pobo:info/news-detail.html?pageId=904002&newsId="+e.ID,a=e.Pubtime.split(" ");return React.createElement("a",{href:t},React.createElement("li",{className:"newsListLi"},React.createElement("div",{className:"newsTitleInfo"},e.Title),React.createElement("div",{className:"newsDate"},a[0])))})))}});