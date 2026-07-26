
stage.addEventListener('click',function(){
	pexi.click();
})
var played = false;
 
function hover(){
	let hoverTimeline = gsap.timeline({paused:true})
	.to(".cta, .bol, .bol div", {scale:1.09, duration:.6, ease: "back.inOut(3)"})
	.to(".logo", {scale:1.1, duration:.6,ease: "back.inOut(3)"}, '<')
	;
	if(played == false){
		stage.addEventListener("mouseenter", function() {airfryer.play();played = true; PEXI.message("airfryer");});
	}
	stage.addEventListener("mouseenter", function() {hoverTimeline.play();});
	stage.addEventListener("mouseleave", function() {hoverTimeline.reverse();});
}

tl = gsap.timeline({delay: 0.4, onComplete:hover,paused:true})
	.to('.hiddenOnload',.3,{opacity:1})
	.fromTo(".bol",{scale:0,y:-20,opacity:0},{scale:1,y:0,opacity:1,duration:0.6,ease:"back.out(1)"},"<")
;
airfryer = gsap.timeline({delay: 0.4, onComplete:hover,paused:true})
  .to(".airfryer", { rotate: 3, duration: 0.1 })
  .to(".airfryer", { rotate: -3, duration: 0.1, repeat: 4, yoyo: true })
  .to(".airfryer", { rotate: 0, duration: 0.2 })

	// Rook komt omhoog
	.fromTo(".smoke1, .smoke2 ,.smoke3", 
		{ opacity: 0, y: 20, stagger:.2}, 
		{ opacity: 1, y: 0,stagger:.2, duration: 1, ease: "power1.out" }, "<0.2"
	)
	// Eten “plopt” uit de fryer
	.from(".eten", {
		scale: 0.5,
		y: -80,
		opacity: 0,
		duration: 0.6,
		ease: "back.out(1.7)"
	}, "<0.1")
	.to(".smoke2 ,.smoke3", { opacity: 0, y: -20,stagger:.2, duration: 1, ease: "power1.out" }, "<.8"
	)
;
	tl.play();
setTimeout(function(){
	
	if(played == false){
		played = true;
		PEXI.message("airfryer");
		airfryer.play()
	}
}, 4000);
PEXI.receiveMessage('airfryer', function(){
   	if(played == false){
		played = true;
		PEXI.message("airfryer");
		airfryer.play()
	}
});
	PEXI.skinsReady(function(){
		tl.play();
	});