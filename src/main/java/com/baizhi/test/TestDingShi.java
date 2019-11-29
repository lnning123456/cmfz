package com.baizhi.test;

import com.baizhi.esrepository.Espository;
import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.IOException;

/*@Component
@Configuration      //1.主要用于标记配置类，兼备Component的效果。
@EnableScheduling */  // 2.开启定时任务
public class TestDingShi {
    @Autowired
    Espository espository;

    //3.添加定时任务
    //  @Scheduled(cron = "0/5 * * * * ?")
    //或直接指定时间间隔，例如：5秒
    @Scheduled(fixedRate = 2000)
    private void configureTasks() {

        System.err.println("执行静态定时任务时间: " + LocalDateTime.now());

        try {
            espository.saveEs();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("saveEs");
        }


        try {
            espository.delete();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("delete");
        }
        // espository.saveEs();

    }
}