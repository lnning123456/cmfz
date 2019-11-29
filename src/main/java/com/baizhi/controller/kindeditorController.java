package com.baizhi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("kindeditor")
public class kindeditorController {
    @RequestMapping("upload")
    public Map<String, Object> upload(MultipartFile img, HttpServletRequest request) throws IOException {
        //{"error":0,"url":"\/ke4\/attached\/W020091124524510014093.jpg"}
        Map<String, Object> map = new HashMap<>();
        String realPath = request.getSession().getServletContext().getRealPath("/img/");
        File file = new File(realPath);
        if (!file.exists()) {
            file.mkdirs();
        }
        String filename = img.getOriginalFilename();
        String newName = new Date().getTime() + "_" + filename;

        img.transferTo(new File(realPath, newName));

        map.put("error", 0);

        String scheme = request.getScheme();
        InetAddress localHost = Inet4Address.getLocalHost();
        String address = localHost.getHostAddress();
        int port = request.getServerPort();
        String path = request.getContextPath();


        String url = scheme + "://" + address + ":" + port + path + "/img/" + newName;
        // http ://127.0.0.1:8989/cmfz/img/
        map.put("url", url);

        return map;
    }

    @RequestMapping("getAllImg")
    public Map<String, Object> getAll(HttpServletRequest request) throws UnknownHostException {
        Map<String, Object> map = new HashMap<>();
        List<Map<String, Object>> list = new ArrayList<>();

        String realPath = request.getSession().getServletContext().getRealPath("/img/");
        File file = new File(realPath);
        String[] names = file.list();
        for (String name : names) {
            Map<String, Object> stringObjectHashMap = new HashMap<>();
            stringObjectHashMap.put("is_dir", false);
            stringObjectHashMap.put("has_file", false);
            File file1 = new File(realPath, name);
            long length = file1.length();
            stringObjectHashMap.put("filesize", length);
            stringObjectHashMap.put("is_photo", true);
            String s = name.substring(name.lastIndexOf(".") + 1);
            stringObjectHashMap.put("filetype", s);
            stringObjectHashMap.put("filename", name);
            boolean b = name.contains("_");
            if (b) {
                String s1 = name.split("_")[0];
                Long aLong = Long.valueOf(s1);
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String s2 = format.format(aLong);
                stringObjectHashMap.put("datetime", s2);
            }
            if (!b) {
                stringObjectHashMap.put("datetime", new Date());
            }

            stringObjectHashMap.put("datetime", name);
            stringObjectHashMap.put("dir_path", "");
            list.add(stringObjectHashMap);
        }
        String scheme = request.getScheme();
        InetAddress localHost = Inet4Address.getLocalHost();
        String address = localHost.getHostAddress();
        int port = request.getServerPort();
        String path = request.getContextPath();


        String url = scheme + "://" + address + ":" + port + path + "/img/";
        /*
        * {
	"moveup_dir_path": "",
	"current_dir_path": "",
	"current_url": "\/ke4\/php\/..\/attached\/",
	"total_count": 5,
	"file_list": [
	{
		"is_dir": false,
		"has_file": false,
		"filesize": 208736,
		"dir_path": "",
		"is_photo": true,
		"filetype": "jpg",
		"filename": "1241601537255682809.jpg",
		"datetime": "2018-06-06 00:36:39"
	}]
}
        * */
        map.put("moveup_dir_path", "");
        map.put("current_dir_path", "");

        map.put("current_url", url);
        map.put("total_count", names.length);
        map.put("file_list", list);
        return map;
    }
}
