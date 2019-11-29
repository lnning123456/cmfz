package com.baizhi.service;

import com.baizhi.entity.Album;

import java.util.Map;

public interface AlbumService {
    Map<String, Object> queryByPage(Integer page, Integer rows);

    String add(Album album);

    void del(String[] ids);

    void updateUrl(Album album);

    void updateStatus(Album album);
}
