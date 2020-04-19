package com.baizhi;

import org.assertj.core.util.Compatibility;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
@MapperScan("com.baizhi.dao")
public class
CmfzApplication {

    public static void main(String[] args) {

        //  HttpSession session = null;
        //   session.setAttribute("esState","start");

      //  Compatibility.System.setProperty("es.set.netty.runtime.available.processors", "false");

        SpringApplication.run(CmfzApplication.class, args);
    }

}
