package com.baizhi.imagecode;

import com.baizhi.util.ImageCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Component
@RequestMapping("code")
public class ImageCode {
    @Autowired
    ImageCodeUtil imageCodeUtil;

    @ResponseBody
    @RequestMapping("code")
    public void code(HttpServletResponse response, HttpServletRequest request, HttpSession session) throws IOException {
///生成验证码
        String code = ImageCodeUtil.getSecurityCode();
        System.out.println("验证码：                                " + code);
        //生成验证码图片
        BufferedImage image = ImageCodeUtil.createImage(code);
        //获取响应对象
        //  HttpServletResponse response = ServletActionContext.getResponse();
        //设置响应类型
        response.setContentType("image/png");

        boolean png = ImageIO.write(image, "png", response.getOutputStream());

        session.setAttribute("code", code);
        // return null;
    }
}
