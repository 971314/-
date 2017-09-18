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
public interface LoginService {

	@POST
	@Path(value = "/login")
	public Map newLogin(@FormParam("poboNumber") String poboNumber,
	                    @FormParam("loginName") String loginName,
	                    @FormParam("loginType") String loginType,
	                    @FormParam("pwd") String pwd,
	                    @FormParam("deviceId") String devicdId,
	                    @FormParam("OS") String OS,
	                    @FormParam("version") String version,
	                    @FormParam("orgNumber") String orgNumber);

	@POST
	@Path(value = "/tokenUpdate")
	public Map updateToken(@FormParam("loginName") String loginName,
	                       @FormParam("uid") String uid,
	                       @FormParam("oldToken") String oldToken);


	@POST
	@Path(value = "/tokenlogin")
	public Map tokenLogin(@FormParam("poboNumber") String poboNumber,
	                      @FormParam("uid") String uid,
	                      @FormParam("deviceId") String deviceId,
	                      @FormParam("OS") String OS,
	                      @FormParam("vsersion") String vsersion,
	                      @FormParam("token") String token,
	                      @FormParam("address") String address,
	                      @FormParam("orgNumber") String orgNumber);


}
