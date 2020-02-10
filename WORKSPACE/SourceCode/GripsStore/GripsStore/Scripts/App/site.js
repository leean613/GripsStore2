var COOKIE_STAFF_CODE = "STAFFCODE"
var PATH_LOGIN = "../../Images/login.png";
var PATH_USER = "../../Images/user.png";

var staffCode = "";

$(document).ready(onStartUp);
function onStartUp() {
    try {
        checkLogin();
        $('#home').on('click', goHome);
        $('#btn-search').on('click', searchApp);
        $('#btn-login').on('click', loginLogout);
        $('#input-search').keyup(function (e) {
            if (e.keyCode == 13) {
                searchApp();
            }
        });
    }
    catch (ex) {
        ttDebug.Exception(SCRIPT_FILE, 'onStartUp', ex);
    }
}
function goHome() {
    location.href = "/";
}
function searchApp() {
    var key = $('#input-search').val().trim();
    var sURL = "/";
    if (key != "") {
        sURL += "?key = " + key;
    }
    //ttGuard.showWait();
    // ﾍﾟｰｼﾞ遷移
    location.href = sURL;
}

function loginLogout() {
    if (staffCode == "") {
        location.href = "/login/";
    } else {
        var result = confirm("ログアウトします。よろしいでしょうか？");
        if (result) {
            setCookie(COOKIE_STAFF_CODE, "");
            location.reload();
        }
    }
}

function checkLogin() {
    staffCode = getCookie(COOKIE_STAFF_CODE);
    if (staffCode == "") {
        $('#user').attr("src", PATH_LOGIN);
    } else {
        $('#user').attr("src", PATH_USER);
    }
}