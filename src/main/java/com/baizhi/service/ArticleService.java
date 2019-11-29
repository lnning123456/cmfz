package com.baizhi.service;

import com.baizhi.entity.Article;

import java.util.List;
import java.util.Map;


public interface ArticleService {

    Map<String, Object> queryByPage(Integer page, Integer rows);

    void add(Article article);

    void update(Article article);

    List<Article> findAll();

    Article findById(String id);
}
