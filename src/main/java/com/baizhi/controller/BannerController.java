package com.baizhi.controller;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import com.baizhi.entity.Banner;
import com.baizhi.esrepository.Espository;
import com.baizhi.service.BannerService;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("banner")
public class BannerController {

    @Autowired
    private BannerService bannerService;
    @Autowired
    Espository espository;

    @RequestMapping("edit")
    public String add(String oper, Banner banner, String[] id) {
        if (oper.equals("add")) {
            String bannerId = bannerService.add(banner);
            return bannerId;
        }
        if (oper.equals("edit")) {
            bannerService.updateStatus(banner);
        }
        if (oper.equals("del")) {
            bannerService.del(id);
        }

        return null;
    }

    @RequestMapping("upload")
    public void upload(MultipartFile imgPath, String bId, HttpSession session) {
        String realPath = session.getServletContext().getRealPath("/img/");
        File file = new File(realPath);
        if (!file.exists()) {
            file.mkdirs();
        }
        String filename = imgPath.getOriginalFilename();
        String newFileName = new Date().getTime() + "_" + filename;

        try {
            imgPath.transferTo(new File(file, newFileName));
        } catch (IOException e) {
            e.printStackTrace();
        }
        //修改数据库的路径。
        bannerService.updateUrl(bId, newFileName);

    }

    @RequestMapping("queryByPage")
    public Map<String, Object> queryByPage(Integer page, Integer rows) {
        return bannerService.queryByPage(page, rows);
    }

    @RequestMapping("outExcel")
    public void outExcel() {
        System.out.println("outExcel");
        List<Banner> all = bannerService.findAll();
        for (Banner banner : all) {
            System.out.println("banner.getImgPath() = " + banner.getImgPath());
            banner.setImgPath("D:\\idea\\source\\cmfz\\src\\main\\webapp\\img\\" + banner.getImgPath());

        }
        for (Banner banner : all) {
            System.out.println("banner = " + banner);
        }
        Workbook workbook = ExcelExportUtil.exportExcel(new ExportParams("轮播图详情", "轮播图", "aa"), Banner.class, all);
        try {
            workbook.write(new FileOutputStream(new File("C:\\Users\\李宁\\Desktop\\轮播图详情.xls")));
        } catch (IOException e) {

        }
    }


}
