package com.baizhi.entity;

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
public class Album implements Serializable {
    private String id;
    private String title;
    private Double grade;
    private String author;
    private String announcer;
    private Integer chapterNumber;
    private String albumBrief;
    private String status;
    private Date issueDate;
    private Date uploadTime;
    private String illustration;
}
