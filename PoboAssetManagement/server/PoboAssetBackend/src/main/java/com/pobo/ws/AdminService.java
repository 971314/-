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
@Produces(value = MediaType.APPLICATION_JSON)
public interface AdminService {

	@POST
	@Path(value = "/admin/new")
	Map newAdmin(@FormParam("username") String userName,
	             @FormParam("password") String password,
	             @FormParam("orgNumber") String orgNumber);

	@POST
	@Path(value = "/admin/check")
	Map checkAdminInfo(@FormParam("username") String userName,
	                   @FormParam("password") String password);
}
