
$( function () {
	function hover(){
		var hoverTimelineLeft = gsap.timeline({paused:true})
			.to('.cta',{scale:1.1})
		;
		
		$("#stage").mouseenter( function() {hoverTimelineLeft.play();});
		$("#stage").mouseleave( function() {hoverTimelineLeft.reverse();});
	}
	const now = new Date();
	const endDate = new Date("12/15/2023");
	const days = Math.floor((endDate - now) / (1000*60*60*24)) + 1;
	if(days > 0){
		document.querySelector('.aantalDagen').textContent ="NOG " + days + " DAGEN";
	}
	if(days == 1){
		document.querySelector('.aantalDagen').textContent ="NOG " + days + " DAG";
	}
	if(days < 1){
		document.querySelector('.aantalDagen').textContent = "Stream het hele seizoen";
	}

	pexi.video('.video', ['video.webm' , 'video.mp4'], {poster:'video_poster.png'});
	var video = document.querySelector('.video video');
		video.loop = false;
		video.autoplay = false;
		video.muted = true
		video.playsinline = true;
		video.controls = false;
	// mute knop
	$('#audio-control').click(function(){
		if(video.muted == true) {
			  $(video.muted = false);
			  $("#mute").toggleClass("unactive");
			  $("#mute").toggleClass("active");
			  $("#unmute").toggleClass("unactive");
		} else {
			$(video.muted = true);
			$("#unmute").toggleClass("unactive");
		  	$("#unmute").toggleClass("active");
		  	$("#mute").toggleClass("unactive");

		}
	});
	function replay(){
		if($("#replay").hasClass('active')){
			$(video.muted = false);
			$("#unmute").toggleClass("unactive");
			$("#unmute").toggleClass("active");
			$("#replay").addClass("unactive");
			$("#replay").toggleClass("active");
		}else{
			$("#mute").toggleClass("active");
			$("#mute").addClass("unactive");
			$("#unmute").toggleClass("active");
			$("#unmute").addClass("unactive");
			$("#replay").toggleClass("unactive");
			$("#replay").addClass("active");
		}

	}
	var tel = 0
	$('#replay').click(function(){
		if(tel == 0){
			tl2.play();
			replay();
			tel= +1;
		}else{
			tl2.restart();
			replay();
			tel=+1;
		}
	})
	var tl = gsap.timeline({delay: 0.4, onComplete:hover, paused:true, })
		.to('.hiddenOnload',{opacity:1,duration:.3})
		.to('.beginframe ,.videoland',{duration: .8, x: -300,  ease: Power1.easeInOut},'=+.2')
		.from('.main', 0.8, {x: -28, y: 18, ease: Power1.easeInOut}, '<')
		.from('.backdrop', 0.8, { width: 252, ease: Power1.easeInOut}, '<')

		.set('.label', {zIndex: 5},"<.1")
		
		.set('.logo' , {zIndex:3},"<")
		.from('.logo ,.flair , .seizoen', 0.4, { opacity: 0, ease: Power3.easeOut})
		.from('.copy', 0.5, {x: '-=20px', stagger: 0.1, opacity: 0, ease: Back.easeOut}, '<=+0.1')
		.from('.cta', 0.4, {scale: 0, ease: Back.easeOut})
		.from('.rood ,.blauw' , {opacity:0})
		
		.from('.video , #audio-control', {y:-600 , delay:1 , ease: Power4.easeInOut})
		.to('.copy',{y:300 , ease: Power4.easeInOut},"<")
		.to('.robert' ,{top:"300px" ,height: "350px" ,ease: Power4.easeInOut},"<")
		.to('.seizoen' , {zIndex:0},"<")
		.to('.left , .right ' ,{top:"300px" ,height: "325px" ,ease: Power4.easeInOut},"<")
		.to('.right', {right:"-20px" , ease: Power4.easeInOut},"<")
		.to('.left', {left:"-20px", ease: Power4.easeInOut},"<")
		.to('.robert' , {left:"30px" ,ease: Power4.easeInOut},"<")
		.from('.pexi_play' , {opacity:0})
		.to(video,{play: true}, "<.2")
	;
	var tl4 = gsap.timeline({delay: 0.4, onComplete:hover, paused:true})
		.call(replay)
		.to('.video ' , {top:"25px" , width: "236px" , height: "242px" , zIndex:2 , ease: Power4.easeInOut})
		.to('#audio-control',{top:"36px", left: "53px" , zIndex:5 , ease: Power4.easeInOut},"<")
		.to('.left , .right' ,{top:"170px" ,height: "400px" , zIndex:2 , ease: Power4.easeInOut},"<")
		.to('.robert' , {left:"-10px", height:"475px", top:"170px", zIndex:2, height:"475px",  ease: Power4.easeInOut},"<")
		.to('.right', {right:"-50px" , ease: Power4.easeInOut},"<")
		.to('.left', {left: "-40px", ease: Power4.easeInOut},"<")
		.to('.zwart , .gradient' , {y:-140},"<")

		.set('.cta ,.rect3 , .rect4 ,.rect2 ,.rect1',{zIndex:3},"<")
		.to('.logo', {zIndex:0},"<")
		.to('.zwart ,.gradient' ,{zIndex:2},"<.2")


		.to('.rood ,.blauw', { zIndex: 2})

		.to('.cta' , {scale:1.2 , ease: Power4.easeInOut})
		.to('.cta' , {scale:1 ,ease: Power4.easeInOut})
	;

	var tl2 = gsap.timeline({delay: 0.4, onComplete:hover, paused:true, })
		.to('.robert' ,{top:"300px" ,height: "350px" , left:"30px" ,ease: Power4.easeInOut},"<")
		.to('.left , .right ' ,{top:"300px" ,height: "325px" ,ease: Power4.easeInOut},"<")
		.to('.right', {right:"-20px" , ease: Power4.easeInOut},"<")
		.to('.left', {left:"-20px", ease: Power4.easeInOut},"<")
		.to('#audio-control',{top:"77px", left: "53px" , zIndex:5 , ease: Power4.easeInOut},"<")
		.to('.video ' , {top:"72px" , width: "236px" , height: "347px" , zIndex:2 , ease: Power4.easeInOut},"<")
		.to('.rood ,.blauw', { zIndex: 1},"<")
		.to('.logo', {zIndex:5},"<")
		.to('.zwart ,.gradient' ,{zIndex:2 , y:0},"<")
		
		.to(video,{play: true}, "<.2")
	;

	var tl3 = gsap.timeline({delay: 1, onComplete:hover, paused:true})
		.to('.left', 0.9, { x: '+12px', ease: Power4.easeInOut})
		.to('.right', 0.9, { x: '+12px', filter: 'blur(2px)', ease: Power4.easeInOut},"<.2")
		.to('.blauw' , {opacity: 0},"<")
		.to('.rood' , {opacity: .15},"<")

		.to('.left', 0.9, { x: '0px', ease: Power4.easeInOut})
		.to('.right', 0.9, { x: '0px', filter: 'blur(0px)', ease: Power4.easeInOut},"<.2")
		.to('.blauw' , {opacity: .15},"<")
		.to('.rood' , {opacity: .15},"<")

		.to('.right', 0.9, { x: '-12px', ease: Power4.easeInOut})
		.to('.left', 0.9, { x: '-12px', filter: 'blur(2px)', ease: Power4.easeInOut},"<.2")
		.to('.rood' , {opacity: 0},"<")
		.to('.blauw' , {opacity: .15},"<")

		.to('.right', 0.9, { x: '0px', ease: Power4.easeInOut})
		.to('.left', 0.9, { x: '0px', filter: 'blur(0px)', ease: Power4.easeInOut},"<.2")
		.to('.blauw' , {opacity: .15},"<")
		.to('.rood' , {opacity: .15},"<")
	;
		const right = document.querySelector('.hoverRight');
		const left = document.querySelector('.hoverLeft');
			

		right.addEventListener('mouseover', (event)=> {
			gsap.to('.right', 0.9, { x: '-12px', ease: Power4.easeInOut})
			gsap.to('.left', 0.9, { x: '-12px', filter: 'blur(2px)', ease: Power4.easeInOut});
			gsap.to('.rood',{opacity:0} )
		})

		right.addEventListener('mouseleave', (e) => {
			gsap.to('.right', 0.9, { x: '0px', ease: Power4.easeInOut})
			gsap.to('.left', 0.9, { x: '0px', filter: 'blur(0px)', ease: Power4.easeInOut})
			gsap.to('.rood',{opacity:.15} )
		})

		left.addEventListener('mouseover', (event)=> {
			gsap.to('.left', 0.9, { x: '+12px', ease: Power4.easeInOut})
			gsap.to('.right', 0.9, { x: '+12px', filter: 'blur(2px)', ease: Power4.easeInOut})
			gsap.to('.blauw',{opacity:0} )
		})

		left.addEventListener('mouseleave', (e) => {
			gsap.to('.left', 0.9, { x: '0px', ease: Power4.easeInOut})
			gsap.to('.right', 0.9, { x: '0px', filter: 'blur(0px)', ease: Power4.easeInOut})
			gsap.to('.blauw',{opacity:.15} )
		})

        tl4.eventCallback("onComplete", function() {
			var global = 2;
			var done = 0;
			function noMovement() {
			if (global == 0 ) {
				resetGlobal();

				if(done == 1){
					clearInterval(refreshIntervalId);
				}else if(done == 0){
					done = 1;

					tl3.play();	
				}
			} else {
				global--;
			}
			}
			function resetGlobal() {
				global = 2;
			  }

			$(function() {
			$('#stage').mousemove(function(event) {
				resetGlobal();
			});
			});
			var refreshIntervalId = setInterval(function() {
			noMovement();
			}, 1000);
          });
		video.addEventListener("ended", (event) => {
			tl4.play(0)
		  });


	PEXI.inView(function(){
		tl.play()
	});

	function checkAutoPlay(p) {
		var s = window['Promise'] ? window['Promise'].toString() : '<';
		if (s.indexOf('function Promise()') !== -1 || s.indexOf('function ZoneAwarePromise()') !== -1) {
			p.catch(function(error) {
				if(error.name == "NotAllowedError" || error.name == "AbortError") { // Voor Chrome/Firefox
					callback_onAutoplayBlocked();
				}
			})
		}
	}
	function callback_onAutoplayBlocked() {
		//Hier een actie ondernemen als autoplay niet werkt
		//Alsnog afspelen werkt niet, toon een playbutton oid.
		// voorbeeld
		$(".pexi_play").css('display', 'block');
		tl.play();
		clearInterval(videoInterval)
		video.onplay = function(){
			$(".pexi_play").css('display', 'none');
		  };
		$(".pexi_play").click(()=>{
			pexi.event('event_video_play')
			video.play();
			$(".pexi_play").css('display', 'none');
		})

	}

	var videoInterval = setInterval(function(){
		checkAutoPlay(video.play());
		
		if(video.readyState === 4){
			
			PEXI.inView(function(){
				tl.play();
				clearInterval(videoInterval)
			});
		}
	},100)
});

	