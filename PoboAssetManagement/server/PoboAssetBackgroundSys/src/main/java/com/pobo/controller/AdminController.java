package com.pobo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.pobo.dao.mapper.AdminMapper;
import com.pobo.model.Admin;

@Controller
public class AdminController {
	@Autowired
	AdminMapper adminMapper;
	public Admin CheckPassword(Admin admin)
	{
		return adminMapper.CheckPassword(admin);
	}
	
	public int ChangePassword(Admin admin)
	{
		return adminMapper.ChangePassword(admin);
	}
}