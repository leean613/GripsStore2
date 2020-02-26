//do not modify START
var UPLOAD_FILE_TAG = "file";
var UPLOAD_ACTION_TAG = "action";
var UPLOAD_ACTION_INSTALL_FILE = "install file";
var UPLOAD_ACTION_APP_ICON = "app icon image";
var UPLOAD_ACTION_APP_QR = "app QR image";
var UPLOAD_APP_ID_TAG = "appId";
//do not modify END

var staffCode;
var selectImage;
var selectQR;
var newIconFileName = "";

$(document).ready(onStartUp);
function onStartUp() {
    staffCode = getCookie("STAFFCODE");
    if (staffCode != "") {
        $('#btn-cancel').click(function () {
            cancel();
        });
        $('#btn-register').click(function () {
            registerApp();
        });
        $('#btn-select-icon').click(function () {
            $('#select-image').click();
        });
        $('#btn-select-qr').click(function () {
            $('#select-qr').click();
        });
    } else {
        location.href = "/";
    }
}

function cancel() {
    location.href = "/";
}

function registerApp() {
    //TODO sho progress dialog to wait completed
    var appId = $('#app-id').val();
    var appName = $('#app-name').val();
    if (appId == "") {
        alert("アプリＩＤを入力してください。");
    } else if (appName == "") {
        alert("アプリ名を入力してください。");
    } else if (selectImage == null) {
        alert("アプリアイコン画像を選択してください。");
    } else if (selectQR == null) {
        alert("アプリＱＲコード画像を選択してください。");
    } else {
        registerAppInfor();
    }
}

function uploadFile(file, action) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            onSendFileComplete(req.response);
        }
    }
    var appId = $('#app-id').val();
    var formData = new FormData();
    formData.append(UPLOAD_FILE_TAG, file);
    formData.append(UPLOAD_ACTION_TAG, action);
    formData.append(UPLOAD_APP_ID_TAG, appId);
    req.open("POST", '/api/upload/');
    req.send(formData);
}

function registerAppInfor() {
    var appId = $('#app-id').val();
    var appName = $('#app-name').val();
    var appDescription = $('#app-description').val();
    var icon = selectImage.name;
    $.ajax({
        url: '/app/registerapp/',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({ staffCode: staffCode, appId: appId, appName: appName, appDescription: appDescription, appIcon: icon }),
        success: function (data) {
            if (data.success && data.app != null && data.app.appId == appId) {
                uploadFile(selectImage, UPLOAD_ACTION_APP_ICON);
            } else {
                alertFailed("アプリが作成できませんでした。");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alertError();
        }
    });
}

function OnJspSelectImage(input) {
    if (input.files != undefined && input.files.length > 0) {
        selectImage = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#app-icon').attr('src', e.target.result);
            $('#icon-root').removeClass("app-icon-root-border");
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

function onSendFileComplete(response) {
    var appId = $('#app-id').val();
    response = eval("(" + response + ")");
    if (response.success) {
        var action = response.fileContent.action;
        var id = response.fileContent.appId;
        if (action == UPLOAD_ACTION_APP_ICON && id == appId) {
            uploadFile(selectQR, UPLOAD_ACTION_APP_QR);
        } else if (action == UPLOAD_ACTION_APP_QR && id == appId) {
            location.href = "/app/edit/?id=" + appId;
        }
    } else {
        alertFailed("アプリが作成されました。画像が登録できませんでした。");
    }
}

function alertFailed(message) {
    alert(message);
}

function alertError() {
    alert("エラーが発生されました。");
}