package com.baizhi.dao;

import com.baizhi.entity.Album;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.context.annotation.Primary;

import java.util.List;

@Primary
public interface AlbumDao {
    List<Album> findPage(@Param("start") Integer start, @Param("rows") Integer rows);

    void add(Album album);

    void delete(String[] ids);

    @Select("select count(id) from album")
    Integer getCount();

    @Update("update album set illustration=#{illustration} where id=#{id}")
    void updateUrl(Album album);

    @Update("update album set status=#{status} where id=#{id}")
    void updateStatus(Album album);
}
