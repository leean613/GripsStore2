$(document).ready(onStartUp);
function onStartUp() {
    $('#btn-cancel').click(function () {
        cancel();
    });
    $('#btn-update').click(function () {
        updateApp();
    });
}

function cancel() {
    var appId = $('#app-id').text();
    location.href = "/app/detail/?id=" + appId;
}

function updateApp() {
    var staffCode = getCookie("STAFFCODE");
    var appId = $('#app-id').text();
    var appName = $('#app-name').val();
    var appDescription = $('#app-description').val();
        $.ajax({
            url: '/app/update/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, appId: appId, appName: appName, appDescription: appDescription }),
            success: function (data) {
                if (data.success && data.app != null && data.app.appId == appId) {
                    location.href = "/app/detail/?id=" + appId;
                }
            }
        });
}