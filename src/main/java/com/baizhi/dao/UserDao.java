package com.baizhi.dao;


import com.baizhi.entity.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.context.annotation.Primary;

import java.util.List;

@Primary
public interface UserDao {
    List<User> findAll();

    Integer findNumber(@Param("sex") String sex, @Param("number") Integer number);

    void add(User user);

    List<User> findPage(@Param("start") Integer start, @Param("rows") Integer rows);

    @Select("select count(id) from user")
    Integer getCount();
}
