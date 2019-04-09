package com.frame.kernel.login.controller;

import com.alibaba.fastjson.JSONObject;
import com.frame.kernel.common.BIZConstants;
import com.frame.kernel.common.Constants;
import com.frame.kernel.login.service.LoginService;
import com.frame.kernel.menu.model.MenuNode;
import com.frame.kernel.shiro.SpringCacheManagerWrapper;
import com.frame.kernel.sso.AutoLogin;
import com.frame.kernel.user.model.User;
import com.frame.kernel.user.service.UserService;
import com.frame.kernel.util.COMMON;
import com.frame.kernel.util.JSONUtil;
import com.frame.kernel.util.SystemProperties;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Serializable;
import java.util.Deque;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/")
public class LoginController {

    @Resource
    private SpringCacheManagerWrapper cacheManager;
    private Cache<String, Deque<Serializable>> cache = null;

    //定义service
    @Autowired
    private LoginService loginService;
    @Autowired
    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @RequestMapping(value = "/index")
    public String index() {
        return "index";
    }


    @RequestMapping("/logout")
    public String logout() {

        Subject subject = SecurityUtils.getSubject();
        if (subject != null && subject.isAuthenticated()) {
            Session session = subject.getSession();
            Serializable sessionId = session.getId();
            cache = cacheManager.getCache("shiro-kickout-session");
            String username = ((User) subject.getPrincipal()).getUser_name();
            Deque<Serializable> deque = cache.get(username);
            deque.removeLastOccurrence(sessionId);
            subject.logout();
            session.removeAttribute("currentUserId");
            session.removeAttribute("currentUserName");
            session.removeAttribute("mainMenu");
        }

        return "/login";
    }

    @RequestMapping("/login")
    public String login(HttpServletRequest request) {
       return "login";
    }

    @RequestMapping("/loginUser")
    public String loginUser(@RequestParam("username") String username,
                            @RequestParam("password") String password, Model model) {
        JSONObject ret = new JSONObject();
        String errorMessage = "";

        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        session.setAttribute("errorMessage", errorMessage);
        UsernamePasswordToken usernamePasswordToken = new
                UsernamePasswordToken(username, password);
        try {

            subject.login(usernamePasswordToken);

            logger.info("======登陆成功=======");

        } catch (UnknownAccountException uae) {
            errorMessage = "未知账户";
        } catch (IncorrectCredentialsException ice) {
            System.out.println("对用户 进行登录验证...验证未通过，错误的凭证");
            errorMessage = "密码不正确";
        } catch (LockedAccountException lae) {
            System.out.println("对用户[ ]进行登录验证...验证未通过，账户已锁定");
            errorMessage = "账户已锁定";
        } catch (ExcessiveAttemptsException eae) {
            System.out.println("对用户[ ]进行登录验证...验证未通过，错误次数过多");
            errorMessage = "用户名或密码错误次数过多";
        } catch (AuthenticationException ae) {
            //通过处理Shiro的运行时AuthenticationException就可以控制用户登录失败或密码错误时的情景
            System.out.println("对用户[ ]进行登录验证...验证未通过，堆栈轨迹如下");
            ae.printStackTrace();
            errorMessage = "用户名或密码不正确";
        } catch (Exception e) {
            logger.error("======登陆异常=======");
            //model.addAttribute("msg", "用户名或者密码错误,登陆失败");
            e.printStackTrace();
            errorMessage = "登陆异常!";
        }
        //验证是否登录成功
        if (subject.isAuthenticated()) {
            System.out.println("用户[ ]登录认证通过（这里可进行一些认证通过后的系统参数初始化操作）");
            User userLogin = (User) subject.getPrincipal();


            // 从cache中获取登录队列
            cache = cacheManager.getCache("shiro-kickout-session");
            Deque<Serializable> deque = cache.get(username);

            Serializable sessionId = session.getId();
            // 判断登录session队列是否存在该sessionid
            if (null!=deque && deque.contains(sessionId)) {
                ret.put("retCode", "200");
                // return SystemProperties.get("arch.index");
            }
            //设置系统全局变量
            session.setAttribute("currentUserId", userLogin.getUser_id());
            session.setAttribute("currentUserName", userLogin.getUser_name());

            //设置当前用户登录菜单
            List<MenuNode> mainMenu = loginService.getMenuNodeByUserId(userLogin.getUser_id(), BIZConstants.MENU_LIST_NODE_ID);
            session.setAttribute("mainMenu", mainMenu);
            return "/index";
        } else {
            session.setAttribute("errorMessage", errorMessage);
            return "/login";
        }
    }


