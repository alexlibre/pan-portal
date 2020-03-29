const initFlats = () => {
    $('.complex__appartments-header').on('click', function() {
        console.log(1241);
        const isActive = $(this).hasClass('is-active');
        const flatsContainer = $(this).siblings('.complex__appartments-results');
        const flatsTableContainer = $(this).siblings('.complex__appartments-table');
        $(this).toggleClass('is-active');
        flatsTableContainer.toggleClass('is-active');
        isActive ? flatsContainer.slideUp(500) : flatsContainer.slideDown(500)
        
    });
}

export default initFlats;