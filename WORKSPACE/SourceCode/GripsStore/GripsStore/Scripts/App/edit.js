$(document).ready(onStartUp);
function onStartUp() {
    $('#btn-cancel').click(function () {
        cancel();
    });
}

function cancel() {
    var appId = $('#app-id').text();
    location.href = "/app/detail/?id=" + appId;
}