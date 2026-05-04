
$( function () {

	function hover(){	
		var hoverTimeline = gsap.timeline({paused:true})
			.to('.cta', 0.4, {scale:1.1, ease: "power2.out", yoyo:true})    
			// .to('.prijs, .plus, .strandlaken', 0.4, {scale:1.1, ease: "power2.out", yoyo:true},"<")    
		;
		$("#stage").mouseenter( function() {
			hoverTimeline.play();
		});
		$("#stage").mouseleave( function() {
			hoverTimeline.reverse();
		});
	}
  	function flipCard() {
		const card = document.querySelector(".flip-card");
		card.style.transform = "translateZ(0)"; // Firefox fix

		// Draai de kaart
		var flip = new TimelineMax({delay: 0.4,  onComplete:hover, paused:true})
			.to(".flip-card", {rotationY: 180,duration: 1,ease: "power2.inOut"})
			.to(".flip-card", {rotationY: 0,duration: 1,ease: "power2.inOut"},"<4")
			.to(".flip-card", {rotationY: 180,duration: 1,ease: "power2.inOut"},"<4")
			.to(".flip-card", {rotationY: 0,duration: 1,ease: "power2.inOut"},"<4")
			.to('.cta', .5, { scale: 1.1, ease: "power2.out", yoyo: true, repeat: 1 })	

			.set('.flip-card', {transformStyle: 'unset'})

		;
		flip.play()
	}
	tl = new TimelineMax({delay: 0.4,  onComplete:hover, paused:true})
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
		.to(".front svg", {scale: 1,duration: 1,ease: "power2.out", onComplete: flipCard})
	
		.to('.cta', .5, { scale: 1.1, ease: "power2.out", yoyo: true, repeat: 1 })	
	;
	PEXI.inView(function(){
	document.querySelector('#stage').style.visibility = 'visible';
	document.querySelector('#stage').style.opacity = '1';
	tl.play()
});
});
