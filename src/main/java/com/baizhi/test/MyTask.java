package com.baizhi.test;

import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.TimerTask;

@Component
public class MyTask extends TimerTask {

    @Override
    public void run() {
        System.out.println("Hello!! 现在是：" + new Date());
    }
}
