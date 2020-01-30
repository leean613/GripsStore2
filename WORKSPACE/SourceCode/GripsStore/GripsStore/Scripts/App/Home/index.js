$(document).ready(onStartUp);
function onStartUp() {
    try {
        //$('.site-title').hide();
        $('.app-item').on('click', changePage);
    }
    catch (ex) {
        ttDebug.Exception(SCRIPT_FILE, 'onStartUp', ex);
    }
}

function changePage() {
    sURL = "/App/Detail/?id=" + $(this)[0].id;
    //ttGuard.showWait();
    // ﾍﾟｰｼﾞ遷移
    location.href = sURL;
}