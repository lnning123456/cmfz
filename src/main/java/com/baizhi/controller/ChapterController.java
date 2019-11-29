package com.baizhi.controller;

import com.baizhi.entity.Chapter;
import com.baizhi.service.ChapterService;
import org.apache.commons.io.FileUtils;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.AudioHeader;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("chapter")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;

    @RequestMapping("edit")
    public String add(String aId, String oper, Chapter chapter, String[] id) {
        if (oper.equals("add")) {
            chapter.setAlbumId(aId);
            System.out.println("chapter = " + chapter);
            String chapterId = chapterService.add(chapter);
            return chapterId;
        }
        if (oper.equals("edit")) {
            // bannerService.updateStatus(banner);
            System.out.println("update oper = " + oper);

        }
        if (oper.equals("del")) {
            chapterService.del(id);
        }

        return null;
    }

    @RequestMapping("upload")
    public void upload(MultipartFile url, String chapterId, HttpSession session) throws TagException, ReadOnlyFileException, CannotReadException, InvalidAudioFrameException, IOException {
        String realPath = session.getServletContext().getRealPath("/audio/");
        File file = new File(realPath);
        if (!file.exists()) {
            file.mkdirs();
        }
        String filename = url.getOriginalFilename();
        String newFileName = new Date().getTime() + "_" + filename;

        try {
            url.transferTo(new File(file, newFileName));
        } catch (IOException e) {
            e.printStackTrace();
        }
        Chapter chapter = new Chapter();
        chapter.setId(chapterId);
        chapter.setUrl(newFileName);
        long l = url.getSize();
        String size = l / 1024 / 1024 + "MB";

        AudioFile read = AudioFileIO.read(new File(realPath, newFileName));

        AudioHeader audioHeader = read.getAudioHeader();
        int trackLength = audioHeader.getTrackLength();
        String m = trackLength / 60 + "分";
        String s = trackLength % 60 + "秒";
        chapter.setSize(size);
        chapter.setPlayTime(m + s);

        chapterService.updateUrl(chapter);

    }

    @RequestMapping("down")
    public void down(String audio, HttpSession session, HttpServletResponse response) throws UnsupportedEncodingException {
        String realPath = session.getServletContext().getRealPath("/audio");
        File file = new File(realPath, audio);
        String s = audio.split("_")[1];
        String encode = URLEncoder.encode(s, "UTF-8");
        response.setHeader("content-disposition", "attachment;fileName=" + encode);
        ServletOutputStream outputStream = null;
        try {
            outputStream = response.getOutputStream();
            FileUtils.copyFile(file, outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }

    @RequestMapping("queryByPage")
    public Map<String, Object> queryByPage(Integer page, Integer rows, String aId) {

        return chapterService.queryByPage(page, rows, aId);
    }
}
