/**
 * Created by xiajing on 2016/8/26.
 */
 function callback(message){
    var _this = this;
    if(message){
        var msg = JSON.parse(message);
        alert(msg)
        if(msg.functionNO == 101001){
            _this.context.router.push('/registerStepFour')
        }
    }
}
