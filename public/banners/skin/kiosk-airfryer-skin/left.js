
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
    .to(".vrouw-copy-masked.A, .vrouw.A", { duration: 0.7 }, "<")
    .from(".vrouw-copy-masked.B , .vrouw.B", {opacity:0, duration: 0.7 }, "<")

  // crossfade
    .to(".vrouw-copy-masked.B , .vrouw.B", {opacity:1, autoAlpha: 1, duration: 0.5 }, "<.2")
    .to(".vrouw-copy-masked.A , .vrouw.A", { autoAlpha: 0, duration: 0.5 }, "<")
;
tl.play();
setTimeout(function(){
	
	if(played == false){
		played = true;
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