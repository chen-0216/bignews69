$(function () {
  var currentPage;
  function pagination(info) {
    $('#pagination').twbsPagination({
      totalPages: info.data.totalPage,
      visiblePages: 7,
      first: '首页',
      prev: '上一页',
      next: '下一页',
      last: '尾页',
      onPageClick: function (event, page) {
        currentPage = page;
        $.ajax({
          type: 'get',
          url: bigNews.comment_list,
          data: {
            page: currentPage,
            perpage: 6
          },
          success: function (info) {
            if (info.code === 200) {
              if (info.data.totalCount === 0) {
                $('#pagination').hide().next().show();
              } else {
                $('#pagination').show().next().hide();
                var htmlStr = template('commentList', info.data);
                $('tbody').html(htmlStr);
              }
            }
          }
        });
      }
    });
  }

  $.ajax({
    type: 'get',
    url: bigNews.comment_list,
    data: {
      page: currentPage,
      perpage: 6
    },
    success: function (info) {
      if (info.code === 200) {
        var htmlStr = template('commentList', info.data);
        $('tbody').html(htmlStr);
        pagination(info);
      }
    }
  });

  $('tbody').on('click', '.btn-pass', function () {
    var _this = this;
    var id = $(this).data('id');
    $.ajax({
      type: 'post',
      url: bigNews.comment_pass,
      data: {
        id: id
      },
      success: function (info) {
        if (info.code === 200) {
          $(_this).parent().prev().text(info.msg)
        }
      }
    })
  });

  $('tbody').on('click', '.btn-rej', function () {
    var _this = this;
    var id = $(this).data('id');
    $.ajax({
      type: 'post',
      url: bigNews.comment_reject,
      data: {
        id: id
      },
      success: function (info) {
        if (info.code === 200) {
          $(_this).parent().prev().text(info.msg)
        }
      }
    })
  });

  $('tbody').on('click', '.btn-del', function () {
    var _this = this;
    var id = $(this).data('id');
    $.ajax({
      type: 'post',
      url: bigNews.comment_delete,
      data: {
        id: id
      },
      success: function (info) {
        if (info.code === 200) {
          $.ajax({
            type: 'get',
            url: bigNews.comment_list,
            data: {
              page: currentPage,
              perpage: 6
            },
            success: function (info) {
              if (info.code === 200) {
                if (info.data.totalCount === 0) {
                  $('#pagination').hide().next().show();
                } else {
                  $('#pagination').show().next().hide();
                  var htmlStr = template('commentList', info.data);
                  $('tbody').html(htmlStr);
                  if (info.data.data.length === 0) {
                    currentPage -= 1;
                  }
                  $('#pagination').twbsPagination('changeTotalPages', info.data.totalPage, currentPage)
                }
              }
            }
          });
        }
      }
    })
  })
})