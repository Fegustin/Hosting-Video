// Отправка и добавление комментариев
$('.commentForm').on('submit', function (e) {
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


    let Data = new Date();
    let Year = Data.getFullYear();
    let Month = Data.getMonth();
    let Day = Data.getDate();
    let Minutes = Data.getMinutes();
    let Seconds = Data.getSeconds();

// Преобразуем месяца
    switch (Month) {
        case 0:
            fMonth = "января";
            break;
        case 1:
            fMonth = "февраля";
            break;
        case 2:
            fMonth = "марта";
            break;
        case 3:
            fMonth = "апреля";
            break;
        case 4:
            fMonth = "мае";
            break;
        case 5:
            fMonth = "июня";
            break;
        case 6:
            fMonth = "июля";
            break;
        case 7:
            fMonth = "августа";
            break;
        case 8:
            fMonth = "сентября";
            break;
        case 9:
            fMonth = "октября";
            break;
        case 10:
            fMonth = "ноября";
            break;
        case 11:
            fMonth = "декабря";
            break;
    }

    let dateTime = Day + " " + fMonth + " " + Year + "г." + " " + Minutes + ":" + Seconds;


    console.log("create post is working!");

    let $form = $(this);
    let $talk = $(this);
    $.ajax({
        url: "/",
        type: "POST",
        data: {
            comment: $form.find('.content_text').val(),
            video: $form.find('.video').val(),
            csrfmiddlewaretoken: getCookie('csrftoken')
        },
        success: function (json) {
            $form.find('.content_text').val('');
            $talk.find('.talk').prepend("<li class='wrapper_comment comment_new'><div class='comment_user'>" + json.user + "</div> <div class='comment_text'> " + json.comment + "</div> <div class='comment_pub_date'> " + dateTime + "</div></li>");
            console.log("success");
        },
        error: function (xhr, errmsg, err) {
            console.log(`Error ` + xhr + ' ' + errmsg + ' ' + err)
        }
    });
});