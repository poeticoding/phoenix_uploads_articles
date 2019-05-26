import jQuery from "jquery"

function createProgressHandler($form) {
    let $label = $form.find("label.progress-percentage");

    return function handleProgressEvent(progressEvent) {
        let progress = progressEvent.loaded / progressEvent.total,
            percentage = progress * 100,
            percentageStr = `${percentage.toFixed(2)}%`; //xx.xx%
            
        $label.text(percentageStr);
    }
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
                xhr.upload.addEventListener('progress', createProgressHandler($form), false);
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

