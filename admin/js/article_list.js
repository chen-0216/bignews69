$(function () {
  $.ajax({
    type: 'get',
    url: bigNews.category_list,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('option', info)
        $('#selCategory').html(htmlStr);
      }
    }
  })
})