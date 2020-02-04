var COOKIE_STAFF_CODE = "STAFFCODE"
var COOKIE_STAFF_NAME = "STAFFNAME"
$(document).ready(onStartUp);
function onStartUp() {
    $('#usename').keypress(function (e) {
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
    var staffCode = $('#usename').val();
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
    $.ajax({
        url: '/Login/CheckLogin/',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({ staffCode: staffCode, password: password }),
        success: function (data) {
            if (data.success) {
                setCookie(COOKIE_STAFF_CODE, data.staff.staffCode);
                setCookie(COOKIE_STAFF_NAME, data.staff.kanjiName);
                location.href = "/";
            } else {
                $('#warring').text("ユーザー名／パスワードをご確認してください");
                $('#warring').removeClass("invisible").addClass("visible");
            }
        }
    });
}

function onSuccess(result) {
    alert(result);
}
