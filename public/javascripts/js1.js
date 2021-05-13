 // Javascript tipus JQuery de l'aplicació JADE
$(document).ready(function() {
	
	console.log('This is <<js01.js>> --> JQuery in Action!!! ' )
	
	// $('h1').on('click', function(){
	// 	console.log('click on me !!!!');
	// 	var me = $(this);
	// 	// $('section').hide();
    //  $(me).next('section').toggle();

	// })
/* 	
    $(".Horapas").on('click', function(){
        console.log("has picado un horapas!")
        console.log(`Clases activas: ${$(this).attr('class').split(" ") }`)
        var ndClass ="."+ ($(this).attr('class').split(" ").find(x=>x.substr(0,2)=='Nd'))


        console.log($(this).attr('class').split(" ").find(x=>x.substr(0,2)=='Nd'))
        $(".Horapas").show();
        $(ndClass).toggle()

    })
 */
	
    $(".leyendaCabecera").on('click', function(){
        console.log("has picado un leyendaCabecera!")
        console.log(`Clases activas: ${$(this).attr('class').split(" ") }`)
        var ndClass ="."+ ($(this).attr('class').split(" ").find(x=>x.substr(0,2)=='Nd'))


        console.log($(this).attr('class').split(" ").find(x=>x.substr(0,2)=='Nd'))

        if ($(ndClass).is(":hidden") ){
            $(ndClass).show();
        } else {
            $(ndClass).hide();
        }

//        $(".Horapas").show();

        $(".leyendaCabecera").show();
    })


}); 