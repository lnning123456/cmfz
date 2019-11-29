package com.baizhi.controller;

import com.baizhi.entity.Admin;
import com.baizhi.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @ResponseBody
    @RequestMapping("findAll")

    public List<Admin> findAll() {
        return adminService.findAll();
    }

    @ResponseBody
    @RequestMapping("login")
    public Map<String, Object> login(String username, String password, String code, HttpSession session) {
        System.out.println("code = " + code);
        System.out.println("username = " + username);
        System.out.println("password = " + password);
        System.out.println("session = " + session);
        Map<String, Object> map = adminService.login(username, password, code, session);
        return map;

    }


}
