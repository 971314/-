//var data =
//  {"Code":null,"GroupID":null,"Indexes":[
//    {"ID":"302504","Pubtime":"2016-09-1 09:41","Title":"1谈金说银","Type":null},
//    {"ID":"302504","Pubtime":"2016-09-1 09:41","Title":"2谈金说银","Type":null},
//    //{"ID":"302504","Pubtime":"2016-09-1 09:41","Title":"【谈金说银】 ","Type":null},
//    //{"ID":"302504","Pubtime":"2016-09-1 09:41","Title":"【谈金说银】2016年9月4日","Type":null},
//    {"ID":"296104","Pubtime":"2016-09-07 08:56","Title":"3assasas","Type":null}],"Industry":null,"Market":null}
//console.log(data);
//console.log(data.Indexes[0].Title);
//var DzNewsList = React.createClass({
//  render:function(){
//    return(
//        <div className="exitLoginInfo2">
//                          {
//                            this.props.data.map(function(dataValue){
//                              var url= '../dist/info/newsNotice-list.html';
//                                return<li>
//                                  <a href={url}>
//                                    <div className="newTitle">{dataValue.Title ? dataValue.Title:'----'}</div>
//                                  </a>
//                                </li >
//                            })
//                          }
//
//
//        </div>
//    )
//  }
//})
//ReactDOM.render(<DzNewsList data={data.Indexes}/>, document.getElementById('dzNewsList'));

