// document.querySelector('.commentForm').addEventListener('click', (e) => {
//     e.preventDefault();
//
//     function getCookie(name) {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== '') {
//             let cookies = document.cookie.split(';');
//             for (let i = 0; i < cookies.length; i++) {
//                 let cookie = cookies[i].trim();
//                 // Does this cookie string begin with the name we want?
//                 if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }
//
//     let myData = {
//         comment: document.querySelector('#id_content_text').value,
//     };
//
//
//     fetch("http://127.0.0.1:8000/", {
//         method: "POST",
//         credentials: "same-origin",
//         headers: {
//             "X-CSRFToken": getCookie("csrftoken"),
//             "X-Requested-With": "XMLHttpRequest",
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(myData)
//     })
//     //     .then(function (response) {
//     //     return response.json();
//     // }).then(function (data) {
//     //     console.log("Data is ok", data);
//     // }).catch(function (ex) {
//     //     console.log("parsing failed", ex);
//     // });
// });

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

    var csrftoken = getCookie('csrftoken');


    console.log("create post is working!"); // sanity check
    $.ajax({
        url: "/", // the endpoint
        type: "POST", // http method
        data: {
            comment: $('#id_content_text').val(),
            csrfmiddlewaretoken: getCookie('csrftoken'),
        }, // data sent with the post request

        // handle a successful response
        success: function (json) {
            $('#id_content_text').val(''); // remove the value from the input
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error: function (xhr, errmsg, err) {
            console.log(`Error ` + xhr + ' ' + errmsg + ' ' + err) // provide a bit more info about the error to the console
        }
    });
});