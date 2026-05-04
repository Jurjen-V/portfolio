

$( function () {
	function hover(){
		var hoverTimeline = gsap.timeline({paused:true})
		    .to(".cta, .prijs, .cadeau, .plus", {scale:1.1, duration:.6,ease: "back.inOut(3)"})
		;
		
		$("#stage").mouseenter( function() {hoverTimeline.play();});
		$("#stage").mouseleave( function() {hoverTimeline.reverse();});
	}


	tl = new TimelineMax({delay: 0.4, onComplete:hover})
		.to('.hiddenOnload',{opacity:1,duration:.3})
		.from('.joch, .actie img, .copy', .5, { y: 200, opacity: 0, stagger: .1, ease: "power2.out" }, "<")
		.from('.cta', .5, { y: 200, opacity: 0, ease: "power2.out" }, "<")
		.to('.cta', .5, { scale: 1.1, ease: "power2.out", yoyo: true, repeat: 1 })
	;
} );
PEXI.inview(function () {
	tl.play();
});