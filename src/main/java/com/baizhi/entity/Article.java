package com.baizhi.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import cn.afterturn.easypoi.excel.annotation.ExcelTarget;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ExcelTarget(value = "文章ccds")
public class Article implements Serializable {
    @Excel(name = "id", needMerge = true)
    private String id;
    @Excel(name = "标题", needMerge = true)
    private String title;
    @Excel(name = "内容", needMerge = true)
    private String content;
    @Excel(name = "状态", needMerge = true)
    private String status;
    @Excel(name = "作者", needMerge = true)
    private String author;
    @Excel(name = "日期", format = "yyyy-MM-dd", needMerge = true, width = 10)
    private Date createDate;
    @Excel(name = "封面", type = 2, width = 50, height = 35, needMerge = true)
    private String img;
}
