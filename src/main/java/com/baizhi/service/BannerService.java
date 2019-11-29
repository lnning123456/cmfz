package com.baizhi.service;

import com.baizhi.entity.Banner;

import java.util.List;
import java.util.Map;


public interface BannerService {

    List<Banner> findPage(Integer start, Integer page);

    void addBanner(Banner banner);

    List<Banner> findAll();

    void updateBanner(Banner banner);

    List<Banner> findBannerAll();

    Map<String, Object> queryByPage(Integer page, Integer rows);

    String add(Banner banner);

    void updateUrl(String id, String imgPath);

    void updateStatus(Banner banner);

    void del(String[] ids);
}
