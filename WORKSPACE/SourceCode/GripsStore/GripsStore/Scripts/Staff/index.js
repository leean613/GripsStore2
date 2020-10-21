var nearStaffCode;

$(document).ready(onStartUp);
function onStartUp() {


    try {
        //$('.site-title').hide();
        $('.btn-primary').on('click', editApp);



    }
    catch (ex) {
        ttDebug.Exception(SCRIPT_FILE, 'onStartUp', ex);
    }

}
function checkPressButton() {
    try {
        //$('.site-title').hide();
        $('.btn-primary').on('click', editApp);


    }
    catch (ex) {
        ttDebug.Exception(SCRIPT_FILE, 'onStartUp', ex);
    }

}




function search() {

    staffCode = $('#search-input').val();
    var s = `<div id="admin" class="row admin-button">
              <button id="btn-delete" class="btn btn-danger">Delete</button>
              <button id="btn-edit" class="btn btn-primary">Edit</button>
         </div>`;

    $.ajax({
        url: '/Staff/SearchStaffById/',
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


    location.href = "/Staff/Details/?code=" + $(this).closest('tr').find('.staffCodeQuery').text().trim();


    //console.log($(this).closest('tr').find('.staffCodeQuery').text());
    //console.log("/Staff/Details/?code=" + $(this).closest('tr').find('.staffCodeQuery').text().trim());


}

function demo() {

    nearStaffCode = $(this).closest('td').find('#staffCode').val();
    //console.log(nearStaffCode);
    alert(nearStaffCode);
}


