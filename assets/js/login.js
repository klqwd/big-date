$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });
});

// 从 LayUI 中获取 form 对象
const form = layui.form;

// 通过 form.verify() 方法自定义校验规则
form.verify({
  // 自定义一个叫 pwd 的校验规则
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  // 校验两次密码是否一致的规则
  repwd: (val) => {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    const pwd = $(".reg-box [name=password").val();
    if (pwd !== val) return "两次密码不一致";
  },
});

const layer = layui.layer;
const baseUrl = "http://www.liulongbin.top:3007";

// 监听注册表单，发送注册请求
$("#form_reg").on("submit", (e) => {
  console.log(1);
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: baseUrl + "/api/reguser",
    data: {
      username: $("#form_reg [name=username").val(),
      password: $("#form_reg [name=password").val(),
    },
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg("注册成功！");
      // 注册成功后跳转到登录界面
      $("#link_login").click();
    },
  });
});
// 获取 layui 弹窗

// 监听登录表单，发送登录请求
$("#form_login").submit((e) => {
  e.preventDefault();
  $.ajax({
      type: "POST",
      url: baseUrl + "/api/login",
      data: $("#form_login").serialize(),
      success: (res) => {
          if (res.status !== 0) return layer.msg(res.message);
          layer.msg("登录成功！");
          // 将登录成功得到的 token 字符串，保存到 localStorage 中
          localStorage.setItem("token", res.token);
          // 跳转到主页
          location.href = "/index.html";
      },
  });
});

// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((option) => {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  option.url = `http://www.liulongbin.top:3007` + option.url;
});
