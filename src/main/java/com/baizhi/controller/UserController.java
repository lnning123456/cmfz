package com.baizhi.controller;

import com.baizhi.entity.User;
import com.baizhi.service.UserService;
import io.goeasy.GoEasy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping("findAll")
    public Map<String, Integer> findAll() {
        Map<String, Integer> map = new HashMap<>();
        map.put("x1", userService.findDateNumber("x", 1));
        map.put("x2", userService.findDateNumber("x", 2));
        map.put("x3", userService.findDateNumber("x", 3));
        map.put("y1", userService.findDateNumber("y", 1));
        map.put("y2", userService.findDateNumber("y", 2));
        map.put("y3", userService.findDateNumber("y", 3));
        return map;
    }

    @RequestMapping("add")
    public void add(User user) {

        user.setId(UUID.randomUUID().toString());
        user.setRegdate(new Date());
        System.out.println("user add ----------------------------");
        GoEasy goEasy;
        goEasy = null;
        try {
            System.out.println("user = " + user);
            userService.add(user);
            goEasy = new GoEasy("http://rest-hangzhou.goeasy.io", "BC-c628a50f918e45cea1dbe2b63d8b226c");
            goEasy.publish("ln", "注册成功1人");
            System.out.println("user add success ----------------------------");
        } catch (Exception e) {
            System.out.println("add error");
            goEasy.publish("ln", "注册失败");
            e.printStackTrace();
        }
    }

    @RequestMapping("addressNumber")
    public Map<String, Map<String, Integer>> addressNumber() {
        Map<String, Map<String, Integer>> addressNumber = userService.findAddressNumber();
        Set<String> keys = addressNumber.keySet();
        for (String key : keys) {
            System.out.println("key = " + key + " " + addressNumber.get(key));
        }
        return addressNumber;
    }

    @RequestMapping("queryByPage")
    public Map<String, Object> queryByPage(Integer page, Integer rows) {

        return userService.findPage(page, rows);
    }

    @RequestMapping("edit")
    public String add(String oper, User user, String[] id) {
        if (oper.equals("add")) {

            System.out.println("chapter = " + user);
            //  userService.add(user);
            add(user);

        }
        if (oper.equals("edit")) {
            // bannerService.updateStatus(banner);
            System.out.println("update oper = " + oper);

        }
        if (oper.equals("del")) {
            System.out.println("delete");
        }

        return null;
    }
}
