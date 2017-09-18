package com.pobo.ws;


import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Map;

/**
 * Project: PoboAssetBackgroundSys
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/27 9:57
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Path(value = "/")
@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
public interface RegisterService {

	@POST
	@Path(value = "/firstregister")
	Map register(@FormParam("poboNumber") String poboNumber,
	             @FormParam("loginName") String loginName,
	             @FormParam("loginType") String loginType,
	             @FormParam("deviceId") String devicdId,
	             @FormParam("pwd") String pwd,
	             @FormParam("FatherAccount") String FatherAccount,
	             @FormParam("OS") String OS,
	             @FormParam("version") String version,
	             @FormParam("orgNumber") String orgNumber);


	@POST
	@Path(value = "/checkRegister")
	Map checkOTP(@FormParam("poboNumber") String poboNumber,
	             @FormParam("loginName") String loginName,
	             @FormParam("loginType") String loginType,
	             @FormParam("OTP") String OTP,
	             @FormParam("deviceId") String devicId,
	             @FormParam("pwd") String pwd,
	             @FormParam("orgNumber") String orgNumber,
	             @FormParam("uid") String uid);

}
