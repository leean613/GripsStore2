//do not modify START

//do not modify END
var staffCode;
var kanjiName;
var kanaName;
var generationno;

$(document).ready(onStartUp);
function onStartUp() {

    //staffCode = $('#staffcode').val();
    
        $('#btn-cancel').click(function () {
            cancel();
        });
        $('#btn-submit').click(function () {
            createStaff();
        });
 
}

function cancel() {       
    location.href = "https://www.google.com/";
}

function createStaff() {
    //ttGuard.showWait();
    kanjiName = $('#kanjiName').val();
    if (kanjiName == "") {
        alert("。input kanjiName");
    }
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
