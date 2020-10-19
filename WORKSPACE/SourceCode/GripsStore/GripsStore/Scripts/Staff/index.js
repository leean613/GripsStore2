var nearStaffCode;
$(document).ready(onStartUp);
function onStartUp() {
    Auth = getCookie("STAFFCODE");
    if (Auth != "") {
        $('#btn-delete').click(function () {
            deleteApp();
        });
        $('#btn-edit').click(function () {
            editApp();
        });
        $('#btn-demo').click(function () {
            demo();
        });

    }
    //$('#btn-add').click(function () {
    //    AddStaff();
    //});

}

function deleteApp() {
    var result = confirm("アプリが削除されます。よろしいでしょうか？");
    if (result) {

        var appId = $('#app-id').text();
        $.ajax({
            url: '/app/delete/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode }),
            success: function (data) {
                if (data.success) {
                    alert("アプリが削除されました。");
                    location.href = "/";
                }
            }
        });
    }

}
function editApp() {
    var staffCode = $('#staffCode').val();
    location.href = "/Staff/Details/?code=" + staffCode;
}

function demo() {

    nearStaffCode = $(this).closest('td').find('#staffCode').val();
    //console.log(nearStaffCode);
    alert(nearStaffCode);
}


