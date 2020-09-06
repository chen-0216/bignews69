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
    url: BigNew.attention_news,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('attention_news', info)
        $('.guanzhu_list').html(htmlStr)
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
    url: BigNew.hotrank_list,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('hotrank_list', info)
        $('.hotrank_list').html(htmlStr)
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
  });

  var id = utils.convertToObj(location.search.slice(1)).id
  if (!id) {
    location.href = './index.html'
  }
  // console.log(id);
  $.ajax({
    type: 'get',
    url: BigNew.article_detail,
    data: {
      id: id
    },
    success: function (info) {
      if (info.code === 200) {
        console.log(info);
        var htmlStr = template('article_detail', info.data);
        $('.setfr .box').html(htmlStr);
        renderComment(info.data.id);
      }
    }
  });
  function renderComment(id) {
    $.ajax({
      type: 'get',
      url: BigNew.comment_list,
      data: {
        articleId: id
      },
      success: function (info) {
        if (info.code === 200) {
          console.log(info);
          var htmlStr = template('comment_list', info);
          $('.comment_list_con').html(htmlStr);
          $('.comment_count').text(info.data.length + '条评论')
        }
      }
    });
  }



  $('#myForm input[name=articleId]').val(id);
  $('#myForm').on('submit', function (e) {
    // console.log($(this).serialize());
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: BigNew.post_comment,
      data: $(this).serialize(),
      success: function (info) {
        if (info.code === 201) {
          alert('评论发表成功！')
          // renderComment(info.data.id);
          $('#myForm')[0].reset()
        }
      }
    })
  })
})