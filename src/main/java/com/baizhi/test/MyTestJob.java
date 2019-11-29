package com.baizhi.test;

import org.apache.commons.lang3.StringUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;


//@Component
public class MyTestJob {

    private int count = 0;

    //  StringRedisTemplate stringRedisTemplate;

    //@Scheduled(fixedRate = 6000) 都是每6秒执行一次
    @Scheduled(cron = "*/6 * * * * ?")
    private void process() {
        String state = null;

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (null != requestAttributes) {
            HttpServletResponse response = requestAttributes.getResponse();
            HttpServletRequest request = requestAttributes.getRequest();
            HttpSession session = request.getSession();

            state = request.getHeader("esState");
            if (StringUtils.isNotEmpty(state)) {
                state = "start";
            }
        } else {
            state = "start";
            System.out.println("ggggggggggggggggggggg");
        }
        // 这里从redis 里面获取相应定时任务对应的状态，是否运行
        //  String state = stringRedisTemplate.opsForValue().get("xxxjob");
        // session.setAttribute("esState","start");
        //  String state = (String) session.getAttribute("esState");
        System.out.println("state = " + state);
        if (state.equals("stop")) {
            System.out.println("定时job scheduler 停止运行");

        } else {
            //如果 当前是 00，则运行相关代码
            System.out.println("定时job scheduler 正在运行: " + new Date() + "   " + (count++));
        }

    }
}
