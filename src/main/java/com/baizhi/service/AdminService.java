package com.baizhi.service;


import com.baizhi.entity.Admin;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

public interface AdminService {
    List<Admin> findAll();

    Admin login(String name, String password);

    Map<String, Object> login(String username, String password, String enCode, HttpSession session);
}