function isShow(flag) {
  if (flag == 1) {
    readOrLogin();
  }
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

//最新价保留到价格精度
function decimalDecPrice(decimal, price) {
  price = price + '';
  var decIndex = price.indexOf('.');
  var length = price.length;
  if (decIndex >= 0) {
    if (length - 1 - decIndex >= decimal) {
      price = price.substr(0, price.indexOf('.') + decimal + 1);
    } else {
      price = (price - 0).toFixed(decimal);
    }
  } else {
    price = (price - 0).toFixed(decimal);
  }
  return price;
}

function showCon() {
  var contract1 = pbEngine.readConfig('PbHomeThreeContracts.json');
  //返回合约不是空时进行下一步判断，否则直接显示默认的三个指数
  if (contract1) {
    contract = JSON.parse(contract1);
    var arr = ['000001', '399001', '399006'];
    //如果返回contract长度为3则直接订阅行情，小于3时先判断返回的合约是否有和三个指数重复的，然后拼接成三个合约再订阅行情
    if (contract.length == 2) {
      //index0和index1是contract中第一和第二个合约在arr中的下标，找不到时为负值
      var index0 = arr.indexOf(contract[0]['code']);
      var index1 = arr.indexOf(contract[1]['code']);
      //两个合约都不在三个指数之列
      if (index0 < 0 && index1 < 0) {
        //把创业板指添加到contract的头部
        contract.unshift({ "market": "1001", "name": "创业板指", "code": "399006" });
      } else if (index0 >= 0 && index1 >= 0) {
        //两个合约都在三个指数之列，找出三个指数中剩下的那个指数，加到contract头部
        var contract2 = contract0;
        contract0.remove(contract2[index0]);
        contract0.remove(contract2[index1]);
        //删除后contract0只剩一个元素，即三个指数中剩下的
        contract.unshift(contract0[0]);
      } else if (index0 < 0 && index1 >= 0) {
        //第一个合约不在，第二个合约在
        contract0.splice(index1, 1);
        contract.unshift(contract0[1]);
      } else if (index0 >= 0 && index1 < 0) {
        //第一个合约在，第二个合约不在
        contract0.splice(index0, 1);
        contract.unshift(contract0[1]);
      }
    } else if (contract.length == 1) {
      var index0 = arr.indexOf(contract[0]['code']);
      if (index0 < 0) {
        //合约不在三指数之列
        contract.unshift(contract0[2]);
        contract.unshift(contract0[1]);
      } else if (index0 >= 0) {
        //合约在三指数之列
        contract0.splice(index0, 1);
        contract.unshift(contract0[1]);
        contract.unshift(contract0[0]);
      }
    }
  }

  for (var i = 0; i < contract.length; i++) {
    //存入市场合约代码集合
    marketData.push({
      '2': contract[i].market,
      '3': contract[i].code
    });
  }
  symbolData['1'] = marketData;
  /*symbolData['5'] = column;*/
  pbEngine.hqSubscribe(0, JSON.stringify(symbolData));
}

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.moduleId == 90004) {
    //获取东证的头条信息
    var dzTtileInfo = msg.jData.Indexes.slice(0, 10);
    ReactDOM.render(React.createElement(DzNewsList, { dzTtileInfo: dzTtileInfo }), document.getElementById('dzNewsList'));
    //var CONTENTS = msg.jData.Indexes.slice(0,10);
    //ReactDOM.render(<InfoList contents={CONTENTS} dir={'pobo:info/'} />, document.getElementById('info-list'));
  } else if (msg.moduleId == 90000) {
    var data = msg.jData.Data;
    for (var i = 0; i < contract.length; i++) {
      var lastPrice = 0;
      var rate = pbEngine.getHQPriceRate(contract[i].code, contract[i].market);
      var zdInfo = JSON.parse(pbEngine.getHQZDInfo(contract[i].code, contract[i].market));
      //放大倍数
      contract[i]['rate'] = rate;
      //涨跌
      contract[i]['zd'] = zdInfo.HQZD;
      //涨跌幅
      contract[i]['zdf'] = zdInfo.HQZDF;
      //groupflag
      contract[i]['groupflag'] = pbEngine.getHQGroupFlag(contract[i].code, contract[i].market);
      //商品价格小数位
      contract[i]['decimal'] = pbEngine.getHQPriceDecimal(contract[i].code, contract[i].market);
      for (var j = 0; j < data.length; j++) {
        if (contract[i]['code'] == data[j]['10']) {
          if (data[j]['29']) {
            lastPrice = (data[j]['29'] - 0) / contract[i]['rate']; //获取最新价
            lastPrice = decimalDecPrice(contract[i]['decimal'], lastPrice);
            contract[i]['price'] = lastPrice;
          } else if (!data[j]['29']) {
            contract[i]['price'] = '--';
          }
        }
      }
    }
    for (var i = 0; i < 3; i++) {
      var changeSpan = $('#market-chg-' + i + ' span');
      $('#market-href-' + i).attr('href', 'pobo:pageId=801001&market=' + contract[i]['market'] + '&code=' + contract[i]['code'] + '&groupflag=' + contract[i]['groupflag'] + '&hideflag=1');
      $('#market-name-' + i).html(contract[i]['name']);
      if (contract[i]['zd'] > 0) {
        $('#market-price-' + i + ' img').removeClass('hide');
        $('#market-price-' + i + ' img').attr('src', 'images/high.png');
        $('#market-price-' + i).removeClass().addClass('a3');
        $('#market-chg-' + i).removeClass().addClass('e3');
        changeSpan[0].innerHTML = contract[i]['zd'];
        changeSpan[1].innerHTML = contract[i]['zdf'];
      } else if (contract[i]['zd'] < 0) {
        $('#market-price-' + i + ' img').removeClass('hide');
        $('#market-price-' + i + ' img').attr('src', 'images/low.png');
        $('#market-price-' + i).removeClass().addClass('a4');
        $('#market-chg-' + i).removeClass().addClass('e4');
        changeSpan[0].innerHTML = contract[i]['zd'];
        changeSpan[1].innerHTML = contract[i]['zdf'];
      } else if (contract[i]['zd'] == 0) {
        $('#market-price-' + i + ' img').addClass('hide');
        $('#market-price-' + i).removeClass().addClass('a1');
        $('#market-chg-' + i).removeClass().addClass('e1');
        changeSpan[0].innerHTML = contract[i]['zd'];
        changeSpan[1].innerHTML = '0%';
      } else if (isNaN(contract[i]['zd'])) {
        $('#market-price-' + i + ' img').addClass('hide');
        $('#market-price-' + i).removeClass().addClass('a1');
        $('#market-chg-' + i).removeClass().addClass('e1');
        changeSpan[0].innerHTML = contract[i]['zd'];
        changeSpan[1].innerHTML = contract[i]['zdf'];
      }
      $('#market-price-' + i + ' span').html(contract[i]['price']);
    }
  }
}
var newsListData = { type: 'mu', groupIDs: ['511701'], doc: 'json', count: '10' };
pbEngine.queryInfoListWithJson(JSON.stringify(newsListData));

