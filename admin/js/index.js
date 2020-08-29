$(function () {
  $.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/info',
    success: function (info) {
      console.log(info);
      if (info.code === 200) {
        $('.sider .user_info img').attr('src', info.data.userPic);
        $('.sider .user_info span').html('欢迎&nbsp;&nbsp;' + info.data.nickname);
        $('.header_bar img').attr('src', info.data.userPic);
      }
    }
  });
  $('.header_bar .logout').click(function () {
    window.localStorage.removeItem('token');
    window.location.href = './login.html';
  })
})