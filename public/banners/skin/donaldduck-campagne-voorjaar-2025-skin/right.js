$( function () {
	function size(){
		if(document.getElementById('stage').offsetWidth <= 200){
			PEXI.message('200')
			document.querySelector('.copytop').src = '';
			document.querySelector('.copy').src = '';
			document.querySelector('.actie').src = 'strandlaken+actie.png';
		}
		if(document.getElementById('stage').offsetWidth <= 300 && document.getElementById('stage').offsetWidth > 200){
			PEXI.message('300')
			document.querySelector('.copytop').src = 'copytopR.png';
			document.querySelector('.copy').src = 'copytopR.svg';
			document.querySelector('.actie').src = 'actie.png';
		}
		if(document.getElementById('stage').offsetWidth >= 300){
			PEXI.message('groot')
		}
	}
	window.addEventListener("resize", () => {
		size();
	});
	PEXI.receiveMessage('size', function () {
		size();
	});

	size();
	function hover(){
		var hoverTimeline = gsap.timeline({paused:true})
		      .to('.cta', 0.4, {scale:1.2, ease: "power2.out", yoyo:true})    
		;
		var cta = gsap.timeline({paused:true})
			.to('.arrow', 0.4, {x:10, ease: "power2.out", yoyo:true})    
			.to('.ctaCopy, .arrow', 0.4, {scale:1.2, ease: "power2.out", yoyo:true},"<")  
		;
		$(".cta").mouseenter( function() {
			cta.play();
		});
		$(".cta").mouseleave( function() {
			cta.reverse();
		});
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


	tl = gsap.timeline({delay: 0.4, onComplete:hover,paused:true})
		.set('.hiddenOnload',{opacity:1})
		.from('.actie, .copy , .copytop',.5, {y:200, opacity:0,stagger:.1, ease: "power2.out"}, "<")
		.from('.cta', .5, {y:200, opacity:0, ease: "power2.out"}, "<")
		.to('.cta', .5, {scale:1.2, ease: "power2.out", yoyo:true, repeat:1})
	;
tl.play();
} );

PEXI.skinsReady(function(){
	PEXI.skinsWallpaper();
	PEXI.receiveMessage('scalingdone', function () {
		tl.play();
	});
})