$(function () {
  $.ajax({
    type: 'get',
    url: bigNews.category_list,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('option', info);
        $('.category').html(htmlStr);
      }
    }
  });

  var str = location.search.slice(1)
  var id = utils.convertToObj(str).id;
  $.ajax({
    type: 'get',
    url: bigNews.article_search,
    data: {
      id: id,
    },
    success: function (info) {
      if (info.code === 200) {
        $('#form select[name=categoryId]').val(info.data.categoryId)
        $('#form input[name=title]').val(info.data.title)
        $('#form .article_cover').attr('src', info.data.cover)
        $('#form input[name=date]').val(info.data.date)
        editor.txt.html(info.data.content)
      }
    }
  });

  jeDate("#testico", {
    format: "YYYY-MM-DD",
    isTime: false,
    onClose: false,
    zIndex: 9999,
    minDate: "2014-09-19 00:00:00"
  });
  var E = window.wangEditor
  var editor = new E('#editor')
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create();
  editor.txt.html('<p></p>');

  $('#inputCover').on('change', function () {
    var file = this.files[0];
    var url = URL.createObjectURL(file);
    $('.article_cover').attr('src', url)
  });
  $('#form').on('click', '.btn', function (e) {
    e.preventDefault();
    var data = new FormData($('#form')[0]);
    data.append('id', id);
    data.append('content', editor.txt.html())
    if ($(this).hasClass('btn-edit')) {
      data.append('state', '已发布')
    } else {
      data.append('state', '草稿')
    }
    $.ajax({
      type: 'post',
      url: bigNews.article_edit,
      data: data,
      contentType: false,
      processData: false,
      success: function (info) {
        if (info.code === 200) {
          location.href = './article_list.html'
        }
      }
    })
  })
})