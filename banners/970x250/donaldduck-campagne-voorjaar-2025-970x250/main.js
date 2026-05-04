$( function () {
	function hover(){	
		var hoverTimeline = gsap.timeline({paused:true})
			.to('.cta', 0.4, {scale:1.1, ease: "power2.out", yoyo:true})    
			.to('.prijs, .plus, .strandlaken', 0.4, {scale:1.1, ease: "power2.out", yoyo:true},"<")    
		;
		$("#stage").mouseenter( function() {
			hoverTimeline.play();
		});
		$("#stage").mouseleave( function() {
			hoverTimeline.reverse();
		});
	}
	var tl = new TimelineMax({delay: 0.4,  onComplete:hover, paused:true})
		.to('.hiddenOnload', .3,{opacity:1})
		.from('.dd', .5, { y: 150, opacity: 1, stagger:.1, ease: "power2.out" }, "<")
		.from('.joch', .5, { y: 500, opacity: 1, stagger:.1, ease: "power2.out" },"<.2")
		.from(".prijs", { scale: 0, rotate: -360, duration: 1, ease: "power2.inOut", transformOrigin: "center center" },"<-.2")
		.from(".euro", { opacity: 0, scale: 0.5, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
		.from(".komma", { opacity: 0, scale: 0.5, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
		.from(".cent", { opacity: 0, scale: 0.5, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
		.from(".centTwee", { opacity: 0, scale: 0.5, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
		.from(".per", { opacity: 0, scale: 0.5, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
		.from(".week", { opacity: 0, scale: 0.5, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
		.fromTo('.plus', .5, { scale: 0, ease: "power2.out" },{scale:1.2, ease: "power2.out" },"<-1")
		.to('.plus', .5, { scale: 1, ease: "power2.out" },"<.5")
		.fromTo('.strandlaken', .5, { scale: 0, ease: "power2.out" },{scale:1.1, ease: "power2.out" },"<-.8")
		.to('.strandlaken', .5, { scale: 1, ease: "power2.out" },"<.5")
		.from('.cta', .5, {y:200, opacity: 0, ease: "power2.out" },"<" )
		.to('.cta', .5, { scale: 1.1, ease: "power2.out", yoyo: true, repeat: 1 })	
	;
		PEXI.inView(function(){
			tl.play()
		});	
	
});