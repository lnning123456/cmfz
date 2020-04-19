package com.baizhi.test;


import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.ExcelImportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.ImportParams;
import com.baizhi.CmfzApplication;
import com.baizhi.dao.AdminDao;
import com.baizhi.dao.AlbumDao;
import com.baizhi.dao.BannerDao;
import com.baizhi.dao.ChapterDao;
import com.baizhi.entity.*;
import com.baizhi.esrepository.Espository;
import com.baizhi.service.AlbumService;
import com.baizhi.service.ArticleService;
import com.baizhi.service.BannerService;
import com.baizhi.service.UserService;
import com.baizhi.util.ImageCodeUtil;
import org.apache.poi.ss.usermodel.Workbook;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;


@SpringBootTest(classes = CmfzApplication.class)
@RunWith(SpringRunner.class)
public class CmfzApplicationTests {
    @Autowired
    private AdminDao adminDao;
    @Autowired
    ImageCodeUtil imageCodeUtil;
    @Autowired
    BannerDao bannerDao;
    @Autowired
    BannerService bannerService;
    @Autowired
    AlbumDao albumDao;
    @Autowired
    AlbumService albumService;
    @Autowired
    ChapterDao chapterDao;
    @Autowired
    ArticleService articleService;
    @Autowired
    Espository espository;

    @Test
    public void contextLoads() {
        List<Admin> all = adminDao.findAll();
        for (Admin admin : all) {
            System.out.println("admin = " + admin);
        }
    }

    @Test
    public void findOne() {

        Admin byNameAndPassword = adminDao.findByNameAndPassword("zxc", "zxc");
        System.out.println("byNameAndPassword = " + byNameAndPassword);
    }

    @Test
    public void code() throws Exception {
        //获得随机字符
        String securityCode = ImageCodeUtil.getSecurityCode();
        //打印随机字符
        System.out.println("====" + securityCode);
        //生成图片
        BufferedImage image = ImageCodeUtil.createImage(securityCode);
        //将生成的验证码图片以png(1.png)的格式输出到D盘        "D:\\1.png"   ==  "D:/1.png"
        ImageIO.write(image, "png", new FileOutputStream(new File("D:\\iso\\1.png")));

    }

    @Test
    public void bannerPage() {
        List<Banner> page = bannerDao.findPage(0, 2);
        for (Banner dao : page) {
            System.out.println("dao = " + dao);
        }
    }

    @Test
    public void bannerPageService() {
        List<Banner> page = bannerService.findPage(0, 2);
        for (Banner dao : page) {
            System.out.println("dao = " + dao);
        }
    }

    @Test
    public void findAllService() {
        List<Banner> page = bannerService.findBannerAll();
        for (Banner dao : page) {
            System.out.println("dao = " + dao);
        }
    }

    @Test
    public void albumPage() {
        List<Album> albums = albumDao.findPage(0, 2);
        for (Album album : albums) {
            System.out.println("album = " + album);
        }

    }

    @Test
    public void albumPageService() {
        Map<String, Object> map = albumService.queryByPage(1, 2);
        for (String s : map.keySet()) {
            System.out.println("s = " + s);
        }

    }

    @Test
    public void albumAddService() {
        Album album = new Album();
        album.setTitle("zxc");
        albumService.add(album);
    }

    @Test
    public void setChapterDao() {
        List<Chapter> page = chapterDao.findPage(0, 1, "1");
        for (Chapter chapter : page) {
            System.out.println("chapter = " + chapter);
        }
    }

    @Test
    public void articleService() {
        Map<String, Object> map = articleService.queryByPage(1, 2);
        List<Article> rows = (List<Article>) map.get("rows");
        for (Article article : rows) {
            Date createDate = article.getCreateDate();
            System.out.println("createDate = " + createDate);
        }
    }

    @Test
    public void testDate() {
        Date date = new Date();
        long s = 1000 * 60 * 60 * 24 * 30L;
        Date t = new Date(new Date().getTime() + s);
        System.out.println("date = " + date);
        System.out.println("t = " + t);
    }

