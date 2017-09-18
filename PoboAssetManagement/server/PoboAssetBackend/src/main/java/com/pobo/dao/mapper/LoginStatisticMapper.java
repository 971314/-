package com.pobo.dao.mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Project: PoboAssetBackgroundSys
 * Comments: <对此类的描述，可以引用系统设计中的描述>
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
public interface LoginStatisticMapper {
	public int insertLoginInfo(@Param("userId") long userId,
	                           @Param("userName") String userName,
	                           @Param("orgNumber") String orgNumber);

	public List<Map<String, Object>> queryLoginCount(@Param("month") int month,
	                                                 @Param("orgNumber") int orgNumber,
	                                                 @Param("offset") int offset,
	                                                 @Param("pagesize") int pagesize);

	public int countLogin(@Param("month") int month,
	                      @Param("orgNumber") int orgNumber);

	public List<Map<String, Object>> queryLoginInfo(@Param("userId") int userId,
	                                                @Param("orgNumber") int orgNumber,
	                                                @Param("offset") int offset,
	                                                @Param("pagesize") int pagesize);

	public int countLoginInfo(@Param("userId") int userId,
	                          @Param("orgNumber") int orgNumber);

	public List<Map<String, Object>> queryByDateAndId(@Param("userId") int userId,
	                                                  @Param("fromDate") String fromDate,
	                                                  @Param("toDate") String toDate,
	                                                  @Param("orgNumber") int orgNumber);

}
