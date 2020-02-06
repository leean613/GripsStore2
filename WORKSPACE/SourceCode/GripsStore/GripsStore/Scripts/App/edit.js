var UPLOAD_FILE_TAG = "file";
var UPLOAD_ACTION_TAG = "action";
var UPLOAD_ACTION_INSTALL_FILE = "install file";
var UPLOAD_ACTION_APP_ICON = "app icon image";
var UPLOAD_APP_ID_TAG = "appId";

var staffCode;
var appId;
var selectImage;
var newIconFileName = "";

$(document).ready(onStartUp);
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
    location.href = "/app/detail/?id=" + appId;
}

function updateApp() {
    //TODO sho progress dialog to wait completed
    if (selectImage != null) {
        uploadFile(selectImage, UPLOAD_ACTION_APP_ICON);
    } else {
        updateAppInfor();
    }
}

function updateAppInfor() {
    var appNameOrigin = $('#app-name-origin').text();
    var appDescriptionOrigin = $('#app-description-origin').text();
    var appName = $('#app-name').val();
    var appDescription = $('#app-description').val();
    if (appName != appNameOrigin || appDescription != appDescriptionOrigin || newIconFileName != "") {
        $.ajax({
            url: '/app/update/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, appId: appId, appName: appName, appDescription: appDescription, appIcon: newIconFileName }),
            success: function (data) {
                if (data.success && data.app != null && data.app.appId == appId) {
                    selectImage = null;
                    newIconFileName = "";
                    location.href = "/app/detail/?id=" + appId;
                }
            }
        });
    }
}

function selectFile() {
    $("input[type='file']").click();
}

function OnJspSelectImage(input) {
    if (input.files != undefined && input.files.length > 0) {
        selectImage = input.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#app-icon').attr('src', e.target.result);
        }
        reader.readAsDataURL(selectImage);
    }
}

function uploadFile(file, action) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            onSendFileComplete(req.response);
        }
    }
    var formData = new FormData();

    formData.append(UPLOAD_FILE_TAG, file);
    formData.append(UPLOAD_ACTION_TAG, action);
    formData.append(UPLOAD_APP_ID_TAG, appId);
    req.open("POST", '/api/upload/');
    req.send(formData);
}

function onSendFileComplete(response) {
    response = eval("(" + response + ")");
    if (response.success) {
        var action = response.fileContent.action;
        var id = response.fileContent.appId;
        if (action == UPLOAD_ACTION_APP_ICON && id == appId) {
            newIconFileName = response.fileContent.fileName;
            updateAppInfor();
        }
    }
}