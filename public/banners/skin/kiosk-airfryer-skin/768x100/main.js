$( function () {
	stage.addEventListener('click',function(){
		pexi.click();
	})
		var hoverTimeline = gsap.timeline({paused:true})
		.to(".cta", {scale:1.1, duration:.6,ease: "back.inOut(3)"})

		;

		$("#stage").mouseenter( function() {hoverTimeline.play();});
		$("#stage").mouseleave( function() {hoverTimeline.reverse();});


		
		var tl = gsap.timeline({ delay: 0.4, paused: true})
			.to('.hiddenOnload',{opacity:1,duration:.3})
		;
		
	
		PEXI.inView(function(){
			tl.play();
		});
	
});
