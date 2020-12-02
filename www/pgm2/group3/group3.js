
function GetClock() {
	d = new Date();
	nhour = d.getHours();
	nmin = d.getMinutes();
	if (nmin <= 9) { nmin = "0" + nmin; }
	document.getElementById('logo').innerHTML = nhour + ":" + nmin;
	setTimeout("GetClock()", 1000);
}


$(document).ready(function() {

	var footernav = $('<div id="footernav"><a href="/fhem/docs/commandref.html" target="_blank">Commandref</a> | <a href="/fhem?cmd=style%20eventMonitor">Event monitor</a></div>');
	$('#content').append(footernav);
	
	if(document.URL.indexOf("showall") != -1) {
		//don't hide anything
	} else {
		$("div.devType:contains('-hidden')").parent('td').hide();
	} 

	window.addEventListener("load",GetClock,false);

	// JQUERY VERSION:
	;( function( $, window, document, undefined )
	{
		'use strict';

		var elSelector		= '#hdr, #logo',
			elClassHidden	= 'header--hidden',
			throttleTimeout	= 50,
			$element		= $( elSelector );

		if( !$element.length ) return true;

		var $window			= $( window ),
			wHeight			= 0,
			wScrollCurrent	= 0,
			wScrollBefore	= 0,
			wScrollDiff		= 0,
			$document		= $( document ),
			dHeight			= 0,

			throttle = function( delay, fn )
			{
				var last, deferTimer;
				return function()
				{
					var context = this, args = arguments, now = +new Date;
					if( last && now < last + delay )
					{
						clearTimeout( deferTimer );
						deferTimer = setTimeout( function(){ last = now; fn.apply( context, args ); }, delay );
					}
					else
					{
						last = now;
						fn.apply( context, args );
					}
				};
			};

		$window.on( 'scroll', throttle( throttleTimeout, function()
		{			
			dHeight			= $document.height();
			wHeight			= $window.height();
			wScrollCurrent	= $window.scrollTop();
			wScrollDiff		= wScrollBefore - wScrollCurrent;

			if( wScrollCurrent <= 50 ) // scrolled to the very top; element sticks to the top
			{	
				$element.removeClass( elClassHidden );
			}
			else if( wScrollDiff > 0 && $element.hasClass( elClassHidden ) ) // scrolled up; element slides in
			{
				//$element.removeClass( elClassHidden );
			}
			else if( wScrollDiff < 0 ) // scrolled down
			{
				
				if( wScrollCurrent + wHeight >= dHeight && $element.hasClass( elClassHidden ) ) // scrolled to the very bottom; element slides in
				{
					//$element.removeClass( elClassHidden );
				}
				else // scrolled down; element slides out
				{
					$element.addClass( elClassHidden );
				}
			}

			wScrollBefore = wScrollCurrent;
		}));

	})( jQuery, window, document );
	
});