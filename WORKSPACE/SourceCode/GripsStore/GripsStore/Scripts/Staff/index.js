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
        $('#btn-search').click(function () {
            search();
        });

    }
    //$('#btn-add').click(function () {
    //    AddStaff();
    //});

}

function search() {

    staffCode = $('#btn-search').val();
    var s = `<div id="admin" class="row admin-button">
              <button id="btn-delete" class="btn btn-danger">Delete</button>
              <button id="btn-edit" class="btn btn-primary">Edit</button>
         </div>`;

    $.ajax({
        url: '/Staff/SearchStaff/',
        type: 'Post',
        contentType: 'application/json;',
        data: JSON.stringify({ staffCode: staffCode }),
        success: fnSuccess

    });

    function fnSuccess(response) {
        $("#tbody").html("");
        $(response).each(function (index, staff) {
            //console.log(index, staff);

            var tr = $("<tr/>");
            $("<td/>").html(staff.staffCode).appendTo(tr);
            $("<td/>").html(staff.kanaName).appendTo(tr);
            $("<td/>").html(staff.kanjiName).appendTo(tr);

            $("<td/>").html(s).appendTo(tr);
            tr.appendTo("#tbody");
            $("#info").html((pageCount + 1));

        })

    }
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


