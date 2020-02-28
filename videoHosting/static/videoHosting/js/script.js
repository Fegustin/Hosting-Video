// Отправка и добавление комментариев
$('#commentForm').on('submit', function (e) {
    e.preventDefault();

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    let csrftoken = getCookie('csrftoken');


    console.log("create post is working!");
    $.ajax({
        url: "/",
        type: "POST",
        data: {
            comment: $('#id_content_text').val(),
            video: $('#video').val(),
            csrfmiddlewaretoken: getCookie('csrftoken'),
        },


        success: function (json) {
            $('#id_content_text').val('');
            $("#talk").prepend("<li><strong>" + json.comment + "</strong> - <em> " + json.user + "</em> - <span> " + json.date + "</span></li>");
            console.log("success");
        },


        error: function (xhr, errmsg, err) {
            console.log(`Error ` + xhr + ' ' + errmsg + ' ' + err)
        }
    });
});