//symbolData存放订阅行情（最新价）所需的参数
//marketData存放symbolData的1字段，即合约的market和code
var symbolData = {},
    marketData = [];
//column存放symbolData的5字段，即需要订阅的最新价
/*var column = [{'6': '29'}];*/
//默认先显示上证、深证、创业
var contract0 = [{ "market": "1000", "name": "上证指数", "code": "000001" }, { "code": "399001", "market": "1001", "name": "深证成指" }, { "market": "1001", "name": "创业板指", "code": "399006" }];
//合约集合，默认初始值为上证、深证、创业
var contract = contract0;
showCon();

var custom1 = pbEngine.readLocalFile('H5LocalData1.json');

//大版本号变动的情况：contents字段长度变化；长度不变，但是模块发生较大变化即id变化；直接覆盖本地文件
//小版本号变动的情况：contents字段长度不变，所有模块id不变
if (custom1) {
  var show = JSON.parse(custom1); //本地配置文件保存的
  if (!show.version || !show.checkedVer || show.version < iconInit.version) {
    //没有版本号字段，或大版本号发生变化，直接覆盖本地配置文件的内容
    show = iconInit;
    pbEngine.writeLocalFile('H5LocalData1.json', JSON.stringify(show));
  } else if (show.version == iconInit.version && show.checkedVer < iconInit.checkedVer) {
    //大版本号不变，小版本号发生变化，替换某些模块
    for (var i = 0; i < show['contents'].length; i++) {
      for (var j = 0; j < iconInit['contents'].length; j++) {
        if (show['contents'][i]['id'] == iconInit['contents'][j]['id']) {
          if (show['contents'][i]['title'] == iconInit['contents'][j]['title'] && show['contents'][i]['image1'] == iconInit['contents'][j]['image1'] && show['contents'][i]['image2'] == iconInit['contents'][j]['image2'] && show['contents'][i]['url'] == iconInit['contents'][j]['url']) {
            //都没有发生变化，跳出循环
            break;
          } else {
            show['contents'][i] = iconInit['contents'][j];
            show['contents'][i]['checked'] = "0";
            break;
          }
        }
      }
    }
    pbEngine.writeLocalFile('H5LocalData1.json', JSON.stringify(show));
  }
} else {
  var show = iconInit;
  pbEngine.writeLocalFile('H5LocalData1.json', JSON.stringify(show));
}

var custom2 = show.contents;

var custom = [];
for (var i = 0; i < custom2.length; i++) {
  if (custom2[i]['checked'] == '1') {
    custom.push(custom2[i]);
  }
}

keep = custom;
var length = custom.length,
    num;
