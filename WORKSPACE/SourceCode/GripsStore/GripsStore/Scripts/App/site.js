$(document).ready(onStartUp);
function onStartUp() {
    try {
        //$('.site-title').hide();
        $('#btn-search').on('click', searchApp);
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