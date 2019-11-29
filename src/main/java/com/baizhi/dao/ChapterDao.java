package com.baizhi.dao;


import com.baizhi.entity.Chapter;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.context.annotation.Primary;

import java.util.List;

@Primary
public interface ChapterDao {
    List<Chapter> findPage(@Param("start") Integer start, @Param("rows") Integer rows, @Param("aId") String albumId);

    void add(Chapter chapter);

    void delete(String[] ids);

    @Select("select count(id) from chapter where id=#{aId}")
    Integer getCount(String aId);

    void updateUrl(Chapter chapter);
}
