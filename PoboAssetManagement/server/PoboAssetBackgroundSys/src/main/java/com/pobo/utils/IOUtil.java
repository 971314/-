package com.pobo.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class IOUtil {
	public static boolean writeToFile(InputStream ins, String path ,String name) { 
		OutputStream out = null;
		File file= new File(path+"\\"+ name);
        try {  
        	  if(!file.getParentFile().exists()){          		  
        		  file.getParentFile().mkdirs();       
        	    } 
        	 out = new FileOutputStream(file);      	 
            int read = 0;  
            byte[] bytes = new byte[1024];  
  
            while ((read = ins.read(bytes)) != -1) {  
                out.write(bytes, 0, read);  
            } 
            return true;
        } catch (Exception e) {  
            e.printStackTrace();
            return false;
        }finally{
         try {
				ins.close();
				if(out != null){
        			out.flush();
					out.close();
				}
			  } catch (IOException e) {		
					e.printStackTrace();
				}
        		out = null;
        	}
        }  
}
