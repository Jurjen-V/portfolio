let tl;
$(function () {
	function size(){
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
				.to(".cta", {scale:1.1, duration:.6,ease: "back.inOut(3)"})
			;
		
		$("#stage").mouseenter( function() {hoverTimeline.play();});
		$("#stage").mouseleave( function() {hoverTimeline.reverse();});
	}
  const introAnim1 = lottie.loadAnimation({
		container: intro1,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'data.json'
	})
	const introAnim2 = lottie.loadAnimation({
		container: intro2,
		renderer: 'svg',
		loop: false,
		autoplay: false, 
		path: 'data1.json'
	})

	tl = gsap.timeline({ delay: 0.4, onComplete: hover, paused: true })
		.to('.hiddenOnload', { opacity: 1 })
		.call(function(){introAnim1.play()}, null,"<")
    	.call(function(){introAnim2.play()}, null,"<")
		.fromTo('.cta, .copy', .4, { y: 100, scale: 0.5, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: "power2.out", stagger: .1 }, 0.4)
		;
		tl.play();
});

PEXI.skinsReady(function () {
	PEXI.message('size');
	PEXI.skinsWallpaper('wallpaper.png');
	PEXI.receiveMessage('scalingdone', function () {
		tl.play();
	});
})