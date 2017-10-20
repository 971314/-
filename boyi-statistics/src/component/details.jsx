import  React,{Component} from 'react';
import {initDate, getLastYearYestdy,day,month,setDateDate,setMonthDeta,setDateHis} from '../js/main';
import { History } from 'react-router';

class Details extends Component{
    constructor(props){
        super(props);
        var d = new Date();
        var datas = new Date(d.getTime() - 7 * 24 * 3600 * 1000);
        var year = datas.getFullYear();
        var month = (datas.getMonth() + 1) + '';
        var day = datas.getDate()+'';
        var hour = datas.getHours();
        var minute = datas.getMinutes();
        var second = datas.getSeconds();
        var date = d.getDate() + '',
            monthb = (d.getMonth() + 1) + '';
        date = setDateDate(date);
        day = setDateDate(day);
        month = setDateHis(month);
        monthb = setDateHis(monthb);
        var endTime = d.getFullYear()+"/"+monthb+"/"+date,
            beginTime = year + '/' + month + '/' + day;
        this.state = {
            beginTime:beginTime,
            endTime:endTime,
            summaryArray:[],
            currentPage:1,
            totalFrontPage:'',
            name:'',
            sessionId:''
        };
    }
    componentDidMount(){
        initDate();
        var _this = this;
        var sessionData = sessionStorage.getItem("sessionInfo");
        if(sessionData != null && sessionData!= ''){
            var dat = JSON.parse(sessionData);
            _this.setState({
                name:dat.name,
                sessionId:dat.sessionId
            });
            var data = {
                "func": 401,
                "data": {
                    "name": dat.name,
                    "sessionId": dat.sessionId,
                    "beginTime":this.state.beginTime.replace(/\//g,''),
                    "endTime": this.state.endTime.replace(/\//g,''),
                    "pageNumber":'0',
                    "pageSize": "12",
                    "moblie": $('#moblie').val(),
                    "code": $('#type').val()
                }
            };
            $.ajax({
                url:''+url+'/UserStatistics/WebService',
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data:JSON.stringify(data),
                success: function (data) {
                    if(data.retHead == 0){
                        var totalFrontPage = Math.ceil(data.data.maxCount/12);
                        if(data.data.maxCount == 0){
                            _this.setState({
                                summaryArray:[],
                                currentPage:0,
                                totalFrontPage:0
                            });
                            $('#inputpage').val(_this.state.currentPage);
                        }else{
                            _this.setState({
                                summaryArray:data.data.information,
                                currentPage:_this.state.currentPage,
                                totalFrontPage:totalFrontPage
                            });
                            $('#inputpage').val(_this.state.currentPage);
                        }
                    }else if(data.retHead == -6){
                        alert('请先登录');
                        _this.context.router.push('/');
                    }
                }, error: function (data) {
                    console.log("服务器异常");
                }
            });
        }
    }
    inquiriesClick(){
        var _this = this;
        var endTime = $('#endTime').val().replace(/\//g,''),
            beginTime = $('#beginTime').val().replace(/\//g,''),
            type = $('#type').val();
        if(endTime < beginTime){
            alert('结束时间不能小于开始时间')
        }else{
            var data = {
                "func": 401,
                "data": {
                    "name": this.state.name,
                    "sessionId": this.state.sessionId,
                    "beginTime":beginTime,
                    "endTime": endTime,
                    "pageNumber":'0',
                    "pageSize": "12",
                    "moblie": $('#moblie').val(),
                    "code": $('#type').val()
                }
            };
            $.ajax({
                url:''+url+'/UserStatistics/WebService',
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data:JSON.stringify(data),
                success: function (data) {
                    var totalFrontPage = Math.ceil(data.data.maxCount/12);
                    if(data.retHead == 0){
                        beginTime = day(beginTime);
                        endTime = day(endTime);
                        if(data.data.maxCount == 0){
                            alert('没有该时间段记录');
                            _this.setState({
                                summaryArray:[],
                                currentPage:0,
                                totalFrontPage:0,
                                beginTime:beginTime,
                                endTime:endTime
                            });
                            $('#inputpage').val(_this.state.currentPage);
                        }else{
                            _this.setState({
                                summaryArray:data.data.information,
                                currentPage:1,
                                totalFrontPage:totalFrontPage,
                                beginTime:beginTime,
                                endTime:endTime
                            });
                            $('#inputpage').val(_this.state.currentPage);
                        }

                    }else if(data.retHead == -6){
                        alert('请先登录')
                        _this.context.router.push('/');
                    }
                }, error: function (data) {
                    console.log("服务器异常");
                }
            });
        }
    }
    nextPageClick(){
        $('.currentPage').hover(function () {
            $(this).css('color','#669ae1')
        },function () {
            $(this).css('color','#333333')
        });
        if(this.state.totalFrontPage >= (this.state.currentPage+1)){
            var _this = this,
                pageNumber = this.state.currentPage.toString();
            var data = {
                "func": 401,
                "data": {
                    "name": this.state.name,
                    "sessionId": this.state.sessionId,
                    "beginTime":this.state.beginTime.replace(/\//g,''),
                    "endTime": this.state.endTime.replace(/\//g,''),
                    "pageNumber": pageNumber,
                    "pageSize": "12",
                    "moblie": $('#moblie').val(),
                    "code": $('#type').val()
                }
            };
            $.ajax({
                url:''+url+'/UserStatistics/WebService',
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data:JSON.stringify(data),
                success: function (data) {
                    var totalFrontPage = Math.ceil(data.data.maxCount/12);
                    if(data.retHead == 0){
                        if(data.data.maxCount == 0){
                            _this.setState({
                                summaryArray:[],
                                currentPage:0,
                                totalFrontPage:0
                            });
                            $('#inputpage').val(_this.state.currentPage);
                        }else{
                            _this.setState({
                                summaryArray:data.data.information,
                                currentPage:_this.state.currentPage + 1,
                                totalFrontPage:_this.state.totalFrontPage
                            });
                            $('#inputpage').val(_this.state.currentPage);
                        }

                    }else if(data.retHead == -6){
                        _this.context.router.push('/');
                    }
                }, error: function (data) {
                    console.log("服务器异常");
                }
            });
        }else{
            $('.currentPage').css('color','#333333')
        }
    }
    previousPageClick(){
        if(this.state.currentPage > 1){
            $('.totalFrontPage').hover(function () {
                $(this).css('color','#669ae1')
            },function () {
                $(this).css('color','#333333')
            });
            var _this = this,
                pageNumber = (this.state.currentPage - 2).toString();
            var data = {
                "func": 401,
                "data": {
                    "name": this.state.name,
                    "sessionId": this.state.sessionId,
                    "beginTime":this.state.beginTime.replace(/\//g,''),
                    "endTime": this.state.endTime.replace(/\//g,''),
                    "pageNumber": pageNumber,
                    "pageSize": "12",
                    "moblie": $('#moblie').val(),
                    "code": $('#type').val()
                }
            };
            $.ajax({
                url:''+url+'/UserStatistics/WebService',
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data:JSON.stringify(data),
                success: function (data) {
                    var totalFrontPage = Math.ceil(data.data.maxCount/12);
                    if(data.retHead == 0){
                        if(data.data.maxCount == 0){
                            _this.setState({
                                summaryArray:[],
                                currentPage:0,
                                totalFrontPage:0
                            });
                            $('#inputpage').val(_this.state.currentPage);
                        }else{
                            _this.setState({
                                summaryArray:data.data.information,
                                currentPage:_this.state.currentPage - 1,
                                totalFrontPage:_this.state.totalFrontPage
                            });
                            $('#inputpage').val(_this.state.currentPage);
                        }

                    }else if(data.retHead == -6){
                        alert('请先登录')
                        _this.context.router.push('/');
                    }
                }, error: function (data) {
                    console.log("服务器异常");
                }
            });
        }else if(this.state.currentPage == 1){
            $('.totalFrontPage').css('color','#333333')
        }
    }
    exportClick(){
        var endTime = $('#endTime').val().replace(/\//g,''),
            beginTime = $('#beginTime').val().replace(/\//g,''),
            type = $('#type').val();
        if(endTime < beginTime){
            alert('结束时间不能小于开始时间')
        }else{
            window.open(''+url+'/UserStatistics/DownloadService?json={"func":402,"data":{"name":"'+this.state.name+'","sessionId":"'+this.state.sessionId+'","beginTime":"'+beginTime+'","endTime":"'+endTime+'","moblie":"'+$('#moblie').val()+'","code":"'+$('#type').val()+'"}}')
        }
    }
    homepageClick(){
        var _this = this;
        var data = {
            "func": 401,
            "data": {
                "name": this.state.name,
                "sessionId": this.state.sessionId,
                "beginTime":this.state.beginTime.replace(/\//g,''),
                "endTime": this.state.endTime.replace(/\//g,''),
                "pageNumber":'0',
                "pageSize": "12",
                "moblie": $('#moblie').val(),
                "code": $('#type').val()
            }
        };
        $.ajax({
            url:''+url+'/UserStatistics/WebService',
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data:JSON.stringify(data),
            success: function (data) {
                if(data.retHead == 0){
                    var totalFrontPage = Math.ceil(data.data.maxCount/12);
                    if(data.data.maxCount == 0){
                        _this.setState({
                            summaryArray:[],
                            currentPage:0,
                            totalFrontPage:0
                        });
                        $('#inputpage').val(_this.state.currentPage);
                    }else{
                        _this.setState({
                            summaryArray:data.data.information,
                            currentPage:1,
                            totalFrontPage:totalFrontPage
                        });
                        $('#inputpage').val(_this.state.currentPage);
                    }
                }else if(data.retHead == -6){
                    alert('请先登录');
                    _this.context.router.push('/');
                }
            }, error: function (data) {
                console.log("服务器异常");
            }
        });
    }
    lastPageClick(){
        var _this = this,
            pageNumber =(this.state.totalFrontPage-1).toString();
        var data = {
            "func": 401,
            "data": {
                "name": this.state.name,
                "sessionId": this.state.sessionId,
                "beginTime":this.state.beginTime.replace(/\//g,''),
                "endTime": this.state.endTime.replace(/\//g,''),
                "pageNumber":pageNumber,
                "pageSize": "12",
                "moblie": $('#moblie').val(),
                "code": $('#type').val()
            }
        };
        $.ajax({
            url:''+url+'/UserStatistics/WebService',
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data:JSON.stringify(data),
            success: function (data) {
                if(data.retHead == 0){
                    var totalFrontPage = Math.ceil(data.data.maxCount/12);
                    if(data.data.maxCount == 0){
                        _this.setState({
                            summaryArray:[],
                            currentPage:0,
                            totalFrontPage:0
                        });
                        $('#inputpage').val(_this.state.currentPage);
                    }else{
                        _this.setState({
                            summaryArray:data.data.information,
                            currentPage:_this.state.totalFrontPage,
                            totalFrontPage:Number(pageNumber)+1
                        });
                        $('#inputpage').val(_this.state.totalFrontPage);
                    }
                }else if(data.retHead == -6){
                    alert('请先登录');
                    _this.context.router.push('/');
                }
            }, error: function (data) {
                console.log("服务器异常");
            }
        });
    }
    homepageBlur(){
        var _this = this,
            data;
        if((!isNaN($('#inputpage').val())&&$('#inputpage').val() !='') ){
            if(Number($('#inputpage').val()) > this.state.totalFrontPage){
                data = {
                    "func": 401,
                    "data": {
                        "name": this.state.name,
                        "sessionId": this.state.sessionId,
                        "beginTime":this.state.beginTime.replace(/\//g,''),
                        "endTime": this.state.endTime.replace(/\//g,''),
                        "pageNumber":'0',
                        "pageSize": "12",
                        "moblie": $('#moblie').val(),
                        "code": $('#type').val()
                    }
                };
                $.ajax({
                    url:''+url+'/UserStatistics/WebService',
                    type: 'POST',
                    crossDomain: true,
                    contentType: 'application/json',
                    data:JSON.stringify(data),
                    success: function (data) {
                        var totalFrontPage = Math.ceil(data.data.maxCount/12);
                        if(data.retHead == 0){
                            if(data.data.maxCount == 0){
                                _this.setState({
                                    summaryArray:[],
                                    currentPage:0,
                                    totalFrontPage:0
                                });
                                $('#inputpage').val(_this.state.currentPage);
                            }else{
                                _this.setState({
                                    summaryArray:data.data.information,
                                    currentPage:1,
                                    totalFrontPage:_this.state.totalFrontPage
                                });
                                $('#inputpage').val(_this.state.currentPage);
                            }

                        }else if(data.retHead == -6){
                            _this.context.router.push('/');
                        }
                    }, error: function (data) {
                        console.log("服务器异常");
                    }
                });
            }else {
                var pageNumber =($('#inputpage').val() - 1).toString();
                data = {
                    "func": 401,
                    "data": {
                        "name": this.state.name,
                        "sessionId": this.state.sessionId,
                        "beginTime":this.state.beginTime.replace(/\//g,''),
                        "endTime": this.state.endTime.replace(/\//g,''),
                        "pageNumber": pageNumber,
                        "pageSize": "12",
                        "moblie": $('#moblie').val(),
                        "code": $('#type').val()
                    }
                };
                $.ajax({
                    url:''+url+'/UserStatistics/WebService',
                    type: 'POST',
                    crossDomain: true,
                    contentType: 'application/json',
                    data:JSON.stringify(data),
                    success: function (data) {
                        var totalFrontPage = Math.ceil(data.data.maxCount/12);
                        if(data.retHead == 0){
                            if(data.data.maxCount == 0){
                                _this.setState({
                                    summaryArray:[],
                                    currentPage:0,
                                    totalFrontPage:0
                                });
                                $('#inputpage').val(_this.state.currentPage);
                            }else{
                                _this.setState({
                                    summaryArray:data.data.information,
                                    currentPage:$('#inputpage').val(),
                                    totalFrontPage:_this.state.totalFrontPage
                                });
                                $('#inputpage').val(_this.state.currentPage);
                            }

                        }else if(data.retHead == -6){
                            _this.context.router.push('/');
                        }
                    }, error: function (data) {
                        console.log("服务器异常");
                    }
                });
            }
        }else{
            alert('请输入要查询的页数！');
        }
    }
    hompageFocus(){
        $(document).keydown(function(event){
            if(event && event.keyCode==13){
                $('#inputpage').blur()
            }
        });
    }
    render(){
        return(
            <div>
                <div className="mb24">
                    <span className="font18">
                        开始日期
                        <div id="datetimepicker1" className="input-append date h33 ml15">
                        <input data-format="yyyy/MM/dd" type="text" className="input outline font16" id="beginTime" value={this.state.beginTime}/>
                        <span class="add-on">
                        <i className="glyphicon glyphicon-calendar"></i>
                        </span>
                        </div>
                    </span>
                    <span className="ml15 font18">
                        结束日期
                        <div id="datetimepicker2" className="input-append date h33 ml15">
                        <input data-format="yyyy/MM/dd" type="text" className="input outline font16" id="endTime" value={this.state.endTime}/>
                        <span className="add-on">
                        <i className="glyphicon glyphicon-calendar"></i>
                        </span>
                        </div>
                    </span>
                    <span className="ml15">
                        用户手机号
                        <input type="text" className="h33 border ml15 w120 font16" id="moblie"/>
                    </span>
                    <span className="ml15 font18">
                            类型
                        <select className="select h33 ml15 w120 outline font16" id="type">
                                <option value=""></option>
                                <option value="4">登录</option>
                                <option value="9">注册</option>
                                <option value="10">修改密码</option>
                        </select>
                    </span>
                    <span className="ml33">
                        <input type="button" value="查询" className="button button-b" onClick={this.inquiriesClick.bind(this)}/>
                        <input type="button" value="导出"  className="ml10 button button-b" onClick={this.exportClick.bind(this)}/>
                    </span>

                </div>
                <div className="border w728 h539">
                    <FormHeader/>
                    <FormBody summaryArray = {this.state.summaryArray}/>
                </div>
                <div className="pagination">
                    <span className="mr15 page" onClick={this.homepageClick.bind(this)}>首页</span>
                    <span className="page totalFrontPage" onClick={this.previousPageClick.bind(this)}>上一页</span>
                    <div className="block border h24 ml15 paginpa">
                        <input type="text" className="h20 textAlign" id="inputpage" onBlur={this.homepageBlur.bind(this)} onFocus={this.hompageFocus.bind(this)}/>
                        /
                        <span className="w30">{this.state.totalFrontPage}</span>
                    </div>
                    <span className="ml15 page currentPage" onClick={this.nextPageClick.bind(this)}>下一页</span>
                    <span className="ml15 page" onClick={this.lastPageClick.bind(this)}>尾页</span>
                </div>
            </div>
        )
    }
}
class FormHeader extends Component{
    render(){
        return(
            <div>
                <ul className="fromheader details clearfloat">
                    <li>用户</li>
                    <li>类型</li>
                    <li>版本</li>
                    <li>时间</li>
                </ul>
            </div>
        )
    }
}

class FormBody extends Component{
    render(){
        return(
            <div>
                <ul className="frombody detailsbody clearfloat">
                    {
                        this.props.summaryArray.map(function(data){
                            var content = null;
                            if(data.content == '注册'){
                                content = <span style={{color:'#ff0000'}}>{data.content}</span>
                            }else if(data.content == '登录'){
                                content = <span>{data.content}</span>
                            }else if(data.content == '修改密码'){
                                content = <span style={{color:'#669ae1'}}>{data.content}</span>
                            }
                            return(
                                <li className="clearfloat">
                                    <span>{data.loginName}</span>
                                    {content}
                                    <span className="alignLeft">{data.softVersion}</span>
                                    <span>{data.time}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

Details.contextTypes = {
    router: React.PropTypes.isRequired
};
export default Details