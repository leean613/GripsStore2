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
    var staffCode = $('#staffCode').text();
    location.href = "/Staff/Edit/?code=" + staffCode;
}