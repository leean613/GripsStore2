$(function () {
    $(".pager a:eq(0)").click(function () {
        var pageNo = 0;
        var pageCount = 0;
        var pageSize = 5;
        $.ajax({
            url: '/pager/customer/page-count',
            success: function (response) {
                pageCount = response;
                alert(pageSize);
            }
        })
    });

    $(".pager a:eq(1)").click(function () {
        pageNo--;
        alert("prev");
    });

    $(".pager a:eq(2)").click(function () {
        pageNo++;
        alert("before");
    });

    $(".pager a:eq(4)").click(function () {
        pageNo = pageCount - 1;
        alert("last");
    });
})