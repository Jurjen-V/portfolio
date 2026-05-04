document.addEventListener("DOMContentLoaded", function (event) {
  const stage = document.querySelector("#stage");

  function hover() {
    const hover = gsap.timeline({ paused: true }).to(".cta, .bol", {
      scale: 1.1,
      duration: 0.3,
    });

    stage.addEventListener("mouseenter", () => {
      hover.play();
    });

    stage.addEventListener("mouseleave", () => {
      hover.reverse();
    });
  }

  const cta = gsap.timeline({ paused: true }).to(".cta", {
    scale: 1.1,
    duration: 0.3,
  });

  stage.addEventListener("mouseenter", () => {
    cta.play();
  });

  stage.addEventListener("mouseleave", () => {
    cta.reverse();
  });
  // Set up 3D transforms for the bol element
  gsap.set(".bolWrapper", { perspective: 800 });
  gsap.set(".bol", { transformStyle: "preserve-3d" });
  gsap.set(".back", { rotationY: -180 });
  gsap.set([".back", ".front"], { backfaceVisibility: "hidden" });
  gsap.set(".airfryer", { y: 15 });

  var tl = gsap
    .timeline({ delay: 0.4, onComplete: hover, paused: true })
    .to(".hiddenOnload", { opacity: 1, duration: 0.3 })
    .from(".k .kContainer", {x: -300, duration: 1, ease: "elastic.out(0.2)"},"-=.2")
    .from(".vrouw, .bolWrapper", {x: -300, duration: 1, ease: "elastic.out(0.2)"},'<')
       .to(".vrouw-copy-masked.A, .vrouw.A", { duration: 0.5 }, 1.5)
    .from(".vrouw-copy-masked.B , .vrouw.B", {opacity:0, duration: 0.5 }, 1.5)
    .to(".bol", {scale:1.2, duration: 0.5, ease: "power1.out"}, 1.5)
    .to(".bol", {scale:1, duration: 0.5, ease: "power1.out"}, "<.4")
  // crossfade
    .to(".vrouw-copy-masked.B , .vrouw.B", {opacity:1, autoAlpha: 1, duration: 0.5 }, 1.5)
    .to(".vrouw-copy-masked.A , .vrouw.A", { autoAlpha: 0, duration: 0.5 },"<.1")
    .to(".k .kpath, .vrouw-copy-masked.B , .vrouw.B",{x:"200%",  duration:0.8, ease: "power1.out"},"<1.5")

    .from('.k1 .kContainer', {opacity:0, duration:0.8, ease: "power1.out"}, "<")
    .from(".k1 .kpath",{x:"-100%", duration:0.5, ease: "power1.out" },"<")
    .from(".airfryer_open_los",{x:"100px", scale:.5, opacity:0, duration:0.5, ease: "power1.out" },"<")
    .to(
      ".bol",
      {
        y: "-43",
        x: "-85",
      },"<",
    )
    .from(
      ".magazines",
      {
        x: 0,
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(0.3)",
      },
      "<.4"
    )
    .from(
      ".magazine1",
      {
        x: 0,
        y: 50,
        rotate: "-11deg",
        duration: 1.4,
        ease: "elastic.out(1, 1)",
      },
       "<"
     )
    .to(".bol", {
      duration: 2,
      rotationY: 180,
      ease: "elastic.out(1, 0.8)",
    })
    .to(
      ".bol",
      {
        duration: 2,
        rotationY: 360,
        ease: "elastic.out(1, 0.8)",
      },
      "+=2"
    )
    .to(
      ".bol",
      {
        duration: 2,
        rotationY: 540,
        ease: "elastic.out(1, 0.8)",
      },
      "+=2"
    )
    .to(
      ".bol",
      {
        duration: 2,
        rotationY: 720,
        ease: "elastic.out(1, 0.8)",
      },
      "+=2"
    )
    .to(
      ".bol",
      {
        duration: 2,
        rotationY: 900,
        ease: "elastic.out(1, 0.8)",
      },
      "+=2"
    )
    .to(
      ".bol",
      {
        duration: 2,
        rotationY: 1080,
        ease: "elastic.out(1, 0.8)",
      },
      "+=2"
    );
  PEXI.inView(function () {
    tl.play();
  });
});
