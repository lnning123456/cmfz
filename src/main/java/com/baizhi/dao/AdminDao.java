package com.baizhi.dao;

import com.baizhi.entity.Admin;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.context.annotation.Primary;

import java.util.List;

@Primary
public interface AdminDao {
    @Select("select * from admin")
    List<Admin> findAll();

    @Select("select * from admin where name = #{name} and password=#{password} ")
    Admin findByNameAndPassword(@Param("name") String name, @Param("password") String password);

    @Select("select * from admin where name = #{name}")
    Admin findByName(@Param("name") String name);

}
