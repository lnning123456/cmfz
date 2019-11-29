package com.baizhi.entity;

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
public class Chapter implements Serializable {
    private String id;
    private String title;
    private String size;
    private String playTime;
    private Date uploadTime;
    private String voiceBand;
    private String albumId;
    private String url;
}
