var pageCount = 0;
var s = `<div id="admin" class="row admin-button">
              <button id="btn-delete" class="btn btn-danger">Delete</button>
              <button id="btn-edit" class="btn btn-primary">Edit</button>
         </div>`;

$(function () {
    var totalPage;

    //ajax({
    //    url: '/staff/GetPageCount',
    //    type: 'POST',
    //    contentType: 'application/json;',
    //    data: JSON.stringify({ pageCount: pageCount }),
    //    success: function (response) {
    //        totalPage = response;
    //        alert(totalPage);
    //    }
    //});


    $(".pager a:eq(5)").click(function () {
        var dcm = 'a';
        $.ajax({
            url: '/staff/GetPageCount',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ dcm: dcm }),
            success: function (response) {
                console.log(response);
            }
        })
    });

    $(".pager a:eq(0)").click(function () {
        pageCount = 0;
        var pageSize = 5;
        $.ajax({
            url: '/staff/GetIndex',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ pageCount: pageCount }),
            success: fnSuccess
        })
    });

    $(".pager a:eq(1)").click(function () {
        pageCount--;
        $.ajax({
            url: '/staff/GetIndex',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ pageCount: pageCount }),
            success: fnSuccess
        })



    });

    $(".pager a:eq(2)").click(function () {
        pageCount++;
        //alert("before");
        $.ajax({
            url: '/staff/GetIndex',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ pageCount: pageCount }),
            success: fnSuccess
        })

    });

    $(".pager a:eq(4)").click(function () {
        pageNo = pageCount - 1;
        alert("last");
    });

    function fnSuccess(response) {
        $("#tbody").html("");
        $(response).each(function (index, staff) {
            //console.log(index, staff);

            var tr = $("<tr/>");
            $("<td/>").html(staff.staffCode).appendTo(tr);
            $("<td/>").html(staff.kanaName).appendTo(tr);
            $("<td/>").html(staff.kanjiName).appendTo(tr);

            $("<td/>").html(s).appendTo(tr);
            tr.appendTo("#tbody");
            $("#info").html((pageCount + 1));

        })

    }


})