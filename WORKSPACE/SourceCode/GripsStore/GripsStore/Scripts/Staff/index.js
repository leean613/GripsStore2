var pageCountSearch = 0;
$(document).ready(onStartUp);
function onStartUp() {

    checkPressButton();
    $(".pager a:eq(5)").click();

}
function checkPressButton() {
    try {
        //$('.site-title').hide();
        $('.btn-primary').on('click', editApp);

        $('.btn-danger').on('click', deleteApp);
        //$('#search-input').keyup(function (e) {
        //    if (e.keyCode == 13) {
        //        search();
        //    }
        //});
        $('#input-search').keyup(function (e) {
            if (e.keyCode == 13) {
                search();
            }
        });

        $('#home').on('click', goHome);

    }
    catch (ex) {
        ttDebug.Exception(SCRIPT_FILE, 'onStartUp', ex);
    }

}

function goHome() {
    location.href = "/";
}



function search() {

    //staffCode = $('#search-input').val().trim();
    pageCountSearch = 0;
    status = true;

    staffCode = $('#input-search').val().trim();
    console.log(staffCode);
    var s = `<div>
              <button class="btn btn-danger">Delete</button>
              <button class="btn btn-primary">Edit</button>
         </div>`;

    $.ajax({
        url: '/Staff/SearchStaffById/',
        type: 'Post',
        contentType: 'application/json;',
        data: JSON.stringify({ staffCode: staffCode, pageCountSearch: pageCountSearch }),
        success: fnSuccess,


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

        });

    }

}
function deleteApp() {
    var staffCode = $(this).closest('tr').find('.staffCodeQuery').text().trim();
    var result = confirm("アプリが削除されます。よろしいでしょうか？");
    if (result) {
        $.ajax({
            url: '/staff/delete/',
            type: 'POST',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode }),
            success: function (data) {
                if (data.success) {
                    alert("アプリが削除されました。");
                    location.href = "/staff/index";
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
            },
        });
    }


}
function editApp() {
    location.href = "/Staff/Details/?code=" + $(this).closest('tr').find('.staffCodeQuery').text().trim();
    //console.log($(this).closest('tr').find('.staffCodeQuery').text());
    //console.log("/Staff/Details/?code=" + $(this).closest('tr').find('.staffCodeQuery').text().trim());
}


function LiveSearch() {
    // Declare variables
    var staffCodeInput, kanaNameInput, kanjiNameInput, staffCodeFilter, kanaNameFilter, kanjiNameFilter, table, trs, tdCode, i, txtValue, tdKana, tdKanji;

    //Set input by getElementById
    staffCodeInput = document.getElementById("searchStaffCode");

    kanaNameInput = document.getElementById("searchKanaName");

    kanjiNameInput = document.getElementById("searchKanjiName");

    input = document.getElementById("input-search");

    //Set filter

    staffCodeFilter = staffCodeInput.value.toUpperCase();
    kanaNameFilter = kanaNameInput.value.toUpperCase();
    kanjiNameFilter = kanjiNameInput.value.toUpperCase();

    filter = input.value.toUpperCase();
    //Set the table and tr
    table = document.getElementById("tbody");
    trs = table.getElementsByTagName("tr");


    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < trs.length; i++) {
        tdCode = trs[i].getElementsByTagName("td")[0];

        tdKana = trs[i].getElementsByTagName("td")[1];

        tdKanji = trs[i].getElementsByTagName("td")[2];
        if (
            tdCode.innerHTML.toUpperCase().indexOf(staffCodeFilter) > -1 ||
            tdKana.innerHTML.toUpperCase().indexOf(staffCodeFilter) > -1 ||
            tdKanji.innerHTML.toUpperCase().indexOf(staffCodeFilter) > -1 ||
            tdKana.innerHTML.toUpperCase().indexOf(filter) > -1


        ) {
            trs[i].style.display = "";
        } else {
            trs[i].style.display = "none";
        }


        //ExampleW3School
        //if (td1) {
        //    txtValue = td1.textContent || td1.innerText;
        //    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //        trs[i].style.display = "";
        //    } else {
        //        trs[i].style.display = "none";
        //    }
        //}


    }
}
checkPressButton();



function demo() {
}