    @Test
    public void testOut() {
        List<Article> articles = articleService.findAll();
        for (Article article : articles) {
            article.setImg("D:\\idea\\source\\ajxa\\cmfz\\src\\main\\webapp\\img\\1574303580324_2.jpg");
        }

        Workbook workbook = ExcelExportUtil.exportExcel(new ExportParams("文章详情gg", "文章", "aa"), Article.class, articles);
        try {
            workbook.write(new FileOutputStream(new File("D:/172/文章详情.xls")));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testIn() throws Exception {
        ImportParams params = new ImportParams();
        params.setHeadRows(1);
        params.setTitleRows(2);
        List<Article> articles = ExcelImportUtil.importExcel(new FileInputStream(new File("D:/172/文章详情.xls")), Article.class, params);
        for (Article article : articles) {
            System.out.println("article = " + article);
        }
    }

    @Test
    public void testFindAll() throws IOException {
        TransportClient transportClient = new PreBuiltTransportClient(Settings.EMPTY).addTransportAddress(new TransportAddress(InetAddress.getByName("192.168.152.131"), 9300));

        List<Banner> banners = bannerDao.findAll();
        for (Banner banner : banners) {
            XContentBuilder xContentBuilder = XContentFactory.jsonBuilder();
            xContentBuilder.startObject()

                    .field("标题", banner.getTitle())
                    .field("状态", banner.getStatus())
                    .field("简介", banner.getBrief())
                    .field("id", banner.getId())
                    .endObject();

            transportClient.prepareIndex("banners", "banner").setSource(xContentBuilder).get();

        }

    }

    @Test
    public void testMatchAllQuery() throws Exception {
        TransportClient transportClient = new PreBuiltTransportClient(Settings.EMPTY).addTransportAddress(new TransportAddress(InetAddress.getByName("192.168.152.131"), 9300));
        SearchResponse searchResponse = transportClient.prepareSearch("banners").setTypes("banner").setQuery(QueryBuilders.matchAllQuery()).get();
        SearchHits hits = searchResponse.getHits();
        System.out.println("符合条件的记录数: " + hits.totalHits);
        for (SearchHit hit : hits) {
            System.out.print("当前索引的分数: " + hit.getScore());
            System.out.print(", 对应结果:=====>" + hit.getSourceAsString());
            System.out.println(", 指定字段结果:" + hit.getSourceAsMap().get("简介"));
            System.out.println("=================================================");
        }
    }

    @Test
    public void testCreate() throws IOException {
        String query = "s";
        TransportClient transportClient = new PreBuiltTransportClient(Settings.EMPTY).addTransportAddress(new TransportAddress(InetAddress.getByName("192.168.152.131"), 9300));
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.requireFieldMatch(false).preTags("<font color='red'>").postTags("</font>").field("*");
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        QueryStringQueryBuilder queryStringQueryBuilder = QueryBuilders.queryStringQuery(query)
                .field("标题")
                .field("状态")
                .field("简介");
        SearchResponse searchResponse = transportClient.prepareSearch("banners")
                .setTypes("banner")
                .setQuery(queryStringQueryBuilder)
                .highlighter(highlightBuilder)
                .get();
        SearchHit[] hits = searchResponse.getHits().getHits();
        for (SearchHit hit : hits) {
            Map<String, HighlightField> highlightFields = hit.getHighlightFields();
            Map<String, Object> sourceAsMap = hit.getSourceAsMap();
            for (String s : highlightFields.keySet()) {
                System.out.println("s = " + s);
            }


            list.add(sourceAsMap);
        }
        System.out.println("zzzzzzzzzzzzzzzzzzzzzzzzzzz");
        for (Map<String, Object> map : list) {
            System.out.println("xxxxxxxxxxxxxxxxxxxxxxxxxx");
            System.out.println("map = " + map);

        }
    }

    @Test
    public void dingshi() {
        Timer timer = new Timer();
        //  Espository espository = new Espository();
        MyTask myTask = new MyTask();
        timer.schedule(myTask, 1000, 2000);
    }

    @Test
    public void testEs() {
        String query = "第一";
        try {
            List<Map> s = espository.search(query);
            System.out.println("s = " + s);
        } catch (Exception e) {
            try {
                System.out.println("tttttttttttttttttttt");
                espository.saveEs();
                List<Map> s = espository.search(query);
                System.out.println("s = " + s);
                System.out.println("==========================");

            } catch (IOException e1) {
                e1.printStackTrace();
            }

        }


    }

    @Test
    public void esAdd() throws IOException {

        espository.saveEs();

    }

    @Test
    public void find() {

        List<Map> search = espository.search("第一");
        System.out.println("search = " + search);
    }

    @Test
    public void esDelete() throws UnknownHostException {
        espository.delete();
    }

    @Autowired
    UserService userService;

    @Test
    public void testUser() {
        List<User> users = userService.findAll();
        int count = 1;
        for (User user : users) {
            if (user.getAddress().equals("天津")) {
                ++count;
            }
            // System.out.println("user = " + user);

        }
        System.out.println("count = " + count);
        /*User user = new User();
        user.setSex("x");
        Integer number = userService.findDateNumber("x",10);
        System.out.println("number = " + number);*/
    }

    @Test
    public void addUser() {

        User user = new User();
        user.setId("dfdhhhf");
        user.setSex("x");
        user.setRegdate(new Date());
        userService.add(user);
    }

    @Test
    public void userAddress() {
        Map<String, Map<String, Integer>> addressNumber = userService.findAddressNumber();
        for (String s : addressNumber.keySet()) {
            System.out.println("s = " + s);

        }
    }

    @Test
    public void userPage() {
        Map<String, Object> page = userService.findPage(1, 1);
        for (String s : page.keySet()) {
            System.out.println("s = " + s + "    " + page.get(s));
        }

    }
}