if (length < 4) {
  num = 1;
  ReactDOM.render(React.createElement(CustButtonO, { button: custom }), document.getElementById('customized'));
} else if (length >= 4 && length < 8) {
  num = 1;
  ReactDOM.render(React.createElement(CustButtonT, { button: custom }), document.getElementById('customized'));
} else if (length >= 8 && length < 12) {
  num = 2;
  ReactDOM.render(React.createElement(CustButtonTh, { button: custom }), document.getElementById('customized'));
} else if (length >= 12 && length < 16) {
  num = 2;
  ReactDOM.render(React.createElement(CustButtonF, { button: custom }), document.getElementById('customized'));
} else if (length >= 16 && length < 20) {
  num = 3;
  ReactDOM.render(React.createElement(CustButtonFi, { button: custom }), document.getElementById('customized'));
}
if (num >= 2) {
  $('#customized .area>div').css('float', 'left');
  $('#customized').css('margin-bottom', '0');
  $('#customized').css('padding-bottom', '8px');
  $('#customized').css('border-bottom', '');
  //图标滑动
  var width = document.documentElement.clientWidth;
  $('.btn-group').css('width', width);
  $('.btn-group>div').css('width', width / 4);
  $('#customized .area').css('width', width * num);
  $('#customized .area>div').css('width', width);
  if (num == 2) {
    $('#ind3').addClass('hide');
    $('#ind1').removeClass();
    $('#ind2').removeClass();
    $('#ind1').addClass('ind');
    $(document).ready(function () {
      try {
        var navScroll = new IScroll('#customized', {
          eventPassthrough: true,
          scrollX: true,
          scrollY: false,
          preventDefault: false,
          snap: '.btn-wrap',
          tap: true,
          mouseWheelSpeed: 10
        });
        navScroll.on('scrollEnd', function () {
          if (this.x >= 0) {
            $('#ind2').removeClass();
            $('#ind1').addClass('ind');
          } else if (this.x < 0 && this.x >= -width) {
            $('#ind1').removeClass();
            $('#ind2').addClass('ind');
          }
        });
      } catch (e) {}
    });
  } else if (num == 3) {
    $('#ind1').removeClass();
    $('#ind2').removeClass();
    $('#ind3').removeClass();
    $('#ind1').addClass('ind');
    $(document).ready(function () {
      try {
        var navScroll = new IScroll('#customized', {
          eventPassthrough: true,
          scrollX: true,
          scrollY: false,
          preventDefault: false,
          snap: '.btn-wrap',
          tap: true,
          mouseWheelSpeed: 10
        });
        navScroll.on('scrollEnd', function () {
          if (this.x >= 0) {
            $('#ind2').removeClass();
            $('#ind3').removeClass();
            $('#ind1').addClass('ind');
          } else if (this.x < 0 && this.x >= -width) {
            $('#ind1').removeClass();
            $('#ind3').removeClass();
            $('#ind2').addClass('ind');
          } else if (this.x < -width && this.x >= -(2 * width)) {
            $('#ind1').removeClass();
            $('#ind2').removeClass();
            $('#ind3').addClass('ind');
          }
        });
      } catch (e) {}
    });
  }
} else if (num < 2) {
  $('#customized .area>div').css('float', '');
  $('#customized').css('padding-bottom', '8px');
  $('#customized .area').css('margin-bottom', '0');
  $('#customized').css('border-bottom', '');
  $('#ind1').addClass('hide');
  $('#ind2').addClass('hide');
  $('#ind3').addClass('hide');
}
/*if (num == 1) {
  $('#ind1').css('background-color':'red', 'height':'12px', 'width':'12px');
  $('#ind2').addClass('hide');
  $('#ind3').addClass('hide');
} else if (num == 2) {
  $('#ind3').addClass('hide');
} else if (num == 3) {
  
}*/

