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
  var str = location.search;
  // console.log(str);
  if (!str) {
    location.href = './index.html';
  }
  var obj = utils.convertToObj(str.slice(1));
  var data = {}
  // console.log(data);
  if (obj.id) {
    data = {
      type: obj.id
    }
  } else {
    data = {
      key: decodeURI(obj.search)
    }
  }
  // var categoryId = obj.id
  // console.log(data);

  $.ajax({
    type: 'get',
    url: BigNew.artilce_list,
    data: data,
    success: function (info) {
      if (info.code === 200) {
        // console.log(info);
        if (info.data.totalCount === 0) {
          $('.setfr').html('<div class="list_title"><h3><p>暂时没有数据...</p></h3></div>')
        } else {
          if (obj.id) {
            var str = `<div class="list_title">
            <h3>${info.data.data[0].category}</h3>
             </div>`
          } else {
            var str = `<div class="list_title">
            <h3>关键词：${decodeURI(obj.search)}</h3>
             </div>`
          }

          var htmlStr = template('latest', info.data)
          $('.setfr').html(str + htmlStr)
        }
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