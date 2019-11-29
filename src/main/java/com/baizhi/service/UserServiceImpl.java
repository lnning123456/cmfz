package com.baizhi.service;

import com.baizhi.dao.UserDao;
import com.baizhi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public Integer findDateNumber(String sex, Integer number) {
        return userDao.findNumber(sex, number);
    }

    @Override
    public void add(User user) {
        userDao.add(user);
    }

    @Override
    public Map<String, Map<String, Integer>> findAddressNumber() {
        List<User> users = userDao.findAll();
        Map<String, Map<String, Integer>> addressNumber = new HashMap<>();
        Map<String, Integer> manNumber = new HashMap<>();
        Map<String, Integer> womanNumber = new HashMap<>();
        Integer count = 1;
        String adress;


        for (User user : users) {
            if (user.getSex().equals("y")) {
                adress = user.getAddress();
                Integer integer = manNumber.put(adress, count);
                if (integer != null) {
                    manNumber.put(adress, integer + 1);

                }
            }
            if (user.getSex().equals("x")) {
                adress = user.getAddress();
                Integer integer = womanNumber.put(adress, count);

                if (integer != null) {
                    womanNumber.put(adress, integer + 1);

                }
            }
        }
        addressNumber.put("man", manNumber);
        addressNumber.put("woman", womanNumber);
       /* Set<Map.Entry<String, Integer>> entries = addressnumber.entrySet();
        for (Map.Entry<String, Integer> entry : entries) {
            System.out.println("entries =   " + entries+"  ------------   "+"value =  "+);
        }*/
        Set<String> strings = womanNumber.keySet();
        for (String string : strings) {
            System.out.println("key= " + string + "    " + "valve = " + womanNumber.get(string));
        }


        return addressNumber;
    }

    @Override
    public Map<String, Object> findPage(Integer page, Integer rows) {
        Map<String, Object> map = new HashMap<>();
        Integer records = userDao.getCount();
        Integer total = records % rows == 0 ? records / rows : records / rows + 1;
        Integer start = (page - 1) * rows;
        List<User> users = userDao.findPage(start, rows);
        map.put("total", total);
        map.put("records", records);
        map.put("page", page);
        map.put("rows", users);
        return map;
    }
}
