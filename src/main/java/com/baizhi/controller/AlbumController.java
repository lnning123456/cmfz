package com.baizhi.controller;

import com.baizhi.entity.Album;
import com.baizhi.service.AlbumService;
import org.assertj.core.util.Compatibility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("album")
public class AlbumController {

    @Autowired
    AlbumService albumService;

    @RequestMapping("edit")
    public String add(String oper, Album album, String[] id) {
        if (oper.equals("add")) {
            String albumId = albumService.add(album);
            return albumId;
        }
        if (oper.equals("edit")) {
          //  Compatibility.System.out.println("edit");
        }
        if (oper.equals("del")) {
            albumService.del(id);
        }

        return null;
    }

    @RequestMapping("upload")
    public void upload(MultipartFile illustration, String albumId, HttpSession session) {
        String realPath = session.getServletContext().getRealPath("/img/");
        File file = new File(realPath);
        if (!file.exists()) {
            file.mkdirs();
        }
        String filename = illustration.getOriginalFilename();
        String newFileName = new Date().getTime() + "_" + filename;

        try {
            illustration.transferTo(new File(file, newFileName));
        } catch (IOException e) {
            e.printStackTrace();
        }
        Album album = new Album();
        album.setId(albumId);
        album.setIllustration(newFileName);
        System.out.println("upload album = " + album);
        albumService.updateUrl(album);

    }

    @RequestMapping("queryByPage")
    public Map<String, Object> queryByPage(Integer page, Integer rows, Album album) {
        System.out.println("queryByPage album = " + album);
        return albumService.queryByPage(page, rows);
    }
}
