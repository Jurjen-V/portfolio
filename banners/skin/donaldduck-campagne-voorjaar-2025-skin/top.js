var tl;
$( function () {
	PEXI.receiveMessage('200', function(){
		document.querySelector('#stage').style.setProperty('border-width', '10px 0px 10px 0px', 'important');
	});
	PEXI.receiveMessage('300', function(){
		document.querySelector('#stage').style.setProperty('border-width', '17px 0px 17px 0px', 'important');
	});
	PEXI.receiveMessage('groot', function(){
		document.querySelector('#stage').style.setProperty('border-width', '27px 0px 27px 0px', 'important');
	});
	PEXI.message('size');
	function hover(){
		
		var hoverTimeline = gsap.timeline({paused:true})
			.to('.logo', 0.4, {scale:1.2, ease: "power2.out", yoyo:true})    
		;
		
		$("#stage").mouseenter( function() {
			PEXI.message('hoverIn')
		});
		$("#stage").mouseleave( function() {
			PEXI.message('hoverOut')
		});
		PEXI.receiveMessage('hoverIn', function(){
			hoverTimeline.play();
		});
		PEXI.receiveMessage('hoverOut', function(){
			hoverTimeline.reverse();
		});
	}


	 tl = gsap.timeline({delay: 0.4, onComplete:hover, paused:true})
		.set('.hiddenOnload',{opacity:1})
		.from('.logo',.5, {y:200, opacity:0,stagger:.1, ease: "power2.out"}, "<")
	;
	tl.play();

	PEXI.receiveMessage('scalingdone', function () {
		tl.play();
	});
} );