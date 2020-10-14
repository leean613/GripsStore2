//do not modify START

//do not modify END


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
        $('#btn-select-qr').click(function () {
            $('#select-qr').click();
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
    ttGuard.showWait();
    var appName = $('#app-name').val();
    if (appName == "") {
        alert("アプリ名を入力してください。");
    } else if (selectImage != null) {
        uploadFile(selectImage, UPLOAD_ACTION_APP_ICON);
    } else if (selectQR != null) {
        uploadFile(selectQR, UPLOAD_ACTION_APP_QR);
    }
    else {
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

function OnJspSelectQR(input) {
    if (input.files != undefined && input.files.length > 0) {
        selectQR = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#app-img-qr').attr('src', e.target.result);
        }
        reader.readAsDataURL(selectQR);
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
    ttGuard.showWait();
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            onSendFileComplete(req.response);
        }
        else {
            ttGuard.destory();
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
    ttGuard.destory();
    response = eval("(" + response + ")");
    if (response.success) {
        var action = response.fileContent.action;
        var id = response.fileContent.appId;
        if (action == UPLOAD_ACTION_APP_ICON && id == appId) {
            newIconFileName = response.fileContent.fileName;
            if (selectQR != null) {
                uploadFile(selectQR, UPLOAD_ACTION_APP_QR);
            } else {
                updateAppInfor();
            }
        }
        else if (action == UPLOAD_ACTION_APP_QR && id == appId) {
            updateAppInfor();
        }
        else if (action == UPLOAD_ACTION_INSTALL_FILE && id == appId) {
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
    var verCd = $('#input-version-code').val();
    var verNm = $('#input-version-name').val();
    if (verCd == "") {
        alert("バージョンコードを入力してください。");
    }
    else if (verNm == "") {
        alert("バージョン名を入力してください。");
    } else if (selectFile != null) {
        uploadFile(selectFile, UPLOAD_ACTION_INSTALL_FILE);
    } else {
        alert("インストールファイルを選択してください。");
    }
}

function updateVersionInfor() {
    ttGuard.showWait();
    var verCd = $('#input-version-code').val();
    var verNm = $('#input-version-name').val();
    var fileNm = selectFile.name;
    $.ajax({
        url: '/app/updatefile/',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({ staffCode: staffCode, appId: appId, verCdStr: verCd, verNm: verNm, fileNm: fileNm }),
        success: function (data) {
            ttGuard.destory();
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
            ttGuard.destory();
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