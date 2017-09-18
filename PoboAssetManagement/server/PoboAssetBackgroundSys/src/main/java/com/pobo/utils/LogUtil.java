package com.pobo.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.sf.json.JSONObject;
import com.pobo.constant.OperationLogType;
import com.pobo.model.GetOpetationLog;

public class LogUtil {
	public static List<HashMap<String,String>> LogGenerator(List<GetOpetationLog> list)
	{
		List<HashMap<String,String>> mapList=new ArrayList<HashMap<String,String>>();
		for(GetOpetationLog log:list)
		{
			HashMap<String,String> map=new HashMap<String,String>();
			if(log.getType().equals(OperationLogType.CustomerLog))
			{
				if(log.getAdminid()!=null&&!"".equals(log.getAdminid()))
				{
					map.put("record", "管理员"+log.getAdmin()+"变更了客户信息");
				}
				else
				{
					map.put("record", "客户信息变更");
				}
			}
			else if(log.getType().equals(OperationLogType.ProductLog))
			{
				JSONObject json=JSONObject.fromObject(log.getContent());
				if(json.containsKey("status"))
				{
					String statusid=json.get("status").toString().trim();
					if(statusid.equals("1"))
					{
						map.put("record", "管理员"+log.getAdmin()+"变更产品状态为:上线");
					}
					else if(statusid.equals("2"))
					{
						map.put("record", "管理员"+log.getAdmin()+"变更产品状态为:下架");
					}
				}
				else
				{
					if(json.containsKey("description"))
					{
						map.put("record", "管理员"+log.getAdmin()+json.getString("description"));
					}
					else
					{
						map.put("record", "管理员"+log.getAdmin()+"变更产品信息");
					}
				}
			}
			else if(log.getType().equals(OperationLogType.BookingLog))
			{
				JSONObject json=JSONObject.fromObject(log.getContent());
				String statusid=json.get("status").toString().trim();
				if(statusid.equals("1"))
				{
					map.put("record", "客户预约");
				}
				else if(statusid.equals("2"))
				{
					map.put("record", "管理员"+log.getAdmin()+"变更预约信息状态为:处理中");
				}
				else if(statusid.equals("3"))
				{
					map.put("record", "管理员"+log.getAdmin()+"变更预约信息状态为:已购买");
				}
				else if(statusid.equals("4"))
				{
					map.put("record", "管理员"+log.getAdmin()+"变更预约信息状态为:已取消");
				}
			}
			else if(log.getType().equals(OperationLogType.AdminLoginLogout))
			{
				map.put("record", "");
			}
			else if(log.getType().equals(OperationLogType.CustomerLoginLogout))
			{
				map.put("record", "");
			}
			else if(log.getType().equals(OperationLogType.ExcelImportLog))
			{
				map.put("record", "管理员"+log.getAdmin()+"导入净值");
			}
			map.put("time", log.getTime());
			mapList.add(map);
		}
		return mapList;
		
	}
}
