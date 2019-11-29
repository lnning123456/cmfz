package com.baizhi.service;

import com.baizhi.dao.AlbumDao;
import com.baizhi.entity.Album;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class AlbumServiceImpl implements AlbumService {
    @Autowired
    AlbumDao albumDao;

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public Map<String, Object> queryByPage(Integer page, Integer rows) {
        Map<String, Object> map = new HashMap<>();
        Integer records = albumDao.getCount();
        Integer total = records % rows == 0 ? records / rows : records / rows + 1;
        Integer start = (page - 1) * rows;
        List<Album> album = albumDao.findPage(start, rows);
        map.put("total", total);
        map.put("records", records);
        map.put("page", page);
        map.put("rows", album);
        return map;
    }

    @Override
    public String add(Album album) {
        String id = UUID.randomUUID().toString();

        album.setId(id);
        album.setChapterNumber(0);
        album.setUploadTime(new Date());
        album.setGrade(0.0);
        System.out.println("album = " + album);
        albumDao.add(album);

        return id;
    }

    @Override
    public void del(String[] ids) {
        albumDao.delete(ids);
    }

    @Override
    public void updateUrl(Album album) {
        albumDao.updateUrl(album);
    }

    @Override
    public void updateStatus(Album album) {
        albumDao.updateStatus(album);
    }
}
