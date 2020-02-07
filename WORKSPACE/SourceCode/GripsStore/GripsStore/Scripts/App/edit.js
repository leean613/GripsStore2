//do not modify START
var UPLOAD_FILE_TAG = "file";
var UPLOAD_ACTION_TAG = "action";
var UPLOAD_ACTION_INSTALL_FILE = "install file";
var UPLOAD_ACTION_APP_ICON = "app icon image";
var UPLOAD_APP_ID_TAG = "appId";
//do not modify END

var staffCode;
var appId;
var selectImage;
var selectFile;
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
        $('#btn-select-icon').click(function () {
            $('#select-image').click();
        });
        $('#btn-update-version').click(function () {
            showUpdateVersionForm();
        });
        $('#btn-select-file').click(function () {
            $('#select-file').click();
        });
        $('#btn-clear-file').click(function () {
            clearFileInput();
        });
        $('#btn-close-update-version').click(function () {
            closeUpdateVersionForm();
        });
        $('#btn-update-file').click(function () {
            updateFile();
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
    var appName = $('#app-name').val();
    if (appName == "") {
        alert("アプリ名を入力してください。");
    } else if (selectImage != null) {
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
                } else {
                    alertError();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertError();
            }
        });
    } else {
        location.href = "/app/detail/?id=" + appId;
    }
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

function OnJspSelectFile(input) {
    if (input.files != undefined && input.files.length > 0) {
        selectFile = input.files[0];
        var fileName = selectFile.name;
        $('#input-file-name').val(fileName);
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
        } else if (action == UPLOAD_ACTION_INSTALL_FILE && id == appId) {
            updateVersionInfor();
        }
    } else {
        alertError();
    }
}

function showUpdateVersionForm() {
    $('#btn-update-version').addClass("gone");
    $('#version').addClass("gone");
    $('#update-version').removeClass("gone");
    $('#btn-update').addClass("gone");
}

function closeUpdateVersionForm() {
    $('#input-version-name').val("");
    $('#input-file-name').val("");
    $('#btn-update-version').removeClass("gone");
    $('#version').removeClass("gone");
    $('#update-version').addClass("gone");
    $('#btn-update').removeClass("gone");
    selectFile = null;
}

function updateFile() {
    var verNm = $('#input-version-name').val();
    if (verNm == "") {
        alert("バージョン名を入力してください。");
    } else if (selectFile != null) {
        uploadFile(selectFile, UPLOAD_ACTION_INSTALL_FILE);
    } else {
        alert("インストールファイルを選択してください。");
    }
}

function updateVersionInfor() {
    var verCd = $('#input-version-code').val();
    var verNm = $('#input-version-name').val();
    var fileNm = selectFile.name;
    $.ajax({
        url: '/app/updatefile/',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({ staffCode: staffCode, appId: appId, verCdStr: verCd, verNm: verNm, fileNm: fileNm }),
        success: function (data) {
            if (data.success && data.fileContent != null && data.fileContent.appId == appId) {
                closeUpdateVersionForm();
                $('#app-version').text(data.fileContent.verNm);
                var newVerCd = data.fileContent.verCd + 1;
                $('#app-version').val(data.fileContent.verNm);
                $('#input-version-code').val(newVerCd);
            } else {
                alertError();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alertError();
        }
    });
}

function clearFileInput() {
    $('#input-version-name').val("");
    $('#input-file-name').val("");
    selectFile = null;
}

function alertError() {
    alert("エラーが発生されました。");
}