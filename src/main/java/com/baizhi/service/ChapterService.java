package com.baizhi.service;

import com.baizhi.entity.Chapter;

import java.util.Map;

public interface ChapterService {

    Map<String, Object> queryByPage(Integer page, Integer rows, String aId);

    String add(Chapter chapter);

    void updateUrl(Chapter chapter);

    void del(String[] ids);

}
