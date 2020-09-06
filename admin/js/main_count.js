$(function () {
  $.ajax({
    type: 'get',
    url: bigNews.data_info,
    success: function (info) {
      // console.log(info);
      $('.spannel_list .scolor00 em').text(info.totalArticle)
      $('.spannel_list .scolor01 em').text(info.dayArticle)
      $('.spannel_list .scolor02 em').text(info.totalComment)
      $('.spannel_list .scolor03 em').text(info.dayComment)
    }
  });
  $.ajax({
    type: 'get',
    url: bigNews.data_article,
    success: function (info) {
      if (info.code === 200) {
        // console.log(info);
        loadEchars(info);
      }
    }
  });
  $.ajax({
    type: 'get',
    url: bigNews.data_category,
    success: function (info) {
      if (info.code === 200) {
        // console.log(info);
        myChart1(info);
      }
    }
  })
})