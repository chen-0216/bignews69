$(function () {
  function render() {
    $.ajax({
      type: "get",
      url: bigNews.category_list,
      success: function (info) {
        if (info.code === 200) {
          var htmlStr = template('categoryList', info);
          $('tbody').html(htmlStr);
        }
      }
    });
  };
  render();
  $('#myModal').on('shown.bs.modal', function (e) {
    if (e.relatedTarget.id === 'xinzengfenlei') {
      $('#myModal h4').text('新增文章类别');
      $('#form')[0].reset();
    } else {
      $('#myModal h4').text('更新文章类别');
      $.ajax({
        type: 'get',
        url: bigNews.category_search,
        data: {
          id: $(e.relatedTarget).data('id'),
        },
        success: function (info) {
          $('#myModal input[name=id]').val(info.data[0].id);
          $('#myModal input[name=name]').val(info.data[0].name);
          $('#myModal input[name=slug]').val(info.data[0].slug);
        }
      })
    }
  })
  $('#addSure').on('click', function () {
    var id = $('#form input[name=id]').val();
    $.ajax({
      type: 'post',
      url: id ? bigNews.category_edit : bigNews.category_add,
      data: $('#form').serialize(),
      success: function (info) {
        if (info.code === 201 || info.code === 200) {
          $('#myModal').modal('hide');
          render();
        }
      }
    })
  });
  $('#delModal').on('shown.bs.modal', function (e) {
    window.categoryId = $(e.relatedTarget).data('id');
  });
  $('#delModal #sureDel').on('click', function () {
    $.ajax({
      type: 'post',
      url: bigNews.category_delete,
      data: {
        id: categoryId
      },
      success: function (info) {
        if (info.code === 204) {
          $('#delModal').modal('hide');
          render();
        }
      }
    })
  })
})