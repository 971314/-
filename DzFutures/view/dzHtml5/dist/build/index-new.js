function isShow(t){1==t&&readOrLogin()}function decimalDecPrice(t,e){e+="";var n=e.indexOf("."),a=e.length;return e=n>=0&&a-1-n>=t?e.substr(0,e.indexOf(".")+t+1):(e-0).toFixed(t)}function showCon(){var t=pbEngine.readConfig("PbHomeThreeContracts.json");if(t){contract=JSON.parse(t);var e=["000001","399001","399006"];if(2==contract.length){var n=e.indexOf(contract[0].code),a=e.indexOf(contract[1].code);if(n<0&&a<0)contract.unshift({market:"1001",name:"创业板指",code:"399006"});else if(n>=0&&a>=0){var c=contract0;contract0.remove(c[n]),contract0.remove(c[a]),contract.unshift(contract0[0])}else n<0&&a>=0?(contract0.splice(a,1),contract.unshift(contract0[1])):n>=0&&a<0&&(contract0.splice(n,1),contract.unshift(contract0[1]))}else if(1==contract.length){var n=e.indexOf(contract[0].code);n<0?(contract.unshift(contract0[2]),contract.unshift(contract0[1])):n>=0&&(contract0.splice(n,1),contract.unshift(contract0[1]),contract.unshift(contract0[0]))}}for(var o=0;o<contract.length;o++)marketData.push({2:contract[o].market,3:contract[o].code});symbolData[1]=marketData,pbEngine.hqSubscribe(0,JSON.stringify(symbolData))}function callback(t){var e=JSON.parse(t);if(90004==e.moduleId){var n=e.jData.Indexes.slice(0,10);ReactDOM.render(React.createElement(DzNewsList,{dzTtileInfo:n}),document.getElementById("dzNewsList"))}else if(9e4==e.moduleId){for(var a=e.jData.Data,c=0;c<contract.length;c++){var o=0,s=pbEngine.getHQPriceRate(contract[c].code,contract[c].market),i=JSON.parse(pbEngine.getHQZDInfo(contract[c].code,contract[c].market));contract[c].rate=s,contract[c].zd=i.HQZD,contract[c].zdf=i.HQZDF,contract[c].groupflag=pbEngine.getHQGroupFlag(contract[c].code,contract[c].market),contract[c].decimal=pbEngine.getHQPriceDecimal(contract[c].code,contract[c].market);for(var r=0;r<a.length;r++)contract[c].code==a[r][10]&&(a[r][29]?(o=(a[r][29]-0)/contract[c].rate,o=decimalDecPrice(contract[c].decimal,o),contract[c].price=o):a[r][29]||(contract[c].price="--"))}for(var c=0;c<3;c++){var d=$("#market-chg-"+c+" span");$("#market-href-"+c).attr("href","pobo:pageId=801001&market="+contract[c].market+"&code="+contract[c].code+"&groupflag="+contract[c].groupflag+"&hideflag=1"),$("#market-name-"+c).html(contract[c].name),contract[c].zd>0?($("#market-price-"+c+" img").removeClass("hide"),$("#market-price-"+c+" img").attr("src","images/high.png"),$("#market-price-"+c).removeClass().addClass("a3"),$("#market-chg-"+c).removeClass().addClass("e3"),d[0].innerHTML=contract[c].zd,d[1].innerHTML=contract[c].zdf):contract[c].zd<0?($("#market-price-"+c+" img").removeClass("hide"),$("#market-price-"+c+" img").attr("src","images/low.png"),$("#market-price-"+c).removeClass().addClass("a4"),$("#market-chg-"+c).removeClass().addClass("e4"),d[0].innerHTML=contract[c].zd,d[1].innerHTML=contract[c].zdf):0==contract[c].zd?($("#market-price-"+c+" img").addClass("hide"),$("#market-price-"+c).removeClass().addClass("a1"),$("#market-chg-"+c).removeClass().addClass("e1"),d[0].innerHTML=contract[c].zd,d[1].innerHTML="0%"):isNaN(contract[c].zd)&&($("#market-price-"+c+" img").addClass("hide"),$("#market-price-"+c).removeClass().addClass("a1"),$("#market-chg-"+c).removeClass().addClass("e1"),d[0].innerHTML=contract[c].zd,d[1].innerHTML=contract[c].zdf),$("#market-price-"+c+" span").html(contract[c].price)}}}function reload(){pbEngine.queryInfoListWithJson(JSON.stringify(newsListData)),symbolData={},marketData=[],contract0=[{market:"1000",name:"上证指数",code:"000001"},{code:"399001",market:"1001",name:"深证成指"},{market:"1001",name:"创业板指",code:"399006"}],contract=contract0,showCon(),custom1=pbEngine.readLocalFile("H5LocalData1.json"),show=custom1?JSON.parse(custom1):iconInit,custom2=show.contents,custom=[];for(var t=0;t<custom2.length;t++)"1"==custom2[t].checked&&custom.push(custom2[t]);if(keep.length==custom.length){for(var e=0;e<custom.length&&custom[e].title==keep[e].title;e++);if(e>=custom.length)return}keep=custom;var n,a=custom.length;if(a<4?(n=1,ReactDOM.render(React.createElement(CustButtonO,{button:custom}),document.getElementById("customized"))):a>=4&&a<8?(n=1,ReactDOM.render(React.createElement(CustButtonT,{button:custom}),document.getElementById("customized"))):a>=8&&a<12?(n=2,ReactDOM.render(React.createElement(CustButtonTh,{button:custom}),document.getElementById("customized"))):a>=12&&a<16?(n=2,ReactDOM.render(React.createElement(CustButtonF,{button:custom}),document.getElementById("customized"))):a>=16&&a<20&&(n=3,ReactDOM.render(React.createElement(CustButtonFi,{button:custom}),document.getElementById("customized"))),n>=2){$("#customized .area>div").css("float","left"),$("#customized").css("margin-bottom","0"),$("#customized").css("padding-bottom","8px"),$("#customized").css("border-bottom","");var c=document.documentElement.clientWidth;$(".btn-group").css("width",c),$(".btn-group>div").css("width",c/4),$("#customized .area").css("width",c*n),$("#customized .area>div").css("width",c),2==n?($("#ind3").addClass("hide"),$("#ind1").removeClass(),$("#ind2").removeClass(),$("#ind1").addClass("ind"),$(document).ready(function(){try{var t=new IScroll("#customized",{eventPassthrough:!0,scrollX:!0,scrollY:!1,preventDefault:!1,snap:".btn-wrap",tap:!0,mouseWheelSpeed:10});t.on("scrollEnd",function(){this.x>=0?($("#ind2").removeClass(),$("#ind1").addClass("ind")):this.x<0&&this.x>=-c&&($("#ind1").removeClass(),$("#ind2").addClass("ind"))})}catch(t){}})):3==n&&($("#ind1").removeClass(),$("#ind2").removeClass(),$("#ind3").removeClass(),$("#ind1").addClass("ind"),$(document).ready(function(){try{var t=new IScroll("#customized",{eventPassthrough:!0,scrollX:!0,scrollY:!1,preventDefault:!1,snap:".btn-wrap",tap:!0,mouseWheelSpeed:10});t.on("scrollEnd",function(){this.x>=0?($("#ind2").removeClass(),$("#ind3").removeClass(),$("#ind1").addClass("ind")):this.x<0&&this.x>=-c?($("#ind1").removeClass(),$("#ind3").removeClass(),$("#ind2").addClass("ind")):this.x<-c&&this.x>=-(2*c)&&($("#ind1").removeClass(),$("#ind2").removeClass(),$("#ind3").addClass("ind"))})}catch(t){}}))}else n<2&&($("#customized .area>div").css("float",""),$("#customized").css("padding-bottom","8px"),$("#customized .area").css("margin-bottom","0"),$("#customized").css("border-bottom",""),$("#ind1").addClass("hide"),$("#ind2").addClass("hide"),$("#ind3").addClass("hide"))}function readOrLogin(){if(window.pbEngine){var t=pbEngine.getPublicData("PbKey_Home_Verify");void 0==t||0==t?$("#flagDZLogin").css("display","block"):$("#flagDZLogin").css("display","none")}}Array.prototype.remove=function(t){var e=this.indexOf(t);e>-1&&this.splice(e,1)};var newsListData={type:"mu",groupIDs:["511701"],doc:"json",count:"10"};pbEngine.queryInfoListWithJson(JSON.stringify(newsListData));var symbolData={},marketData=[],contract0=[{market:"1000",name:"上证指数",code:"000001"},{code:"399001",market:"1001",name:"深证成指"},{market:"1001",name:"创业板指",code:"399006"}],contract=contract0;showCon();var custom1=pbEngine.readLocalFile("H5LocalData1.json");if(custom1){var show=JSON.parse(custom1);if(!show.version||!show.checkedVer||show.version<iconInit.version)show=iconInit,pbEngine.writeLocalFile("H5LocalData1.json",JSON.stringify(show));else if(show.version==iconInit.version&&show.checkedVer<iconInit.checkedVer){for(var i=0;i<show.contents.length;i++)for(var j=0;j<iconInit.contents.length;j++)if(show.contents[i].id==iconInit.contents[j].id){if(show.contents[i].title==iconInit.contents[j].title&&show.contents[i].image1==iconInit.contents[j].image1&&show.contents[i].image2==iconInit.contents[j].image2&&show.contents[i].url==iconInit.contents[j].url)break;show.contents[i]=iconInit.contents[j],show.contents[i].checked="0";break}pbEngine.writeLocalFile("H5LocalData1.json",JSON.stringify(show))}}else{var show=iconInit;pbEngine.writeLocalFile("H5LocalData1.json",JSON.stringify(show))}for(var custom2=show.contents,custom=[],i=0;i<custom2.length;i++)"1"==custom2[i].checked&&custom.push(custom2[i]);keep=custom;var length=custom.length,num;if(length<4?(num=1,ReactDOM.render(React.createElement(CustButtonO,{button:custom}),document.getElementById("customized"))):length>=4&&length<8?(num=1,ReactDOM.render(React.createElement(CustButtonT,{button:custom}),document.getElementById("customized"))):length>=8&&length<12?(num=2,ReactDOM.render(React.createElement(CustButtonTh,{button:custom}),document.getElementById("customized"))):length>=12&&length<16?(num=2,ReactDOM.render(React.createElement(CustButtonF,{button:custom}),document.getElementById("customized"))):length>=16&&length<20&&(num=3,ReactDOM.render(React.createElement(CustButtonFi,{button:custom}),document.getElementById("customized"))),num>=2){$("#customized .area>div").css("float","left"),$("#customized").css("margin-bottom","0"),$("#customized").css("padding-bottom","8px"),$("#customized").css("border-bottom","");var width=document.documentElement.clientWidth;$(".btn-group").css("width",width),$(".btn-group>div").css("width",width/4),$("#customized .area").css("width",width*num),$("#customized .area>div").css("width",width),2==num?($("#ind3").addClass("hide"),$("#ind1").removeClass(),$("#ind2").removeClass(),$("#ind1").addClass("ind"),$(document).ready(function(){try{var t=new IScroll("#customized",{eventPassthrough:!0,scrollX:!0,scrollY:!1,preventDefault:!1,snap:".btn-wrap",tap:!0,mouseWheelSpeed:10});t.on("scrollEnd",function(){this.x>=0?($("#ind2").removeClass(),$("#ind1").addClass("ind")):this.x<0&&this.x>=-width&&($("#ind1").removeClass(),$("#ind2").addClass("ind"))})}catch(t){}})):3==num&&($("#ind1").removeClass(),$("#ind2").removeClass(),$("#ind3").removeClass(),$("#ind1").addClass("ind"),$(document).ready(function(){try{var t=new IScroll("#customized",{eventPassthrough:!0,scrollX:!0,scrollY:!1,preventDefault:!1,snap:".btn-wrap",tap:!0,mouseWheelSpeed:10});t.on("scrollEnd",function(){this.x>=0?($("#ind2").removeClass(),$("#ind3").removeClass(),$("#ind1").addClass("ind")):this.x<0&&this.x>=-width?($("#ind1").removeClass(),$("#ind3").removeClass(),$("#ind2").addClass("ind")):this.x<-width&&this.x>=-(2*width)&&($("#ind1").removeClass(),$("#ind2").removeClass(),$("#ind3").addClass("ind"))})}catch(t){}}))}else num<2&&($("#customized .area>div").css("float",""),$("#customized").css("padding-bottom","8px"),$("#customized .area").css("margin-bottom","0"),$("#customized").css("border-bottom",""),$("#ind1").addClass("hide"),$("#ind2").addClass("hide"),$("#ind3").addClass("hide"));readOrLogin();var DzNewsList=React.createClass({displayName:"DzNewsList",render:function(){return React.createElement("div",{className:"exitLoginInfo2"},this.props.dzTtileInfo.map(function(t){var e="pobo:info/newsNotice-list.html?pageId=900005";return React.createElement("li",null,React.createElement("a",{href:e},React.createElement("div",{className:"newTitle"},t.Title?t.Title:"----")))}))}});