$(function () {
    'use strict';

    // Cache DOM elements for better performance
    const forms = $('.needs-validation');

    forms.each(function () {
        const form = $(this);
        const submitForm = form.find('.submit_form');
        const subscribeButton = form.find('.btn_submit-subscribe');
        const successMsg = $('.success_msg');
        const errorMsg = $('.error_msg');
        const actionInput = form.find("input[name='action']");
        const successMsgSubscribe = $('.success_msg_subscribe');

        form.on('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (!form[0].checkValidity()) {
                return; // Exit early if the form is not valid
            }

            submitForm.html('Enviando...');
            subscribeButton.html('Enviando...');

            const toast = new bootstrap.Toast(successMsg[0]);
            const errtoast = new bootstrap.Toast(errorMsg[0]);

            const formData = form.serialize();

            $.ajax({
                type: "POST",
                url: "php/form_process.php",
                data: formData,
                success: function (response) {
                    if (response === 'success') {
                        if (actionInput.length > 0) {
subscribeButton.html('SUSCRIBIRSE');
                            const toastSubscribe = new bootstrap.Toast(successMsgSubscribe[0]);
                            toastSubscribe.show();
                        } else {
submitForm.html('Enviar Mensaje');
                        }
                    } else {
                        errtoast.show();
                        submitForm.html('Enviar Mensaje');
                        subscribeButton.html('SUSCRIBIRSE');
                    }
                }
            });

            form.addClass('was-validated');
        });
    });
});
