import jQuery from "jquery"


function handleProgressEvent(progressEvent) {
    console.log(progressEvent);
}

function startUpload(formData, $form) {
    jQuery.ajax({
        type: 'POST',
        url: '/uploads',
        data: formData,
        processData: false, //IMPORTANT!
        xhr: function () {
            let xhr = jQuery.ajaxSettings.xhr();
            if (xhr.upload) {
                xhr.upload.addEventListener('progress', handleProgressEvent, false);
            }
            return xhr;
        },

        cache: false,
        contentType: false,

        success: function (data) {
            console.log("SUCCESS", data)
        },

        error: function (data) {
            console.error(data);
        }
    })
}

jQuery(document).ready(function ($) {
    let $form = $("#upload_form");
    
    $form.submit(function (event) {
        let formData = new FormData(this);
        startUpload(formData, $form);

        event.preventDefault();
    })
})

