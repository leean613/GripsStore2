var staffCode;
var kanjiName;
var kanaName;


$(document).ready(onStartUp);
function onStartUp() {

    staffCode = $('#staffcode').text();
    if (staffCode != "") {
        $('#btn-cancel').click(function () {
            cancel();
        });
        $('#btn-update').click(function () {
            updateStaff();
        });
    } else {
        location.href = "/Staff/detail/?code=" + staffCode;
    }
}

function cancel() {
    location.href = "/Staff/detail/?code=" + staffCode;
}

function updateStaff() {
    //ttGuard.showWait();
    kanjiName = $('#kanjiName').val();
    if (kanjiName == "") {
        alert("。input kanjiName");
    }
    kanaName = $('#kanjiName').val();
    staffcode = $('#staffcode').val();
    if (staffCode != "") {
        $.ajax({
            url: '/Staff/Update/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, kanjiName: kanjiName, kanaName: kanaName }),
            success: function (data) {
                if (data.success) {

                     location.href = "/staff/detail/?code=" + staffCode;
                } else {
                    alertError();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertError();
            }
        });
    }
}
function alertError() {
    alert("loi");
}











