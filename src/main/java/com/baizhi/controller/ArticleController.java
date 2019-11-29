package com.baizhi.controller;


import com.baizhi.entity.Article;
import com.baizhi.esrepository.Espository;
import com.baizhi.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@ResponseBody
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    ArticleService articleService;
    @Autowired
    Espository espository;

    @RequestMapping("edit")
    public String add(String oper, Article article, String[] id) {
        if (oper.equals("add")) {
            // String bannerId = bannerService.add(banner);
            return null;
        }
        if (oper.equals("edit")) {
            System.out.println("edit");
            //  bannerService.updateStatus(banner);
        }
        if (oper.equals("del")) {
            System.out.println("del");
            //   bannerService.del(id);
        }

        return null;
    }


    @RequestMapping("/queryByPage")
    public Map<String, Object> queryByPage(Integer page, Integer rows) {
        System.out.println("queryByPage");
        return articleService.queryByPage(page, rows);
    }

    @RequestMapping("add")
    public void query(Article article) {
        System.out.println(article);
        articleService.add(article);


    }

    @RequestMapping("update")
    public void update(Article article) {
        System.out.println(article);
        articleService.update(article);
    }

    @RequestMapping("search")
    public List<Map> search(String query) {
        System.out.println("query = " + query);
        List<Map> search = null;
        search = espository.search(query);
        /*try {
            search = espository.search(query);
            System.out.println("search = " + search);
            return search;
        } catch (Exception e) {
            try {
                System.out.println("tttttttttttttttttttt");
                espository.saveEs();
                search = espository.search(query);
                System.out.println("search = " + search);
                System.out.println("==========================");
                return search;
            } catch (IOException e1) {
                e1.printStackTrace();
            }

        }*/

        return search;

    }

    @RequestMapping("detail")
    public Map<String, Object> detail(String id, String uidc) {
        Article article;
        Map<String, Object> map = new HashMap<>();
        try {
            article = articleService.findById(id);
            map.put("article", article);
            map.put("code", 200);
        } catch (Exception e) {
            map.put("code", 500);
            map.put("msg", "参数错误");
            e.printStackTrace();
        }
        return map;
    }


}
