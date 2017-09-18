package com.pobo.ws;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pobo.controller.AdminController;
import com.pobo.model.Admin;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;

@Component(value = "adminService")
public class AdminServiceImpl implements AdminService {
	@Autowired
	AdminController admincontroller = new AdminController();

	@Override
	public WsResponse adminLogin(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		// TODO Auto-generated method stub
		Admin admin = new Admin();
		admin.setC_UserName(wr.getData().get(0).get("username"));
		admin.setC_Password(wr.getData().get(0).get("password"));
		admin = admincontroller.CheckPassword(admin);
		// 响应
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		if (admin != null) {
			if (admin.getC_IsValid() == 1) {
				rmap.put("uid", admin.getC_Id());
				rmap.put("group", admin.getC_Group());
				rdata.add(rmap);
				r.setCorrect(rdata);
			} else {
				r.setError("账户已冻结，请联系管理员");
			}
		} else {
			r.setError("账户或密码不正确");
		}
		return r;
	}

	@Override
	public WsResponse adminLogout(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("msg", wr.getUid() + "登出成功");
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}

	@Override
	public WsResponse adminChangePassword(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		Admin admin = new Admin();
		admin.setC_Id(wr.getUid());
		admin.setC_Password(wr.getData().get(0).get("password"));
		admin.setNewPassword(wr.getData().get(0).get("newpassword"));
		int ChPwd = admincontroller.ChangePassword(admin);
		// 响应
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		if(ChPwd==1)
		{
			r.setCorrect();
		}
		else
		{
			r.setError("修改密码失败");
		}
		return r;
	}

}
