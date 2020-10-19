//do not modify START

//do not modify END
var staffCode;
var kanjiName;
var kanaName;
var generationno;

$(document).ready(onStartUp);
function onStartUp() {
    Auth = getCookie("STAFFCODE");
    //var AuthAdmin = getCookie("GRIPS_STORE_STAFFCODE").value();
    //console.log(AuthAdmin);
    if (Auth != "") {
        //staffCode = $('#staffcode').val();

        $('#btn-cancel').click(function () {
            cancel();
        });
        $('#btn-submit').click(function () {
            createStaff();
        });
    }
    else {
        //location.href("/");
    }

}

function cancel() {
    //location.href = "/";
}

function createStaff() {
    ttGuard.showWait();
    kanjiName = $('#kanjiName').val();
    kanaName = $('#kanaName').val();
    staffCode = $('#staffCode').val();
    generationno = $('#generationno').val();
    if (staffCode != "") {
        $.ajax({
            url: '/Staff/CreateStaff/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, kanjiName: kanjiName, kanaName: kanaName, generationno: generationno }),
            success: function (data) {
                if (data.success) {
                    location.href = "/Staff/Details/?code=" + staffCode;
                } else {
                    alertError();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertError();
            }
        });
    }
    else alert("staffCode mising");










}
