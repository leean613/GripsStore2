var kanjiName;
var kanaName;
var generationno;
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
    }
}
function showUpdateVersionForm() {
    $('#btn-update-version').addClass("gone");
    $('#version').addClass("gone");
    $('#update-version').removeClass("gone");
    $('#btn-update').addClass("gone");
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

    if (staffCode != "" && kanjiName != "" && kanaName != "") {
        $.ajax({
            url: '/Staff/Update/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, kanjiName: kanjiName, kanaName: kanaName, generationno: generationno }),
            success: function (data) {
                if (data.success) {
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