    @ResponseBody
    @RequestMapping(value = "/sso", method = RequestMethod.POST, consumes = "application/json")
    public String sso(HttpServletRequest request, HttpServletResponse response,
                               @RequestBody Map<String, String> map) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "PUT,GET,POST,OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-File-Name");
        JSONObject ret = new JSONObject();
        // 登录用户名
        String username = (String) map.get("username");
        String password = (String) map.get("password");
        User user = userService.queryUserByName(username);

        // 登录实体
        UsernamePasswordToken upt = new UsernamePasswordToken();
        if (COMMON.isEmpty(password)) {
            // 进行单点登录
            upt.setUsername("sso#" + username);
        } else {
            // 进行密码校验
            upt.setUsername(username);
            upt.setPassword(password.toCharArray());
        }
        try {
            if (username != null) {
                SecurityUtils.getSubject().login(upt);
                Subject subject = SecurityUtils.getSubject();
                User userLogin = (User) subject.getPrincipal();
                JSONObject data = new JSONObject();
                data.put("sessionid", SecurityUtils.getSubject().getSession().getId());
                data.put("currentUserId", userLogin.getUser_id());
                data.put("currentUserName", userLogin.getUser_name());
                List<MenuNode> mainMenu = loginService.getMenuNodeByUserId(userLogin.getUser_id(), BIZConstants.MENU_LIST_NODE_ID);
                data.put("mainMenu", mainMenu);// 登录成功返回ssionid
                ret.put("data", data);

            } else {
                ret.put(Constants.FLAG, Constants.FLAG_FAIL);
                ret.put(Constants.MSG, "username为空!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            ret.put(Constants.FLAG, Constants.FLAG_FAIL);
            ret.put(Constants.MSG, e.getMessage());
        }

        // 获取用户信息与对应的角色信息
        logger.info(JSONUtil.ToFormatJson(ret));
        return JSONUtil.ToFormatJson(ret);
    }

    /**
     * 单点登录（如已经登录，则直接跳转）
     *
     * @param token 登录令牌
     * @param url   登录成功后跳转的url地址。
     *              例如：http://localhost/project/sso/{token}?url=xxx&relogin=true
     */

    @RequestMapping(value = "/sso/{token}")
    public String sso(@PathVariable String token, HttpServletRequest request, HttpServletResponse response,
                      @RequestParam(required = false) String url/* , String relogin */, Model model) {

        // 如果已经登录
        Subject subject = SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            String username = ((User) subject.getPrincipal()).getUser_name();
            cache = cacheManager.getCache("shiro-kickout-session");
            Deque<Serializable> deque = cache.get(username);
            Session session = subject.getSession();
            Serializable sessionId = session.getId();
            if (deque.contains(sessionId)) {
                // 如果已经登录，直接跳入登录后首页
                return SystemProperties.get("arch.login");
            }
            subject.logout();
        }

        // 进行单点登录
        if (token != null) {
            String account = "";
            UsernamePasswordToken upt = new UsernamePasswordToken();
            try {
                Class c = Class.forName(SystemProperties.get("arch.login.hooks"));
                AutoLogin autoLogin = (AutoLogin) c.newInstance();

                try {
                    autoLogin.preLogin(request, response);
                } catch (Exception pre_e) {
                    pre_e.printStackTrace();
                }

                try {
                    account = autoLogin.getAccount(request, response);
                    upt.setUsername("sso#" + account); // 登录用户名
                    upt.setPassword(token.toCharArray()); // 密码组成：sso密钥+用户名+日期，进行md5加密，举例：
                    // Digests.md5(secretKey+username+20150101)）
                } catch (Exception login_e) {
                    login_e.printStackTrace();
                }

                if (account != null) {
                    SecurityUtils.getSubject().login(upt);
                    try {
                        autoLogin.postLogin(request, response);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return url;
                }

            } catch (AuthenticationException e) {
                e = new AuthenticationException("msg:授权错误，请检查用户配置，若不能解决，请联系管理员。");
                model.addAttribute("exception", e);
                e.printStackTrace();
            } catch (ClassNotFoundException e1) {
                e1.printStackTrace();
            } catch (InstantiationException | IllegalAccessException e2) {
                e2.printStackTrace();
            }
        }
        return "redirect:/login";
    }


}
