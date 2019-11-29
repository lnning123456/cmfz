package com.baizhi.service;

import com.baizhi.dao.BannerDao;
import com.baizhi.entity.Banner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class BannerServiceImpl implements BannerService {
    @Autowired
    BannerDao bannerDao;

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public List<Banner> findPage(Integer start, Integer page) {
        return bannerDao.findPage(start, page);
    }

    @Override
    public void addBanner(Banner banner) {
        bannerDao.addBanner(banner);
    }

    @Override
    public List<Banner> findAll() {
        return bannerDao.findAll();
    }

    @Override
    public void updateBanner(Banner banner) {
        bannerDao.updateBanner(banner);
    }

    @Override
    public List<Banner> findBannerAll() {
        return bannerDao.findBannerAll();
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public Map<String, Object> queryByPage(Integer page, Integer rows) {
        Map<String, Object> map = new HashMap<>();
        Integer records = bannerDao.getCount();
        Integer total = records % rows == 0 ? records / rows : records / rows + 1;
        Integer start = (page - 1) * rows;
        List<Banner> banners = bannerDao.queryByPage(start, rows);
        map.put("total", total);
        map.put("records", records);
        map.put("page", page);
        map.put("rows", banners);
        // total  总页数
        // records  总条数
        //page
        //rows     数据集合
        return map;
    }

    @Override
    public String add(Banner banner) {
        String id = UUID.randomUUID().toString();

        banner.setId(id);
        banner.setCreateDate(new Date());

        bannerDao.add(banner);

        return id;
    }

    @Override
    public void updateUrl(String id, String imgPath) {
        bannerDao.updateUrl(id, imgPath);
    }

    @Override
    public void updateStatus(Banner banner) {
        bannerDao.updateStatus(banner);
    }

    @Override
    public void del(String[] ids) {
        bannerDao.del(ids);
    }
}
