
$(function () {
    // Function to handle modal show event
    function onModalShow() {
        var modal = $(this);
        var iframe = modal.find('.ifr-video');
        var videoUrl = iframe.data('src');
        iframe.attr('src', videoUrl);
    }

    // Function to handle modal hide event
    function onModalHide() {
        var modal = $(this);
        var iframe = modal.find('.ifr-video');
        iframe.attr('src', '');
    }

    // Bind events to all modals
    $('.modal').on('show.bs.modal', onModalShow);
    $('.modal').on('hide.bs.modal', onModalHide);
});
