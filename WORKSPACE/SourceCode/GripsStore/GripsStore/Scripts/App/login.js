var COOKIE_STAFF_CODE = "STAFFCODE"
var COOKIE_STAFF_NAME = "STAFFNAME"

$(document).ready(onStartUp);
function onStartUp() {
    staffCode = getCookie(COOKIE_STAFF_CODE);
    if (staffCode != "") {
        location.href = "/";
    }
    $('#username').keypress(function (e) {
        if (e.which == 13) {
            $('#password').focus();
        }
    });
    $('#password').keypress(function (e) {
        if (e.which == 13) {
            $('#btn-login').click();
        }
    });

    $('#btn-login').click(function () {
        login();
    });
}

function login() {
    var staffCode = $('#username').val();
    var password = $('#password').val();
    $('#warring').addClass("invisible").removeClass("visible");
    if (staffCode == "") {
        $('#warring').text("ユーザー名を入力してください");
        $('#warring').removeClass("invisible").addClass("visible");
        return;
    }
    if (password == "") {
        $('#warring').text("パスワードを入力してください");
        $('#warring').removeClass("invisible").addClass("visible");
        return;
    }
    ttGuard.showWait();
    $.ajax({
        url: '/login/checkLogin/',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({ staffCode: staffCode, password: password }),
        success: function (data) {
            ttGuard.destory();
            if (data.success) {
                setCookie(COOKIE_STAFF_CODE, data.staff.staffCode);
                setCookie(COOKIE_STAFF_NAME, data.staff.kanjiName);
                location.href = "/";

            } else {
                $('#warring').text("ユーザー名／パスワードをご確認してください");
                $('#warring').removeClass("invisible").addClass("visible");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alertError();
            ttGuard.destory();
        }
    });
}

function alertError() {
    alert("エラーが発生されました。");
}