function reload() {
  pbEngine.queryInfoListWithJson(JSON.stringify(newsListData));
  symbolData = {};
  marketData = [];
  /*column = [{'6': '29'}];*/
  contract0 = [{ "market": "1000", "name": "上证指数", "code": "000001" }, { "code": "399001", "market": "1001", "name": "深证成指" }, { "market": "1001", "name": "创业板指", "code": "399006" }];
  contract = contract0;
  showCon();

  custom1 = pbEngine.readLocalFile('H5LocalData1.json');
  if (custom1) {
    show = JSON.parse(custom1);
  } else {
    show = iconInit;
  }
  custom2 = show.contents;
  custom = [];
  for (var i = 0; i < custom2.length; i++) {
    if (custom2[i]['checked'] == '1') {
      custom.push(custom2[i]);
    }
  }

  if (keep.length == custom.length) {
    for (var y = 0; y < custom.length; y++) {
      if (custom[y].title == keep[y].title) {
        continue;
      } else {
        break;
      }
    }
    if (y >= custom.length) {
      return;
    }
  }
  keep = custom;
  var length = custom.length,
      num;
  if (length < 4) {
    num = 1;
    ReactDOM.render(React.createElement(CustButtonO, { button: custom }), document.getElementById('customized'));
  } else if (length >= 4 && length < 8) {
    num = 1;
    ReactDOM.render(React.createElement(CustButtonT, { button: custom }), document.getElementById('customized'));
  } else if (length >= 8 && length < 12) {
    num = 2;
    ReactDOM.render(React.createElement(CustButtonTh, { button: custom }), document.getElementById('customized'));
  } else if (length >= 12 && length < 16) {
    num = 2;
    ReactDOM.render(React.createElement(CustButtonF, { button: custom }), document.getElementById('customized'));
  } else if (length >= 16 && length < 20) {
    num = 3;
    ReactDOM.render(React.createElement(CustButtonFi, { button: custom }), document.getElementById('customized'));
  }
  if (num >= 2) {
    $('#customized .area>div').css('float', 'left');
    $('#customized').css('margin-bottom', '0');
    $('#customized').css('padding-bottom', '8px');
    $('#customized').css('border-bottom', '');
    //图标滑动
    var width = document.documentElement.clientWidth;
    $('.btn-group').css('width', width);
    $('.btn-group>div').css('width', width / 4);
    $('#customized .area').css('width', width * num);
    $('#customized .area>div').css('width', width);
    if (num == 2) {
      $('#ind3').addClass('hide');
      $('#ind1').removeClass();
      $('#ind2').removeClass();
      $('#ind1').addClass('ind');
      $(document).ready(function () {
        try {
          var navScroll = new IScroll('#customized', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false,
            snap: '.btn-wrap',
            tap: true,
            mouseWheelSpeed: 10
          });
          navScroll.on('scrollEnd', function () {
            if (this.x >= 0) {
              $('#ind2').removeClass();
              $('#ind1').addClass('ind');
            } else if (this.x < 0 && this.x >= -width) {
              $('#ind1').removeClass();
              $('#ind2').addClass('ind');
            }
          });
        } catch (e) {}
      });
    } else if (num == 3) {
      $('#ind1').removeClass();
      $('#ind2').removeClass();
      $('#ind3').removeClass();
      $('#ind1').addClass('ind');
      $(document).ready(function () {
        try {
          var navScroll = new IScroll('#customized', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false,
            snap: '.btn-wrap',
            tap: true,
            mouseWheelSpeed: 10
          });
          navScroll.on('scrollEnd', function () {
            if (this.x >= 0) {
              $('#ind2').removeClass();
              $('#ind3').removeClass();
              $('#ind1').addClass('ind');
            } else if (this.x < 0 && this.x >= -width) {
              $('#ind1').removeClass();
              $('#ind3').removeClass();
              $('#ind2').addClass('ind');
            } else if (this.x < -width && this.x >= -(2 * width)) {
              $('#ind1').removeClass();
              $('#ind2').removeClass();
              $('#ind3').addClass('ind');
            }
          });
        } catch (e) {}
      });
    }
  } else if (num < 2) {
    $('#customized .area>div').css('float', '');
    $('#customized').css('padding-bottom', '8px');
    $('#customized .area').css('margin-bottom', '0');
    $('#customized').css('border-bottom', '');
    $('#ind1').addClass('hide');
    $('#ind2').addClass('hide');
    $('#ind3').addClass('hide');
  }
}

//东证的信息
//判断用户是否登录
readOrLogin();
function readOrLogin() {
  if (window.pbEngine) {
    var data = pbEngine.getPublicData("PbKey_Home_Verify");
    if (data == undefined || data == 0) {
      //如果等于0就是不存在就要去登录或则注册否则是游客
      $("#flagDZLogin").css('display', "block");
    } else {
      $("#flagDZLogin").css('display', "none");
    }
  }
}

//if(window){
//  //查询东证头条信息
//  var newsDzListData = { type: 'mu', groupIDs: ['511701'], doc: 'json', count: '2' };
//  pbEngine.queryInfoListWithJson(JSON.stringify(newsDzListData));
//}
////获取头条信息
//function callback(message){
//  var msg = JSON.parse(message);
//  if(msg){
//    var dzTtileInfo = msg.Indexes.slice(0,2);
//    ReactDOM.render(<DzNewsList dzTtileInfo={dzTtileInfo}/>, document.getElementById('dzNewsList'));
//  }
//}
var DzNewsList = React.createClass({
  displayName: 'DzNewsList',

  render: function () {
    return React.createElement(
      'div',
      { className: 'exitLoginInfo2' },
      this.props.dzTtileInfo.map(function (dataValue) {
        var url = 'pobo:info/newsNotice-list.html?pageId=900005';
        return React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { href: url },
            React.createElement(
              'div',
              { className: 'newTitle' },
              dataValue.Title ? dataValue.Title : '----'
            )
          )
        );
        //return<li><a href={url}>{dataValue.Title}</a></li>
      })
    );
  }
});
