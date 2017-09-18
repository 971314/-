/**
 * Created by xiajing on 2016/11/18.
 */

export function getErrorMsg(data){
  if(data.status == 0){
      console.log(this)
      this.context.router.push("/");
      //return data.status;
  }else if(data.status == '-2'){//token失效
      //this.context.router.push("/");
      return data.status;
  }
}
