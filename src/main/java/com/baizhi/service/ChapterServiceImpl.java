package com.baizhi.service;

import com.baizhi.dao.ChapterDao;
import com.baizhi.entity.Chapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class ChapterServiceImpl implements ChapterService {
    @Autowired
    ChapterDao chapterDao;

    @Override
    public Map<String, Object> queryByPage(Integer page, Integer rows, String aId) {
        Map<String, Object> map = new HashMap<>();
        Integer records = chapterDao.getCount(aId);
        Integer start = (page - 1) * rows;
        List<Chapter> chapters = chapterDao.findPage(page, rows, aId);
        Integer total = records % rows == 0 ? records / rows : records / rows + 1;
        map.put("total", total);
        map.put("records", records);
        map.put("page", page);
        map.put("rows", chapters);
        return map;
    }

    @Override
    public String add(Chapter chapter) {
        String id = UUID.randomUUID().toString();

        chapter.setId(id);
        chapter.setUploadTime(new Date());

        chapterDao.add(chapter);

        return id;
    }

    @Override
    public void del(String[] ids) {
        chapterDao.delete(ids);
    }

    @Override
    public void updateUrl(Chapter chapter) {

        chapterDao.updateUrl(chapter);
    }


}
