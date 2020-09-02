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
  });

  var currentPage;
  function pagination(info) {
    $('#pagination-demo').twbsPagination({
      first: '首页',
      prev: '上一页',
      next: '下一页',
      last: '尾页',
      totalPages: info.data.totalPage,
      visiblePages: 7,
      initiateStartPageClick: false,
      onPageClick: function (event, page) {
        currentPage = page;
        $.ajax({
          type: 'get',
          url: bigNews.article_query,
          data: {
            key: $('.form-inline input[name=key]').val().trim(),
            type: $('#selCategory').val(),
            state: $('#selStatus').val(),
            page: page,
            perpage: 6,
          },
          success: function (info) {
            if (info.code === 200) {
              var htmlStr = template('articleList', info.data)
              $('tbody').html(htmlStr);
            }
          }
        })
      }
    });
  }

  $.ajax({
    type: 'get',
    url: bigNews.article_query,
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('articleList', info.data)
        $('tbody').html(htmlStr);
        if (info.data.totalCount === 0) {
          $('#pagination-demo').hide().next().show();
        } else {
          $('#pagination-demo').show().next().hide();
          pagination(info);
        }
      }
    }
  });

  //筛选功能
  $('#btnSearch').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'get',
      url: bigNews.article_query,
      data: {
        key: $('.form-inline input[name=key]').val().trim(),
        type: $('#selCategory').val(),
        state: $('#selStatus').val(),
        page: 1,
        perpage: 6,
      },
      success: function (info) {
        if (info.code === 200) {
          var htmlStr = template('articleList', info.data)
          $('tbody').html(htmlStr);
          if (info.data.totalCount === 0) {
            $('#pagination-demo').hide().next().show();
          } else {
            $('#pagination-demo').show().next().hide();
            $('#pagination-demo').twbsPagination('changeTotalPages', info.data.totalPage, 1)
          }
        }
      }
    });
  });
  $('#delModal').on('shown.bs.modal', function (e) {
    window.currentId = e.relatedTarget.id;
  });
  $('#sureDel').on('click', function () {
    $.ajax({
      type: 'post',
      url: bigNews.article_delete,
      data: {
        id: currentId,
      },
      success: function (info) {
        if (info.code === 204) {
          $('#delModal').modal('hide');
          $.ajax({
            type: 'get',
            url: bigNews.article_query,
            data: {
              key: $('.form-inline input[name=key]').val().trim(),
              type: $('#selCategory').val(),
              state: $('#selStatus').val(),
              page: currentPage,
              perpage: 6,
            },
            success: function (info) {
              if (info.code === 200) {
                var htmlStr = template('articleList', info.data)
                $('tbody').html(htmlStr);
                if (info.data.totalCount === 0) {
                  $('#pagination-demo').hide().next().show();
                } else {
                  if (info.data.data.length === 0) {
                    currentPage -= 1;
                  };
                  $('#pagination-demo').twbsPagination('changeTotalPages', info.data.totalPage, currentPage)
                }
              }
            }
          })
        }
      }
    })
  });
  $('#release_btn').on('click', function () {
    parent.$('.menu .level02 li:eq(1)').click();
  })
})