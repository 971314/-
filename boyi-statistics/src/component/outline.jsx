import  React,{Component} from 'react';

class Summaryinform extends Component{
    constructor(props){
        super(props);
        var d = new Date();
        var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
            time = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
        this.state = {
            sum:'',
            dayReg:'',
            dayActive:'',
            monthReg:'',
            monthActive:'',
            date:str,
            time:time
        }
    }
    componentDidMount(){
        var _this = this;
       var sessionData = sessionStorage.getItem("sessionInfo");
        if(sessionData != null && sessionData!= ''){
            var dat = JSON.parse(sessionData);
            _this.setState({
                name:dat.name,
                sessionId:dat.sessionId
            })
            var data = {
                "func": 201,
                "data": {
                    "name": dat.name,
                    "sessionId": dat.sessionId
                }
            };
            $.ajax({
                url:''+url+'/UserStatistics/WebService',
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data:JSON.stringify(data),
                success: function (data) {
                    var obj = data.data;
                    if(data.retHead == 0){
                        _this.setState({
                            sum:obj.sum,
                            dayReg:obj.dayReg,
                            dayActive:obj.dayActive,
                            monthReg:obj.monthReg,
                            monthActive:obj.monthActive
                        });
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
    render(){
        return(
            <div>
                <div className="mb26 font18">
                    最近更新日期
                    <span className="pl13">{this.state.date}</span>
                    <span className="pl13">{this.state.time}</span>
                </div>
                <div className="border w729">
                    <FormHeader/>
                    <FormBody sum={this.state.sum} dayReg={this.state.dayReg}
                              dayActive={this.state.dayActive} monthReg={this.state.monthReg} monthActive={this.state.monthActive}/>
                </div>
            </div>
        )
    }
}
class FormHeader extends Component{
    render(){
        return(
            <div>
                <ul className="fromheader outiline">
                    <li>总用户数</li>
                    <li>当日新增用户</li>
                    <li>当日登录用户</li>
                    <li>当月注册用户</li>
                    <li>当月登录用户</li>
                </ul>
            </div>
        )
    }
}

class FormBody extends Component{
    render(){
        return(
            <div>
                <ul className="frombody">
                    <li className="clearfloat">
                        <span>{this.props.sum}</span>
                        <span>{this.props.dayReg}</span>
                        <span>{this.props.dayActive}</span>
                        <span>{this.props.monthReg}</span>
                        <span>{this.props.monthActive}</span>
                    </li>
                </ul>
            </div>
        )
    }
}

Summaryinform.contextTypes = {
    router: React.PropTypes.isRequired
};
export default Summaryinform