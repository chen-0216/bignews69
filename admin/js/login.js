$(function () {
  /**
   * 实现登陆功能
   *  1. 给登陆按钮注册事件  click  form submit
   *  2. 获取输入框中的数据  表单序列化
   *  3. 发送ajax请求
   */
  // 1.1 给按钮注册事件
  // $('.login_form .input_sub').on('click',function(){
  //   console.log(123);
  // })

  // 1.1 给form表单注册submit事件
  $('.login_form').on('submit', function (e) {
    // 1.2 阻止默认请求行为
    e.preventDefault()
    // 1.3 发送ajax请求
    $.ajax({
      type:'post',
      url:'http://localhost:8080/api/v1/admin/user/login',
      // 1.4 在data当中，填写上获取到的用户名和密码 使用序列化的方式来获取
      data:$(this).serialize(),
      success:function(res){
        // console.log(res);
        // console.log(typeof res);
        // 1.5 如果请求成功，则要跳转到主页面
        // 1.6 弹出模态框
        $('#myModal').modal('show')

        // 1.7 显示提示内容
        $('.modal-body p').html(res.msg)

        // 1.8 登陆成功之后 单击了确定按钮之后才要跳转到主页面
        if(res.code == 200){
          console.log(res);
          // 给模态框注册一个隐藏触发的事件
          $('#myModal').on('hidden.bs.modal', function (e) {
            // do something...
            // 跳转到主页面
            location.href = './index.html'
          })
        }
      }
    })
  })

  
  
})