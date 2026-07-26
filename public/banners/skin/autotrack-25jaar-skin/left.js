$(function () {
  function hover() {
    var hoverTimeline = gsap.timeline({ paused: true })
      .to('.cta', 0.4, { scale: 1.2, ease: "power2.out", yoyo: true })
      ;
    var cta = gsap.timeline({ paused: true })
      .to('.arrow', 0.4, { x: 10, ease: "power2.out", yoyo: true })
      .to('.ctaCopy, .arrow', 0.4, { scale: 1.2, ease: "power2.out", yoyo: true }, "<")
      ;
    $(".cta").mouseenter(function () {
      cta.play();
    });
    $(".cta").mouseleave(function () {
      cta.reverse();
    });
    $("#stage").mouseenter(function () {
      PEXI.message('hoverIn')
    });
    $("#stage").mouseleave(function () {
      PEXI.message('hoverOut')
    });
    PEXI.receiveMessage('hoverIn', function () {
      hoverTimeline.play();
    });
    PEXI.receiveMessage('hoverOut', function () {
      hoverTimeline.reverse();
    });
  }
  var tl = gsap.timeline({ delay: 0.4, onComplete: hover, paused: true })
    .set('.hiddenOnload', { opacity: 1 })
    .from('.bg', {height:0,y:200,transformOrigin:"bottom", opacity: 0, duration: 0.5, ease: "power2.out" })
    .from('.logo',.5, {y:200, opacity:0,stagger:.1, ease: "power2.out"}, "<")
		.from('.copy', { opacity: 0,stagger:.2, duration: .5, y:20, ease: "power4.InOut"},"<")
		.from('.vrouw', { stagger:.2,opacity: 0,scale:.8, duration: .4, y:20, ease: "power4.InOut"},"<.4")
		.from('.cta', { opacity: 0, duration: .4, y:20, ease: "power4.InOut"},"<.2")
    ;
    tl.play();
  PEXI.skinsReady(function () {
    
    PEXI.receiveMessage('scalingdone', function () {
      tl.play();
    });
  });
});


