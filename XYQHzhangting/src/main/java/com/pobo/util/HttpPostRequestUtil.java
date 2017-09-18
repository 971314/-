package com.pobo.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

public class HttpPostRequestUtil {

	public static String JSESSIONID = "";
	/**
	 * 向指定 URL 发送POST方法的请求
	 * 
	 * @param url
	 *            发送请求的 URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return 所代表远程资源的响应结果
	 */
	public static String sendPost(String url, Map<String,String> mapParam,String codeType) {
		PrintWriter out = null;
		BufferedReader in = null;
		String result = "";
		try {
			StringBuffer param = new StringBuffer();
			for (String key: mapParam.keySet())
			{
				param.append(key).append("=").append(URLEncoder.encode(mapParam.get(key), codeType)).append("&");
			}
			URL realUrl = new URL(url);
			HttpURLConnection conn = (HttpURLConnection)realUrl.openConnection();
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestMethod("POST");
			conn.setRequestProperty("content-type", "application/x-www-form-urlencoded;charset="+codeType);
			if(mapParam.containsKey("service"))
			{
				if (!"login".equals(mapParam.get("service"))) {
					conn.setRequestProperty("cookie", "JSESSIONID=" + JSESSIONID);
				}
			}
			conn.setDoOutput(true);
			conn.setDoInput(true);
			out = new PrintWriter(conn.getOutputStream());
			out.print(param);
			out.flush();
			in = new BufferedReader(new InputStreamReader(conn.getInputStream(),"utf-8"));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			System.out.println("发送 POST 请求出现异常！" + e);
			e.printStackTrace();
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		System.out.println("result:"+result);
		return result;
	}
	
	public static void main(String[] args)
	{
		String a="";
		try {
			a=new String("{\"head\":{\"message\":\"鏈櫥褰曟垨鐧诲綍宸茶秴鏃�!\",\"code\":\"999\"}}".getBytes("GBK"),"utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(a);
	}
}
