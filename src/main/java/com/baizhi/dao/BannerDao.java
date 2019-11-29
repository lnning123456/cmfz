package com.baizhi.dao;

import com.baizhi.entity.Banner;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.context.annotation.Primary;

import java.util.List;

@Primary
public interface BannerDao {

    @Select("select id,title,status,create_date createDate,brief,imgPath from banner limit #{start},#{rows}")
    List<Banner> findPage(@Param("start") Integer start, @Param("rows") Integer rows);

    @Select("select id,title,status,create_date createDate,brief,imgPath from banner")
    List<Banner> findAll();

    @Select("select count(id) from banner")
    Integer getCount();

    @Select("select * from banner")
    List<Banner> findBannerAll();

    @Select("select id,title,status,create_date createDate,brief,imgPath from banner limit #{start},#{rows}")
    List<Banner> queryByPage(@Param("start") Integer start, @Param("rows") Integer rows);

    @Insert("insert into banner values (#{id},#{title},#{status},#{createDate},#{brief},#{imgPath})")
    void addBanner(Banner banner);

    @Insert("insert into banner values (#{id},#{title},#{status},#{createDate},#{brief},#{imgPath})")
    void add(Banner banner);


    void updateUrl(@Param("id") String id, @Param("imgPath") String imgPath);

    void del(String[] ids);

    void updateStatus(Banner banner);


    @Update("update set title=#{title} where id=#{id}")
    void updateBanner(Banner banner);
}
