/**
 * Created by xiajing on 2016/6/24.
 */
//手机号验证
export var phoneRegexp=/^(13|15|18|14|17)[0-9]{9}$/;
//身份证校验
export var  cardNoRegexp =/^(([1-9][0-9]{5}(19[0-9]{2}|200[0-9]|201[1-3])(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[01])[0-9]{3}[0-9xX]))$/;
//6-20位字母和数字组合
export var psdRegexp =/[a-zA-Z0-9]{6,20}/