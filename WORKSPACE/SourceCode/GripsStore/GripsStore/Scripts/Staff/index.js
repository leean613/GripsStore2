var pageCountSearch = 0;
var totalSearchPage;
var searchLength;
$(document).ready(onStartUp);
function onStartUp() {

    checkPressButton();
    $(".pager a:eq(5)").click();


}
function checkPressButton() {
    try {
        $('#input-search').keyup(function (e) {
            if (e.keyCode == 13) {
                search();
            }
        });
        $('.btn-primary').on('click', editApp);
        $('.btn-danger').on('click', deleteApp);
        //$('#search-input').keyup(function (e) {
        //    if (e.keyCode == 13) {
        //        search();
        //    }
        //});


        $('#home').on('click', goHome);

    }
    catch (ex) {
        ttDebug.Exception(SCRIPT_FILE, 'onStartUp', ex);
    }

}

function goHome() {
    location.href = "/staff/index";
}



function search() {

    //staffCode = $('#search-input').val().trim();
    pageCountSearch = 0;
    totalPage = 0;
    pageCount = 0;


    staffCode = $('#input-search').val().trim();
    console.log(staffCode);
    var s = `<div>
              <button class="btn btn-danger">Delete</button>
              <button class="btn btn-primary">Edit</button>
         </div>`;

    $.ajax({
        url: '/staff/GetPageSearchCount',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({ staffCode: staffCode }),
        success: function (response) {
            //console.log(response);

            totalSearchPage = response;


        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
        },
    }),






        $.ajax({
            url: '/Staff/SearchStaffById/',
            type: 'Post',
            contentType: 'application/json;',
            data: JSON.stringify({ staffCode: staffCode, pageCountSearch: pageCountSearch }),
            success: fnSuccessSearch,


        });



    function fnSuccessSearch(response) {
        $("#tbody").html("");
        console.log(response.length);
        //searchLength = response.length;

        $(response).each(function (index, staff) {
            //console.log(index, staff);


            var tr = $("<tr/>");
            var UnderLine = `<a href="/Staff/Details?code=` + staff.staffCode + `">` + staff.staffCode + `</a>`;

            $("<td/>").addClass("staffCodeQuery").html(UnderLine).appendTo(tr);
            $("<td/>").html(staff.kanaName).appendTo(tr);
            $("<td/>").html(staff.kanjiName).appendTo(tr);

            $("<td/>").html(s).appendTo(tr);
            tr.appendTo("#tbody");


        });
        if (totalSearchPage > 0) { $("#info").html((pageCountSearch + 1) + `/` + totalSearchPage); }
        else { $("#info").html(pageCountSearch); }
        checkPressButton();
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
    if ($(this).closest('tr').find('.staffCodeQuery').text().trim()) {
        location.href = "/Staff/Details/?code=" + $(this).closest('tr').find('.staffCodeQuery').text().trim();
    }
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







