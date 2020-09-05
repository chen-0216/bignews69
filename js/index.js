$(function () {
  $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('category', info)
        $('.level_two').html('<li class="up"></li>' + htmlStr)
        $('.left_menu').html(htmlStr)
      }
    }
  });
  $.ajax({
    type: 'get',
    url: BigNew.hotPic_news,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('hotPic', info)
        $('.focus_list').html(htmlStr)
      }
    }
  });
  $.ajax({
    type: 'get',
    url: BigNew.hotrank_list,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('hotrank_list', info)
        $('.hotrank_list').html(htmlStr)
      }
    }
  });
  $.ajax({
    type: 'get',
    url: BigNew.latest_news,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('latest', info)
        $('.common_news').html(htmlStr)
      }
    }
  });

  $.ajax({
    type: 'get',
    url: BigNew.latest_comment,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('latest_comment', info)
        $('.comment_list').html(htmlStr)
      }
    }
  });

  $.ajax({
    type: 'get',
    url: BigNew.attention_news,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('attention_news', info)
        $('.guanzhu_list').html(htmlStr)
      }
    }
  });

  $('.search_btn').on('click', function () {
    // 7.2 获取输入的内容
    var txtValue = $('.search_txt').val()
    // 7.3 判断输入内容是否为空
    if (!txtValue.trim()) {
      alert('输入的内容不能为空，请重新输入')
      return
    }
    // 7.4 跳转到列表页并将关键词传过去
    window.location.href = './list.html?search=' + txtValue
  })
})