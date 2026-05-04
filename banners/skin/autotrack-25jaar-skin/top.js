var tl;
$( function () {
	function hover(){
		
		var hoverTimeline = gsap.timeline({paused:true})
			.to('.copy', 0.4, {scale:1.1, ease: "power2.out", yoyo:true})    
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


	var tl = gsap.timeline({delay: 0.4, onComplete:hover, paused:true})
		.set('.hiddenOnload',{opacity:1})
		.from('.content', {height:0,y:200,transformOrigin:"bottom", opacity: 0, duration: 0.5, ease: "power2.out" })
		.from('.copy',.5, {y:200, opacity:0,stagger:.1, ease: "power2.out"}, "<")
		.from(".cadeau", {rotationY: 360,y:50,  duration: 1, ease: "power4.inOut", transformOrigin: "50% 50%"},"<")
		.from(".taart", {rotationY: 360,y:10,  duration: 1, ease: "power4.inOut", transformOrigin: "50% 50%"},"<.2")
		.to('.copy',.5, {scale:1.1,ease: "power2.out"},3)
		.to('.copy',.5, {scale:1,ease: "power2.out"})

tl.play();
	PEXI.skinsReady(function(){
			tl.play();
	});
} );
