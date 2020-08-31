$(function () {
  $.ajax({
    type: 'get',
    url: bigNews.user_detail,
    success: function (info) {
      if (info.code === 200) {
        $('#form input[name=username]').val(info.data.username);
        $('#form input[name=nickname]').val(info.data.nickname);
        $('#form input[name=email]').val(info.data.email);
        $('#form input[name=password]').val(info.data.password);
        $('#form .user_pic').attr('src', info.data.userPic);
      }
    }
  });
  // 2. 实现图片的本地预览
  // 2.1 先要给文本标签注册事件
  $('#exampleInputFile').on('change', function () {
    // 2.2 获取到待上传的图片
    var file = this.files[0]
    // console.log(file);
    // 2.3 生成一个图片链接 这个链接是一个大对象的二进制形式
    var url = URL.createObjectURL(file)
    // console.log(url);
    // 2.4 将图片的链接地址给到img标签
    $('.user_pic').attr('src', url)
  });
  // console.log($('#edit'));
  $('#form').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault();
    // 3.2 准备待发送的数据 对DOM对象中的数据进行转换
    var data = new FormData(this); // 将form表单中的待上传数据转换成二进制的形式再进行上传
    // 3.3 发送ajax请求
    $.ajax({
      type: 'post',
      url: bigNews.user_edit,
      data: data,
      contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
      processData: false, // 不要转换成字符串
      success: function (info) {
        if (info.code == 200) {
          // 3.4.1 第1种更新父页面的方式
          $.ajax({
            type: 'get',
            url: bigNews.user_info,
            success: function (info) {
              // 1.2. 请求回来数据后要渲染到页面
              if (info.code == 200) {
                // 显示登陆的用户名 
                parent.$('.user_info span').html('欢迎&nbsp;&nbsp;' + info.data.nickname)

                // 显示登陆的头像
                parent.$('.user_info img').attr('src', info.data.userPic)

                // 个人中心的图片也设置一样
                parent.$('.user_center_link img').attr('src', info.data.userPic)
              }
            }
          })
        }
      }
    })
  })
})