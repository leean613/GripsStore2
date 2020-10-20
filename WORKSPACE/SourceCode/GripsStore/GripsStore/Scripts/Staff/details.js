var kanjiName;
var kanaName;
var generationno;
//var staffCode;


var staffCode = $('#staffCode').val();

$(document).ready(onStartUp);
function onStartUp() {
    Auth = getCookie("STAFFCODE");
    if (Auth != 0) {
        $('#btn-cancel').click(function () {
            cancel();
        })
        $('#btn-default').click(function () {
            deleteStaff();
        })

        $('#btn-submit').click(function () {
            editStaff();
        });


    }
}


function cancel() {

    staffCode = $('#staffCode').val();
    location.href = "/Staff/Details/?code=" + staffCode;
}


    
}



function deleteStaff() {
    var result = confirm("アプリが削除されます。よろしいでしょうか？");
    staffCode = $('#staffCode').val();
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

