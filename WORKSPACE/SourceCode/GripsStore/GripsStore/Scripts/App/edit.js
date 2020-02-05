$(document).ready(onStartUp);
var staffCode;
var appId;
function onStartUp() {
    staffCode = getCookie("STAFFCODE");
    appId = $('#app-id').text();
    if (staffCode != "") {
        $('#btn-cancel').click(function () {
            cancel();
        });
        $('#btn-update').click(function () {
            updateApp();
        });
    } else {
        location.href = "/app/detail/?id=" + appId;
    }
}

function cancel() {
    var appId = $('#app-id').text();
    location.href = "/app/detail/?id=" + appId;
}

function updateApp() {
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