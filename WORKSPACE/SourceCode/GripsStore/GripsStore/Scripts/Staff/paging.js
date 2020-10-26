﻿var pageCount = 0;
var totalPage;
var status = false;
var s = `<div >
              <button class="btn btn-danger">Delete</button>
              <button class="btn btn-primary">Edit</button>
         </div>`;


$(function () {
    //var totalPage;

    //ajax({
    //    url: '/staff/GetPageCount',
    //    type: 'GET',
    //    contentType: 'application/json;',
    //    data: JSON.stringify({ pageCount: pageCount }),
    //    success: function (response) {
    //        totalPage = response;
    //        alert(totalPage);
    //    }
    //});

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

        if ($('#input-search').val().trim() == "") {
            if (pageCount < totalPage - 1) {
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

            pageCountSearch++;
            $.ajax({
                url: '/staff/SearchStaffById',
                type: 'POST',
                contentType: 'application/json;',
                data: JSON.stringify({ pageCount: pageCount, pageCountSearch: pageCountSearch }),
                success: fnSuccess
            });


        }


    });

    $(".pager a:eq(4)").click(function () {
        pageCount = totalPage - 1;
        $.ajax({
            url: '/staff/GetIndex',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ pageCount: pageCount }),
            success: fnSuccess
        })


    });

    function fnSuccess(response) {
        $("#tbody").html("");
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
            $("#info").html((pageCount + 1) + `/` + totalPage);

            //console.log(staff);


        })
        checkPressButton();
        //search();
    }


})