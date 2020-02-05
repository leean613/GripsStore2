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
        $('#btn-edit-icon').click(function () {
            selectFile();
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

function selectFile() {
    $("input[type='file']").click();
}

function OnJspSelectImage(input) {
    if (input.files != undefined && input.files.length > 0) {
        var selectFile = input.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#app-icon').attr('src', e.target.result);
        }
        reader.readAsDataURL(selectFile);
    }
}