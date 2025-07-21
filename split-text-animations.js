 window.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('[text-split="true"]');

    const parseAttr = (el, attr, fallback) => el.getAttribute(attr) || fallback;
    const parseFloatAttr = (el, attr, fallback) => el.getAttribute(attr) ? parseFloat(el.getAttribute(attr)) : fallback;

    const animationMap = [
      // ✅ Standard Effects
  { attr: "words-slide-up", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { opacity: 0, yPercent: 100, duration: o.duration || 0.5, delay: o.delay || 0, ease: o.ease || "back.out(2)", stagger: o.stagger || { amount: 0.5 } }) },
  { attr: "words-rotate-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).set(t.words, { transformPerspective: 1000 }).from(t.words, { rotationX: -90, duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "power2.out", stagger: o.stagger || { amount: 0.6 } }) },
  { attr: "words-slide-from-right", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { opacity: 0, x: "1em", duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "power2.out", stagger: o.stagger || { amount: 0.3 } }) },
  { attr: "letters-slide-up", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { yPercent: 100, duration: o.duration || 0.2, delay: o.delay || 0, ease: o.ease || "power1.out", stagger: o.stagger || { amount: 0.6 } }) },
  { attr: "letters-slide-down", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { yPercent: -120, duration: o.duration || 0.3, delay: o.delay || 0, ease: o.ease || "power1.out", stagger: o.stagger || { amount: 0.7 } }) },
  { attr: "letters-fade-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { opacity: 0, duration: o.duration || 0.2, delay: o.delay || 0, ease: o.ease || "power1.out", stagger: o.stagger || { amount: 0.8 } }) },
  { attr: "letters-fade-in-random", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { opacity: 0, duration: o.duration || 0.05, delay: o.delay || 0, ease: o.ease || "power1.out", stagger: o.stagger || { amount: 0.4, from: "random" } }) },
  { attr: "letters-zoom-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { scale: 0, opacity: 0, duration: o.duration || 0.3, delay: o.delay || 0, ease: o.ease || "back.out(1.7)", stagger: o.stagger || { amount: 0.6 } }) },
  { attr: "words-float-up", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { y: 30, opacity: 0, duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "power2.out", stagger: o.stagger || { amount: 0.6 } }) },
  { attr: "letters-rotate-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { rotationX: 90, opacity: 0, transformOrigin: "top center", duration: o.duration || 0.4, delay: o.delay || 0, ease: o.ease || "back.out(2)", stagger: o.stagger || { amount: 0.5 } }) },
  { attr: "words-scale-in-left", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { scale: 0.4, xPercent: -30, opacity: 0, transformOrigin: "left center", duration: o.duration || 0.5, delay: o.delay || 0, ease: o.ease || "expo.out", stagger: o.stagger || { amount: 0.5 } }) },
  { attr: "words-flip-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { rotationY: -90, opacity: 0, transformOrigin: "center center", duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "power3.out", stagger: o.stagger || { amount: 0.6 } }) },
  { attr: "words-reveal-mask", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { yPercent: 100, opacity: 0, duration: o.duration || 0.8, delay: o.delay || 0, ease: o.ease || "power4.out", stagger: o.stagger || { amount: 0.4 } }) },
  { attr: "letters-skew-slide-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { y: 80, opacity: 0, skewY: 10, duration: o.duration || 0.5, delay: o.delay || 0, ease: o.ease || "power3.out", stagger: o.stagger || { amount: 0.7 } }) },
  { attr: "words-wipe-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { scaleY: 0, opacity: 0, transformOrigin: "top center", duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "expo.out", stagger: o.stagger || { amount: 0.5 } }) },
  { attr: "letters-pulse-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { scale: 0.4, opacity: 0, duration: o.duration || 0.25, delay: o.delay || 0, ease: o.ease || "back.out(2)", stagger: o.stagger || { amount: 0.5 } }) },
  { attr: "letters-blur-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { opacity: 0, filter: "blur(10px)", duration: o.duration || 0.3, delay: o.delay || 0, ease: o.ease || "power2.out", stagger: o.stagger || { amount: 0.5 } }) },
  { attr: "words-rise-drop", animate: (t, el, o = {}) => { const tl = gsap.timeline({ paused: true }); tl.fromTo(t.words, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: o.duration || 0.5, delay: o.delay || 0, ease: o.ease || "power4.out", stagger: o.stagger || { amount: 0.4 } }); tl.to(t.words, { y: 10, duration: 0.3, ease: "power1.inOut", stagger: o.stagger || { amount: 0.4 } }, "-=0.3"); return tl; } }
];

 // ✅ Clip Effects
{ attr: "letters-clip-up", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "power4.out", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "letters-clip-down", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "power4.out", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "letters-clip-left", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { clipPath: "inset(0% 100% 0% 0%)", opacity: 0, duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "power4.out", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "letters-clip-right", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { clipPath: "inset(0% 0% 0% 100%)", opacity: 0, duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "power4.out", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "letters-clip-circle", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { clipPath: "circle(0% at 50% 50%)", opacity: 0, duration: o.duration || 0.5, delay: o.delay || 0, ease: o.ease || "power2.out", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "words-clip-center", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { scale: 0.8, clipPath: "inset(0% 50% 0% 50%)", opacity: 0, duration: o.duration || 0.6, delay: o.delay || 0, ease: o.ease || "power4.out", stagger: o.stagger || { amount: 0.5 } }) },
      
 // ✅ Physics inertia

{ attr: "letters-break-fall", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { y: -100, rotation: () => gsap.utils.random(-90, 90), opacity: 0, duration: o.duration || 1, delay: o.delay || 0, ease: o.ease || "bounce.out", stagger: o.stagger || { amount: 0.8 } }) },
{ attr: "words-shatter-drop", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { y: -80, x: () => gsap.utils.random(-40, 40), skewX: () => gsap.utils.random(-20, 20), rotation: () => gsap.utils.random(-30, 30), opacity: 0, duration: o.duration || 1, delay: o.delay || 0, ease: o.ease || "bounce.out", stagger: o.stagger || { amount: 0.6 } }) },
{ attr: "letters-blast-apart", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { x: () => gsap.utils.random(-100, 100), y: () => gsap.utils.random(-100, 100), rotationZ: () => gsap.utils.random(-180, 180), scale: 0, opacity: 0, duration: o.duration || 1.2, delay: o.delay || 0, ease: o.ease || "expo.out", stagger: o.stagger || { amount: 0.8 } }) },
{ attr: "letters-fall-bounce", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { y: -200, rotation: () => gsap.utils.random(-45, 45), opacity: 0, duration: o.duration || 1.2, delay: o.delay || 0, ease: o.ease || "bounce.out", stagger: o.stagger || { amount: 0.8 } }) },
{ attr: "words-pop-explode", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { scale: 0, opacity: 0, rotationZ: () => gsap.utils.random(-180, 180), duration: o.duration || 0.7, delay: o.delay || 0, ease: o.ease || "back.out(2)", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "words-gravity-fall", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { y: -150, opacity: 0, duration: o.duration || 1, delay: o.delay || 0, ease: o.ease || "power4.out", stagger: o.stagger || { amount: 0.6 } }) },
{ attr: "letters-implode", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { scale: 2, rotation: () => gsap.utils.random(-90, 90), opacity: 0, duration: o.duration || 0.8, delay: o.delay || 0, ease: o.ease || "power4.inOut", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "letters-orbit-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.chars, { x: () => gsap.utils.random(-80, 80), y: () => gsap.utils.random(-80, 80), rotation: () => gsap.utils.random(90, 360), scale: 0.2, opacity: 0, ease: o.ease || "elastic.out(1, 0.4)", delay: o.delay || 0, duration: o.duration || 1.2, stagger: o.stagger || { amount: 0.8 } }) },
{ attr: "words-inertia-flick", animate: (t, el, o = {}) => gsap.timeline({ paused: true }).from(t.words, { x: () => gsap.utils.random(-120, 120), y: () => gsap.utils.random(-120, 120), scale: 0.5, rotation: () => gsap.utils.random(-90, 90), opacity: 0, duration: o.duration || 1, delay: o.delay || 0, ease: o.ease || "expo.out", stagger: o.stagger || { amount: 0.7 } }) },
{ attr: "letters-wiggle-drop", animate: (t, el, o = {}) => { const tl = gsap.timeline({ paused: true }); tl.from(t.chars, { y: -100, opacity: 0, rotationZ: () => gsap.utils.random(-30, 30), duration: o.duration || 0.7, delay: o.delay || 0, ease: o.ease || "bounce.out", stagger: o.stagger || { amount: 0.6, from: "start" } }); tl.to(t.chars, { rotationZ: 0, ease: "elastic.out(1, 0.3)", duration: 0.4, stagger: o.stagger || { amount: 0.6 } }, "-=0.6"); return tl; } },
{ attr: "letters-drop-stagger", animate: (t, el, o = {}) => gsap.timeline({ paused: true, delay: o.delay || 0 }).from(t.chars, { y: -60, opacity: 0, duration: o.duration || 0.8, ease: o.ease || "bounce.out", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "words-jelly-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true, delay: o.delay || 0 }).from(t.words, { scaleY: 0.3, scaleX: 1.6, opacity: 0, transformOrigin: "center", duration: o.duration || 0.5, ease: o.ease || "elastic.out(1.2, 0.5)", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "words-delay-fade-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true, delay: o.delay || 0 }).from(t.words, { opacity: 0, y: 10, duration: o.duration || 0.5, ease: o.ease || "power2.out", stagger: o.stagger || { each: 0.2 } }) },
{ attr: "letters-fade-scale-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true, delay: o.delay || 0 }).from(t.chars, { opacity: 0, scale: 0.8, duration: o.duration || 0.4, ease: o.ease || "power3.out", stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "words-cross-slide", animate: (t, el, o = {}) => { t.words.forEach((w, i) => gsap.set(w, { xPercent: i % 2 === 0 ? -100 : 100 })); return gsap.timeline({ paused: true, delay: o.delay || 0 }).to(t.words, { xPercent: 0, opacity: 1, duration: o.duration || 0.6, ease: o.ease || "power3.out", stagger: o.stagger || { amount: 0.5 } }); }},
{ attr: "letters-flicker-in", animate: (t, el, o = {}) => gsap.timeline({ paused: true, delay: o.delay || 0 }).fromTo(t.chars, { opacity: 0 }, { opacity: 1, repeat: 2, yoyo: true, duration: o.duration || 0.1, stagger: o.stagger || { amount: 0.5 } }) },
{ attr: "words-slam-down", animate: (t, el, o = {}) => { const tl = gsap.timeline({ paused: true, delay: o.delay || 0 }); tl.from(t.words, { y: -80, opacity: 0, duration: o.duration || 0.5, ease: o.ease || "back.out(3)", stagger: o.stagger || { amount: 0.4 } }); tl.to(t.words, { y: 5, duration: 0.1, ease: "power1.inOut", stagger: o.stagger || { amount: 0.4 } }); return tl; }},


      // ✅ Scroll Scrub
      { attr: "scrub-each-word", animate: (t, el, o = {}) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top center",
            scrub: o.scrub !== null ? o.scrub : true
          }
        }).from(t.words, {
          opacity: 0.2,
          duration: o.duration || 0.2,
          ease: o.ease || "power1.out",
          stagger: o.stagger || { each: 0.4 }
        });
        return null;
      }}
    ];

    elements.forEach((el) => {
      const animName = el.getAttribute("animation");
      if (!animName) return;

      const matched = animationMap.find((a) => a.attr === animName);
      if (!matched) return;

      const split = new SplitText(el, {
        type: "words,chars",
        wordsClass: "word",
        charsClass: "char"
      });


     const options = {
  duration: parseFloatAttr(el, "duration", null),
  delay: parseFloatAttr(el, "delay", 0), // ✅ ADD THIS LINE
  stagger: el.hasAttribute("stagger") ? { amount: parseFloat(el.getAttribute("stagger")) } : null,
  ease: parseAttr(el, "ease", null),
  scrub: el.hasAttribute("scrub") ? el.getAttribute("scrub") === "true" : null
};

      const tl = matched.animate(split, el, options);
  if (tl) {
  const scrollTriggerAttr = el.getAttribute("scroll-trigger");
  const reverse = el.getAttribute("reverse") !== "false"; // default true

  ScrollTrigger.create({
    trigger: el,
    start: scrollTriggerAttr || "top 60%",
    onEnter: () => tl.play(),
    onLeaveBack: () => {
      if (reverse) tl.reverse();
    }
  });
}

      gsap.set(el, { opacity: 1 });
    });
  });
