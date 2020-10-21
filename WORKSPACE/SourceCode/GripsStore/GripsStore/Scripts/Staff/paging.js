var pageCount = 0;
var s = `<div >
              <button class="btn btn-danger">Delete</button>
              <button class="btn btn-primary">Edit</button>
         </div>`;


$(function () {
    //var totalPage;

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


        if (pageCount > 0) {
            pageCount--;
            $.ajax({
                url: '/staff/GetIndex',
                type: 'POST',
                contentType: 'application/json;',
                data: JSON.stringify({ pageCount: pageCount }),
                success: fnSuccess
            })
        }



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
            //`</a> `
            var tr = $("<tr/>");
            var UnderLine = `<a href="/Staff/Details?code=` + staff.staffCode + `">` + staff.staffCode + `</a>`;
            //console.log(UnderLine);
            $("<td/>").addClass("staffCodeQuery").html(UnderLine).appendTo(tr);
            $("<td/>").html(staff.kanaName).appendTo(tr);
            $("<td/>").html(staff.kanjiName).appendTo(tr);
            //var s = `<div >
            //  <button class="btn btn-danger">Delete</button>
            //  <button class="btn btn-primary">Edit</button>
            //        </div>`;
            $("<td/>").html(s).appendTo(tr);
            tr.appendTo("#tbody");
            $("#info").html((pageCount + 1));
            //console.log(staff);


        })
        checkPressButton();
        search();
    }


})