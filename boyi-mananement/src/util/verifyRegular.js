/**
 * Created by xiajing on 2016/11/11.
 */
//手机号验证
export var phoneRegexp=/^(13|15|18|14|17)[0-9]{9}$/;
//转换反斜杠
export var backRelease = (/\\/g,"/");

//校验图片格式
export function getFileType(filename){
    var extStart  = filename.lastIndexOf(".")+1;
    return filename.substring(extStart,filename.length).toUpperCase();
}
export var allowtype =  ["JPG","GIF","PNG","BMP"];
export var allowZipType =['ZIP']
export var allowFileType =['CSS','HTML','TXT','JS','JSON','JSX','VUE']
export var showFile = ["JPG","GIF","PNG","BMP",'HTML']
//export var showFile ='JPG,GIF,PNG,BMP,HTML'
export var httpsType = 'http://,https://'
//校验版本号的输入
//export var verRegexp = /^(\d{1,2}\.){2}\d{1,3}$/;
export var verRegexp = /^(((([1-9])(\d)?)|0)\.){2}((([1-9])(\d{1,2})?)|0)$/;
export var androidApk = 'APK';
export var iosIpa = 'IPA';

