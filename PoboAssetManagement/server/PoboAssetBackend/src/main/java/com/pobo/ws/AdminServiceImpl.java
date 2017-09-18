package com.pobo.ws;

import org.springframework.stereotype.Service;

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

@Service(value = "adminService")
public class AdminServiceImpl implements AdminService {

	@Override
	public Map newAdmin(String userName, String password, String orgNumber) {
		return null;
	}

	@Override
	public Map checkAdminInfo(String userName, String password) {
		return null;
	}
}
