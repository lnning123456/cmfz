package com.baizhi.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import cn.afterturn.easypoi.excel.annotation.ExcelTarget;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@ExcelTarget(value = "轮播图")
public class Banner implements Serializable {
    @Excel(name = "id", needMerge = true)
    private String id;
    @Excel(name = "标题", needMerge = true)
    private String title;
    @Excel(name = "状态", needMerge = true)
    private String status;
    @Excel(name = "创建时间", needMerge = true, format = "yyyy-MM-dd")
    private Date createDate;
    @Excel(name = "简介", needMerge = true)
    private String brief;
    @Excel(name = "图片", type = 2, width = 50, height = 35, needMerge = true)
    private String imgPath;
}
