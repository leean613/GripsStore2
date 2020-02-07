$(document).ready(onStartUp);
function onStartUp() {
    try {
        //$('.site-title').hide();
        $('.app-item').on('click', viewDetail);
        $('#btn-add-item').on('click', createApp);
    }
    catch (ex) {
        ttDebug.Exception(SCRIPT_FILE, 'onStartUp', ex);
    }
}

function viewDetail() {
    sURL = "/app/detail/?id=" + $(this)[0].id;
    //ttGuard.showWait();
    // ﾍﾟｰｼﾞ遷移
    location.href = sURL;
}

function createApp() {
    sURL = "/app/register/";
    //ttGuard.showWait();
    // ﾍﾟｰｼﾞ遷移
    location.href = sURL;
}