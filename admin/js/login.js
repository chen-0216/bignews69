$(function () {
  var $submit = $('.input_sub');
  $('.login_form').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: 'http://localhost:8080/api/v1/admin/user/login',
      data: $(this).serialize(),
      beforeSend: function () {
        var $name = $('.input_txt');
        var $password = $('.input_pass');
        var name = $name.val().trim();
        var psw = $password.val().trim();
        // console.log(name, psw);
        if (!name || !psw) {
          $('#myModal').modal('show');
          $('.modal-body >p').text('用户名与密码不能为空！');
          return;
        };
      },
      success: function (data) {
        $('#myModal').modal('show');
        $('.modal-body >p').text(data.msg);
        if (data.code === 200) {
          // $('.modal-body >p').text('登陆成功');
          $('#myModal').on('hidden.bs.modal', function () {
            window.location.href = './index.html';
            window.localStorage.setItem('token', data.token)
          })
        }
      },
    });
  })
})