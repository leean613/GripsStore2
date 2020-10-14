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

}

function editApp() {
    var appId = $('#staffCode').text();
    location.href = "/Staff/edit/?code=" + appId;
}