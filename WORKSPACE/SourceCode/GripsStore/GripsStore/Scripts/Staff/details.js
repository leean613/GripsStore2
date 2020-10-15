$(document).ready(onStartUp);
function onStartUp() {
    $('#btn-cancel').click(function () {
        deleteApp();
    });
    $('#btn-update').click(function () {
        editApp();
    });
}

function deleteApp() {

}

function editApp() {
    var staffCodetxt = $('#staffCode').val();
    location.href = "/Staff/Edit/?code=" + staffCodetxt;
}