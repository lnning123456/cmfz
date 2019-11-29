package com.baizhi.service;

import com.baizhi.dao.AdminDao;
import com.baizhi.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AdminServicelmpl implements AdminService {
    @Autowired
    AdminDao adminDao;

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public List<Admin> findAll() {
        return adminDao.findAll();
    }


    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public Admin login(String name, String password) {
        return adminDao.findByNameAndPassword(name, password);
    }

    @Override
    public Map<String, Object> login(String username, String password, String enCode, HttpSession session) {
        Map<String, Object> map = new HashMap<>();
        String imgCode = (String) session.getAttribute("code");
        if (enCode.equals(imgCode)) {
            Admin admin = adminDao.findByName(username);
            if (admin != null) {
                if (password.equals(admin.getPassword())) {
                    map.put("msg", "ok");
                    map.put("admin", admin);
                    return map;
                } else {
                    map.put("msg", "密码错误");
                    return map;
                }

            } else {
                map.put("msg", "用户名不存在");
                return map;
            }

        } else {
            map.put("msg", "验证码错误");
            return map;
        }
    }
}
