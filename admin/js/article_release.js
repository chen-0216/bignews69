$(function () {
  $.ajax({
    type: 'get',
    url: bigNews.category_list,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('option', info)
        $('.category').html(htmlStr);
      }
    }
  });
  $('#inputCover').on('change', function () {
    var file = this.files[0];
    var url = URL.createObjectURL(file);
    $('.article_cover').attr('src', url);
  });
  $('#form').on('click', '.btn', function (e) {
    e.preventDefault();
    console.log(e.target);
    var data = new FormData($('#form')[0]);
    data.append('content', editor.txt.html());
    if ($(e.target).hasClass('btn-release')) {
      data.append('state', '已发布');
    } else {
      data.append('state', '草稿');
    }

    $.ajax({
      type: 'post',
      url: bigNews.article_publish,
      data: data,
      contentType: false,
      processData: false,
      success: function (info) {
        if (info.code === 200) {
          parent.$('.menu .level02 li:eq(0)').click();
          window.location.href = './article_list.html'
        }
      }
    })
  });
  jeDate("#testico", {
    format: "YYYY-MM-DD",
    isTime: false,
    onClose: false,
    zIndex: 99999,
    minDate: "2014-09-19 00:00:00"
  });
  var E = window.wangEditor
  var editor = new E('#editor')
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create();
  editor.txt.html('<p></p>')
});
