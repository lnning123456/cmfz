package com.baizhi.test;

import org.springframework.stereotype.Component;

import java.util.Timer;

@Component
public class DingShi {
    public static void main(String[] args) {
        Timer timer = new Timer();
        MyTask myTask = new MyTask();
        timer.schedule(myTask, 1000, 2000);

    }
}

