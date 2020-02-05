$(document).ready(onStartUp);
function onStartUp() {
    $('#btn-delete').click(function () {
        deleteApp();
    });
    $('#btn-edit').click(function () {
        editApp();
    });
}

function deleteApp() {
    var result = confirm("アプリが削除されます。よろしいでしょうか？");
    if (result) {
        var staffCode = getCookie("STAFFCODE");
        var appId = $('#app-id').text();
        $.ajax({
            url: '/app/delete/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, appId: appId }),
            success: function (data) {
                if (data.success && data.app != null && data.app.appId == appId) {
                    alert("アプリが削除されました。");
                    location.href = "/";
                }
            }
        });
    }
}

function editApp() {
    var appId = $('#app-id').text();
    location.href = "/app/edit/?id=" + appId;
}