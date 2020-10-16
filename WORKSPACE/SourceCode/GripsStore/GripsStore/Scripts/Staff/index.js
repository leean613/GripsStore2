$(document).ready(onStartUp);
function onStartUp() {
    $('#btn-delete').click(function () {
        deleteApp();
    });
    $('#btn-edit').click(function () {
        editApp();
    });
    //$('#btn-add').click(function () {
    //    AddStaff();
    //});

}

function deleteApp() {

}

function editApp() {
    var staffCode = $('#staffCode').val();
    location.href = "/Staff/Details/?code=" + staffCode;
}
