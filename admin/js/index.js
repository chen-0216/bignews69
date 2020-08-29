$(function () {
  $.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/info',
    success: function (info) {
      // console.log(info);
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
  });
  $(function () {
    $('.menu .level01').click(function () {
      $(this).addClass('active').siblings('div').removeClass('active');
      if ($(this).index() === 1) {
        $('.menu .level02').slideToggle();
        $(this).find('b').toggleClass('rotate0')
        $('.menu .level02 li:eq(0)').click();
      };
    });
    $('.menu .level02 li').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
    })
  })
})