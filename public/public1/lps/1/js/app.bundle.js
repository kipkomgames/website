function scrlToTOP (){
    $('html, body').animate({ scrollTop: 0 }, 'slow')
}
$(document).ready(function(){
    if($('#formWrapper-ff').html())
    $('#formWrapper-ff').prepend('<div class="fixed-section-1">'
        +   '<div class="w-container">'
        +       '<div class="dsfg form form-home-2">'
        +           $('#img-to-footer').clone()[0].outerHTML
        +       '<div class="form-txt">Register Now For A FREE Trial</div>'
        +       '</div>'
        +   '</div>'
        + '</div>');

		$('.txt').on('click touchstart', function(){
			console.log('clcik');
			$('.txt').css({
		    opacity: 0
			});
			
			$($(this)).css({opacity: 1});

		});
});