


var pageCount = 0;
var totalPage;
var status = false;
var s = `<div >
              <button class="btn btn-danger">Delete</button>
              <button class="btn btn-primary">Edit</button>
         </div>`;


$(function () {


    //get page count index
    $(".pager a:eq(5)").click(function () {

        $.ajax({
            url: '/staff/GetPageCount',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({}),
            success: function (response) {
                //console.log(response);

                totalPage = response;
                $("#info").html((pageCount + 1) + `/` + totalPage);

            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
            },
        })
    });



    $(".pager a:eq(0)").click(function () {

        //if (($('#input-search').val().trim() == "")) {
        //    pageCount = 0;
        //    pageCountSearch = -1;


        //    $.ajax({
        //        url: '/staff/index',
        //        type: 'POST',
        //        contentType: 'application/json;',
        //        data: JSON.stringify({}),
        //        success: function (response) {
        //            if (response.success) {
        //                console.log(response);
        //                location.href("/staff/index");
        //            }

        //        },
        //        error: function (xhr, textStatus, errorThrown) {
        //            console.log(xhr.responseText);
        //        },
        //    })
        //}
        // old version using ajax to first page
        if (($('#input-search').val().trim() == "")) {
            pageCount = 0;
            pageCountSearch = -1;
            $(".pager a:eq(5)").click();
            $.ajax({
                url: '/staff/GetIndex',
                type: 'POST',
                contentType: 'application/json;',
                data: JSON.stringify({ pageCount: pageCount }),
                success: fnSuccess
            })


        }




        if (($('#input-search').val().trim() != "") && pageCountSearch != '-1') {
            var staffCode = $('#input-search').val().trim();
            pageCount = 0;
            pageCountSearch = 0;
            $.ajax({
                url: '/staff/SearchStaffById',
                type: 'POST',
                contentType: 'application/json;',
                data: JSON.stringify({ staffCode: staffCode, pageCountSearch: pageCountSearch }),
                success: fnSuccess
            });


        }


    });

    $(".pager a:eq(1)").click(function () {

        if ($('#input-search').val().trim() == "") {
            if (pageCount > 0) {
                pageCountSearch = -1;
                pageCount--;
                $.ajax({
                    url: '/staff/GetIndex',
                    type: 'POST',
                    contentType: 'application/json;',
                    data: JSON.stringify({ pageCount: pageCount }),
                    success: fnSuccess
                })
            }
        }
        if ($('#input-search').val().trim() != "") {
            var staffCode = $('#input-search').val().trim();
            pageCount = 0;

            if (pageCountSearch > 0) {
                pageCountSearch--;
                $.ajax({
                    url: '/staff/SearchStaffById',
                    type: 'POST',
                    contentType: 'application/json;',
                    data: JSON.stringify({ staffCode: staffCode, pageCountSearch: pageCountSearch }),
                    success: fnSuccess
                });

            }

        }



    });

    $(".pager a:eq(2)").click(function () {

        if ($('#input-search').val().trim() == "") {
            if (pageCount < totalPage - 1) {
                pageCountSearch = -1;
                pageCount++;
                $.ajax({
                    url: '/staff/GetIndex',
                    type: 'POST',
                    contentType: 'application/json;',
                    data: JSON.stringify({ pageCount: pageCount }),
                    success: fnSuccess
                })
            }
        }

        if ($('#input-search').val().trim() != "") {
            var staffCode = $('#input-search').val().trim();
            pageCount = 0;

            if (pageCountSearch + 1 < totalSearchPage) {
                pageCountSearch++;
                $.ajax({
                    url: '/staff/SearchStaffById',
                    type: 'POST',
                    contentType: 'application/json;',
                    data: JSON.stringify({ staffCode: staffCode, pageCountSearch: pageCountSearch }),
                    success: fnSuccess
                });

            }
        }


    });

    $(".pager a:eq(4)").click(function () {
        if ($('#input-search').val().trim() != "") {
            var staffCode = $('#input-search').val().trim();
            if (totalSearchPage > 0) pageCountSearch = totalSearchPage - 1;
            $.ajax({
                url: '/staff/SearchStaffById',
                type: 'POST',
                contentType: 'application/json;',
                data: JSON.stringify({ staffCode: staffCode, pageCountSearch: pageCountSearch }),
                success: fnSuccess
            })
        }
        if ($('#input-search').val().trim() == "") {
            if (totalPage > 0) pageCount = totalPage - 1;
            $.ajax({
                url: '/staff/GetIndex',
                type: 'POST',
                contentType: 'application/json;',
                data: JSON.stringify({ pageCount: pageCount }),
                success: fnSuccess
            })
        }


    });

    function fnSuccess(response) {
        $("#tbody").html("");
        if (pageCountSearch > 0) {
            searchLength = response.length;
        }
        //console.log(response);
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


            //console.log(staff);


        })
        if ($('#input-search').val().trim() == "") { $("#info").html((pageCount + 1) + `/` + totalPage) };

        if ($('#input-search').val().trim() != "") $("#info").html((pageCountSearch + 1) + `/` + totalSearchPage);
        checkPressButton();
        //search();
    }


})