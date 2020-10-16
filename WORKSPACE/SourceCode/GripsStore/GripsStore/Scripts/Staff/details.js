var kanjiName;
var kanaName;
var generationno;
var staffCode;

$(document).ready(onStartUp);
function onStartUp() {
    $('#btn-delete').click(function () {
        //delete ();
    })
    $('#btn-submit').click(function () {
        editStaff();
    });
}

//function delete () {
//    var an = "1";
//}

function editStaff() {
    //ttGuard.showWait();
    kanjiName = $('#kanjiName').val();
    if (kanjiName == "") {
        alert("please input kanjiName。");
    }
    kanaName = $('#kanaName').val();
    staffCode = $('#staffCode').val();
    generationno = $('#generationno').val();
    if (staffCode != "") {
        $.ajax({
            url: '/Staff/Update/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, kanjiName: kanjiName, kanaName: kanaName, generationno: generationno }),
            success: function (data) {
                if (data.success) {
                    location.href = "/Staff/Details/?code=" + staffCode;
                } else {
                    alertError("loi");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertError();
            }
        });
    }
    else alert("staffCode mising");
}