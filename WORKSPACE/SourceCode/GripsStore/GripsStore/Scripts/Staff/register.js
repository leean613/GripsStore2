//do not modify START

//do not modify END
var staffCode;
var kanjiName;
var kanaName;
var generationno;
var password;

$(document).ready(onStartUp);
function onStartUp() {
    Auth = getCookie("STAFFCODE");

    if (Auth != "") {


        $('#btn-cance').click(function () {
            huy();
        });
        $('#btn-submit').click(function () {
            createStaff();
        });
        $('#home').on('click', goHome);
    }
    else {
        location.href("/staff/index");
    }

}

function huy() {
    location.href = "/staff/index";
}
function goHome() {
    location.href = "/staff/index";
}

function createStaff() {
    ttGuard.showWait();
    kanjiName = $('#kanjiName').val();
    kanaName = $('#kanaName').val();
    password = $('#password').val();

    //staffCode = $('#staffCode').val();
    generationno = $('#generationno').val();
    if (kanjiName != "" && generationno != "") {
        $.ajax({
            url: '/Staff/CreateStaff/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ kanjiName: kanjiName, kanaName: kanaName, password: password, generationno: generationno }),
            success: function (data) {
                if (data.success) {

                    console.log(data.staff.staffCode);
                    location.href = "/Staff/Details/?code=" + data.staff.staffCode;
                } else {
                    alertError();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertError();
            }
        });
    }
    else alert("staff info mising");

}

