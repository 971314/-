package com.pobo.model;

public class Admin {
	int C_Id;
	String C_UserName;
	String C_Password;
	int C_IsValid;
	int C_Group;
	String NewPassword;

	public int getC_Id() {
		return C_Id;
	}

	public void setC_Id(int c_Id) {
		C_Id = c_Id;
	}

	public String getC_UserName() {
		return C_UserName;
	}

	public void setC_UserName(String c_UserName) {
		C_UserName = c_UserName;
	}

	public String getC_Password() {
		return C_Password;
	}

	public void setC_Password(String c_Password) {
		C_Password = c_Password;
	}

	public int getC_IsValid() {
		return C_IsValid;
	}

	public void setC_IsValid(int c_IsValid) {
		C_IsValid = c_IsValid;
	}

	public int getC_Group() {
		return C_Group;
	}

	public void setC_Group(int c_Group) {
		C_Group = c_Group;
	}

	public String getNewPassword() {
		return NewPassword;
	}

	public void setNewPassword(String newPassword) {
		NewPassword = newPassword;
	}
}
