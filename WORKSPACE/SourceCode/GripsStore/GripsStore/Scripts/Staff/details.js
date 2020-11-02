var kanjiName;
var kanaName;
var generationno;
var password;
//var staffCode;


var staffCode = $('#staffCode').val().trim();

$(document).ready(onStartUp);
function onStartUp() {
    Auth = getCookie("STAFFCODE");
    if (Auth != "") {
        //$('#btn-cancel').click(function () {
        //    cancel();
        //});
        $('#btn-huy').on('click', goHome);


        $('#btn-default').click(function () {
            deleteStaff();
        });

        $('#btn-submit').click(function () {
            editStaff();
        });
        $('#home').on('click', goHome);


        $('#btn-login').click(function () {
            $("#myDropDown").toggle();

        });

        $(".body-content").click(function () {
            if ($("#myDropDown").is(':visible')) { $("#myDropDown").toggle(); }
        });

        $('#btn-login').mouseenter(function () {
            $("#myDropDown").toggle();

        });
        $('#myDropDown').mouseleave(function () {
            $("#myDropDown").toggle();

        });
        $('#input-search').keyup(function (e) {
            if (e.keyCode == 13) {
                search();
            }
        });


    }
}

function search() {

    //staffCode = $('#search-input').val().trim();
    pageCountSearch = 0;
    totalPage = 0;
    pageCount = 0;


    staffCode = $('#input-search').val().trim();
    console.log(staffCode);
    var s = `<div>
              <button class="btn btn-danger">Delete</button>
              <button class="btn btn-primary">Edit</button>
         </div>`;

    $.ajax({
        url: '/staff/GetPageSearchCount',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({ staffCode: staffCode }),
        success: function (response) {
            //console.log(response);

            totalSearchPage = response;


        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        },
    }),

        $.ajax({
            url: '/Staff/SearchStaffById/',
            type: 'Post',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, pageCountSearch: pageCountSearch }),
            success: fnSuccessSearch,


        });



    function fnSuccessSearch(response) {
        location.href = "/staff/index";
        $("#tbody").html("");
        console.log(response.length);
        //searchLength = response.length;

        $(response).each(function (index, staff) {
            //console.log(index, staff);


            var tr = $("<tr/>");
            var UnderLine = `<a href="/Staff/Details?code=` + staff.staffCode + `">` + staff.staffCode + `</a>`;

            $("<td/>").addClass("staffCodeQuery").html(UnderLine).appendTo(tr);
            $("<td/>").html(staff.kanaName).appendTo(tr);
            $("<td/>").html(staff.kanjiName).appendTo(tr);

            $("<td/>").html(s).appendTo(tr);
            tr.appendTo("#tbody");


        });
        if (totalSearchPage > 0) { $("#info").html((pageCountSearch + 1) + `/` + totalSearchPage); }
        else { $("#info").html(pageCountSearch); }
        checkPressButton();
    }

}

function cancel() {
    value = confirm("cancel");
    if (value) {
        location.href = "/";
        //location.href = "/Staff";
    }

}

//FINISHED 
function goHome() {
    staffCode = $('#staffCode').val().trim();
    location.href = "/staff/index";
    //location.href = "/Staff/Details?code=" + staffCode;
}

//FINISHED 
function deleteStaff() {
    var result = confirm("アプリが削除されます。よろしいでしょうか？");
    staffCode = $('#staffCode').val().trim();
    if (result) {
        $.ajax({
            url: '/Staff/Delete/',
            type: 'Post',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode }),
            success: function (data) {
                if (data.success) {
                    alert("アプリが削除されました。");
                    location.href = "/Staff/Index/";
                }
            }
        });
    }
    else location.href = "/Staff/Details/?code=" + staffCode;
}
//FINISHED 
function editStaff() {
    //ttGuard.showWait();
    kanjiName = $('#kanjiName').val();
    kanaName = $('#kanaName').val();
    generationno = $('#generationno').val();

    wardcode = $('#staffWardCode').val();
    password = $('#password').val();

    if (staffCode != "" && kanjiName != "" && kanaName != "") {
        $.ajax({
            url: '/Staff/Update/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, kanjiName: kanjiName, kanaName: kanaName, password: password, generationno: generationno, wardcode: wardcode }),
            success: function (data) {
                if (data.success) {
                    console.log(data);
                    location.href = "/Staff/Details/?code=" + staffCode;
                } else {
                    alertError("loi");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertError();
            }
        });
    }
    else {
        alert("mising info");
        location.href = "/Staff/Details/?code=" + staffCode;
    }
}

