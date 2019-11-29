package com.baizhi.service;


import com.baizhi.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<User> findAll();

    Integer findDateNumber(String sex, Integer number);

    void add(User user);

    Map<String, Map<String, Integer>> findAddressNumber();

    Map<String, Object> findPage(Integer page, Integer rows);
}
