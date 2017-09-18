package com.pobo.dao.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * Project: PoboAssetBackgroundSys
 * Comments: MyBatis 接口
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-9-23 9:44
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Repository
public interface AdminMapper {
	public int insertAdmin(@Param("userName") String userName,
	                       @Param("password") String password,
	                       @Param("orgNumber") String orgNumber);

	public int checkAdminInfo(@Param("userName") String userName,
	                          @Param("password") String password);
}
