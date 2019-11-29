package com.baizhi.dao;

import com.baizhi.entity.Article;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.context.annotation.Primary;

import java.util.List;

@Primary
public interface ArticleDao {
    List<Article> queryByPage(@Param("start") Integer start, @Param("rows") Integer rows);

    @Select("select count(id) from article")
    Integer getCount();

    void add(Article article);

    void update(Article article);

    List<Article> findAll();

    Article findById(String id);
}
